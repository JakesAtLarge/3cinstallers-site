import { NextRequest, NextResponse } from 'next/server';

const TO_EMAIL = 'madethisforband@gmail.com';
const RATE_LIMIT_MAX_REQUESTS = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute

const requestTimestamps = new Map<string, number[]>();

const validateEmail = (emailValue: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(emailValue);
};

const getClientIp = (req: NextRequest): string => {
  const forwardedFor = req.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }
  return req.headers.get('x-real-ip') || 'unknown';
};

const checkRateLimit = (ip: string): boolean => {
  const now = Date.now();
  const timestamps = requestTimestamps.get(ip) || [];
  
  // Filter out old timestamps outside the window
  const recentTimestamps = timestamps.filter(ts => now - ts < RATE_LIMIT_WINDOW_MS);
  
  if (recentTimestamps.length >= RATE_LIMIT_MAX_REQUESTS) {
    return false; // Rate limit exceeded
  }
  
  // Add current request timestamp
  recentTimestamps.push(now);
  requestTimestamps.set(ip, recentTimestamps);
  
  return true; // Request allowed
};

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: 'Too many requests. Please try again in a minute.' }, { status: 429 });
  }

  const body = await req.json();
  const honeypot = String(body?.honeypot || '').trim();
  const name = String(body?.name || '').trim();
  const email = String(body?.email || '').trim();
  const message = String(body?.message || '').trim();

  if (honeypot) {
    return NextResponse.json({ status: 'ok' });
  }

  if (!name) {
    return NextResponse.json({ error: 'Name is required' }, { status: 400 });
  }

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  if (!validateEmail(email)) {
    return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
  }

  if (!message) {
    return NextResponse.json({ error: 'Message is required' }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

  if (!apiKey) {
    return NextResponse.json({ error: 'Email service API key is not configured' }, { status: 500 });
  }

  const emailHtml = `
    <div style="font-family: sans-serif; color: #2b0d3e;">
      <h2>New contact request</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br />')}</p>
    </div>
  `;

  const payload = {
    from,
    to: TO_EMAIL,
    subject: `New website contact from ${name}`,
    html: emailHtml,
  };

  try {
    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!resendRes.ok) {
      const bodyText = await resendRes.text();
      return NextResponse.json({ error: 'Email service error', details: bodyText }, { status: 502 });
    }

    return NextResponse.json({ status: 'ok' });
  } catch (error: any) {
    return NextResponse.json({ error: 'Could not send email', details: String(error.message || error) }, { status: 500 });
  }
}
