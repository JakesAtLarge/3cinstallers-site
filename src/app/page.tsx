'use client';

import { Oswald } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { FormEvent, useEffect, useState } from 'react';
import printNetworkImage from '../../public/images/printnetwork2.png';

const recentProjects = [
  'Darden Restaurant Support Center.jpg',
  'Delta Flight Museum.JPG',
  'Florida Sun Pass.jpeg',
  'Hard Rock Arena.jpg',
  'Mariott at Myrtle Beach.JPG',
  'ViVE.png',
];

const partnerLogos = [
  { fileName: 'adventhealth.png', src: '/images/partners/adventhealth.png' },
  { fileName: 'astonmartin.png', src: '/images/partners/astonmartin.png' },
  { fileName: 'aws.png', src: '/images/partners/aws.png' },
  { fileName: 'darden.png', src: '/images/partners/darden.png' },
  { fileName: 'delta.png', src: '/images/partners/delta.png' },
  { fileName: 'disney.png', src: '/images/partners/disney.png' },
  { fileName: 'F1.png', src: '/images/partners/F1.png' },
  { fileName: 'faena.png', src: '/images/partners/faena.png' },
  { fileName: 'fontainbleau.png', src: '/images/partners/fontainbleau.png' },
  { fileName: 'marriott.png', src: '/images/partners/marriott.png' },
  { fileName: 'miamidolphins.png', src: '/images/partners/miamidolphins.png' },
  {
    fileName: 'miamihurricanes.png',
    src: '/images/partners/miamihurricanes.png',
  },
  { fileName: 'orlandomagic.png', src: '/images/partners/orlandomagic.png' },
  {
    fileName: 'royalcaribbean.png',
    src: '/images/partners/royalcaribbean.png',
  },
  { fileName: 'thebreakers.png', src: '/images/partners/thebreakers.png' },
  { fileName: 'UCF.png', src: '/images/partners/UCF.png' },
  {
    fileName: 'universalflorida.png',
    src: '/images/partners/universalflorida.png',
  },
] as const;

const homepageServices = [
  {
    slug: 'wall-graphics-installation',
    title: 'Wall Graphics Installation',
    description:
      'Professional installation of branded wall graphics and murals for offices, retail spaces, and commercial interiors.',
  },
  {
    slug: 'vinyl-graphics-installation',
    title: 'Vinyl Graphics Installation',
    description:
      'Precise application of vinyl graphics for smooth, durable results across a wide range of surfaces.',
  },
  {
    slug: 'window-glass-decals',
    title: 'Window / Glass Decals',
    description:
      'Clean, polished decal installation for storefronts, entryways, and interior glass partitions.',
  },
  {
    slug: 'banners-signage-installation',
    title: 'Banners & Signage Installation',
    description:
      'Secure installation of banners, promotional signage, and branded display materials for business environments.',
  },
  {
    slug: 'retail-commercial-graphic-installs',
    title: 'Retail / Commercial Graphic Installs',
    description:
      'Reliable rollout support for retail, restaurant, office, and multi-site commercial graphic programs.',
  },
  {
    slug: 'interior-branding-graphics',
    title: 'Interior Branding Graphics',
    description:
      'Branded interior graphic installations that enhance spaces and reinforce company identity.',
  },
  {
    slug: 'exterior-graphic-applications',
    title: 'Exterior Graphic Applications',
    description:
      'Durable outdoor graphic and decal applications designed for visibility, longevity, and clean presentation.',
  },
  {
    slug: 'custom-installation-projects',
    title: 'Custom Installation Projects',
    description:
      'Flexible installation support for unique graphic projects requiring careful planning and execution.',
  },
];

const enlargedPartnerLogos = new Set([
  'astonmartin.png',
  'fontainbleau.png',
  'marriott.png',
  'miamidolphins.png',
  'orlandomagic.png',
]);

const extraLargePartnerLogos = new Set(['astonmartin.png', 'marriott.png']);

const formatProjectTitle = (fileName: string) =>
  fileName
    .replace(/\.[^/.]+$/, '')
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');

const formatPartnerName = (fileName: string) =>
  fileName
    .replace(/\.[^/.]+$/, '')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const oswald = Oswald({
  subsets: ['latin'],
  weight: '700',
  display: 'swap',
});

export default function Home() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [isAtTop, setIsAtTop] = useState(true);

  const validateEmail = (emailValue: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailValue);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY === 0);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (honeypot) {
      setStatus('success');
      setName('');
      setEmail('');
      setMessage('');
      setHoneypot('');
      return;
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName) {
      setStatus('error');
      setErrorMessage('Name is required.');
      return;
    }

    if (!trimmedEmail) {
      setStatus('error');
      setErrorMessage('Email is required.');
      return;
    }

    if (!validateEmail(trimmedEmail)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (!trimmedMessage) {
      setStatus('error');
      setErrorMessage('Message is required.');
      return;
    }

    setLoading(true);
    setStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message, honeypot }),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result?.error || 'Something went wrong');
      }

      setStatus('success');
      setName('');
      setEmail('');
      setMessage('');
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Failed to send message.';
      setStatus('error');
      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* Navigation Bar */}
      <nav
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          isAtTop
            ? 'bg-transparent border-transparent shadow-none'
            : 'bg-[#2B0D3E]/85 border-b border-[#4A245F] shadow-sm'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-0 -ml-90">
            <Image
              src="/images/3c-logo.png"
              alt="3Cinstallers Logo"
              width={100}
              height={100}
              className="object-contain drop-shadow-[0_0_14px_rgba(255,255,255,0.95)]"
            />
            <span className="font-bold text-white text-lg hidden sm:inline -ml-3">
              3Cinstallers
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-8 ml-auto pr-0 md:absolute md:right-8 lg:right-10 md:top-1/2 md:-translate-y-1/2">
            <Link
              href="/services"
              className="text-white hover:text-[#E8D7F1] transition font-bold text-base sm:text-lg"
            >
              Services
            </Link>
            <Link
              href="/#about"
              className="text-white hover:text-[#E8D7F1] transition font-bold text-base sm:text-lg"
            >
              About Us
            </Link>
            <Link
              href="/#contact"
              className="bg-[#C59DD9] text-white px-4 py-2 rounded-lg hover:bg-[#7A3F91] transition font-bold text-base sm:text-lg"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative w-full h-screen overflow-hidden">
        {/* Video Background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/websitevidnew3.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1
              className={`${oswald.className} font-bold text-white leading-none sm:leading-none mb-10 drop-shadow-xl`}
            >
              <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-8xl">
                INSTALLING
              </span>
              <span className="block text-6xl sm:text-7xl lg:text-8xl xl:text-9xl">
                PERFECTION
              </span>
            </h1>
            <div className="flex justify-center">
              <Link
                href="/services"
                className="bg-[#C59DD9] text-white px-8 py-3 rounded-lg hover:bg-[#7A3F91] transition font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 inline-flex items-center justify-center"
              >
                View Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted Partners Section */}
      <section className="py-16 bg-[#F9F5FC]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-4xl sm:text-5xl font-bold text-[#2B0D3E] mb-4">
              Trusted by brands you know
            </h2>
            <p className="text-xl sm:text-2xl text-[#7A3F91] max-w-3xl mx-auto">
              We&apos;re proud to support our partners across hospitality,
              sports, entertainment, healthcare, and beyond by bringing their
              visions to life.
            </p>
          </div>

          <div className="rounded-2xl border border-[#E3D3EE] bg-white/70 py-6 sm:py-8">
            <div className="flex items-center justify-center gap-8 px-6 sm:gap-12 sm:px-8">
              <img
                src="/images/partners/aws.png"
                alt="AWS"
                className="h-12 w-auto object-contain"
              />
              <img
                src="/images/partners/darden.png"
                alt="Darden"
                className="h-12 w-auto object-contain"
              />
              <img
                src="/images/partners/delta.png"
                alt="Delta"
                className="h-12 w-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Print Network Section */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold text-[#2B0D3E] sm:text-4xl lg:text-5xl">
              More than just installation - let us join you through the whole
              process
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-[#7A3F91] sm:text-xl">
              With nationwide and even international locations, we can bring
              your vision to life from inception to printing and finally
              installation. We can be with you throughout the entire project.
            </p>
          </div>

          <div className="mt-10 sm:mt-12">
            <div className="mx-auto max-w-3xl overflow-hidden rounded-[1.75rem] border border-[#E7D9EF] bg-[#F9F5FC] p-3 shadow-[0_20px_60px_rgba(43,13,62,0.08)] sm:p-5">
              <Image
                src={printNetworkImage}
                alt="3Cinstallers print network map"
                className="h-auto w-full rounded-[1.25rem] object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Company Overview Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Team Image */}
            <div className="h-96 rounded-lg shadow-md order-2 md:order-1 overflow-hidden relative">
              <Image
                src="/images/3cteambetter.jpg"
                alt="3Cinstallers team at work"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* About Content */}
            <div className="space-y-6 order-1 md:order-2">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#2B0D3E]">
                About 3Cinstallers
              </h2>
              <p className="text-lg text-[#7A3F91] leading-relaxed">
                With years of experience in the visual installation industry,
                3Cinstallers has become the trusted partner for businesses and
                organizations seeking professional, high-quality installation
                services.
              </p>
              <p className="text-lg text-[#7A3F91] leading-relaxed">
                We specialize in bringing creative visions to life through
                meticulous attention to detail and exceptional craftsmanship.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-[#7A3F91]">
                  <span className="text-[#C59DD9] font-bold">+</span>
                  Expert installation technicians
                </li>
                <li className="flex items-center gap-3 text-[#7A3F91]">
                  <span className="text-[#C59DD9] font-bold">+</span>
                  Custom design solutions
                </li>
                <li className="flex items-center gap-3 text-[#7A3F91]">
                  <span className="text-[#C59DD9] font-bold">+</span>
                  On-time, on-budget delivery
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-[#F2EAF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#2B0D3E] mb-4">
              Our Services
            </h2>
            <p className="text-xl text-[#7A3F91] max-w-2xl mx-auto">
              We offer a wide range of professional installation services to
              meet your needs
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {homepageServices.map((service) => (
              <Link
                key={service.title}
                href={`/services#${service.slug}`}
                className="flex h-full flex-col rounded-2xl border border-white/70 bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7A3F91] focus-visible:ring-offset-2"
              >
                <div className="mb-4 h-1.5 w-16 rounded-full bg-[#C59DD9]" />
                <h3 className="mb-3 text-xl font-bold text-[#2B0D3E]">
                  {service.title}
                </h3>
                <p className="flex-grow text-base leading-relaxed text-[#7A3F91]">
                  {service.description}
                </p>
                <span className="mt-5 text-sm font-semibold uppercase tracking-[0.18em] text-[#7A3F91]">
                  View service
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio/Gallery Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#2B0D3E] mb-4">
              Recent Projects
            </h2>
            <p className="text-xl text-[#7A3F91] max-w-2xl mx-auto">
              Explore our portfolio of completed installations and
              transformations
            </p>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentProjects.map((project) => (
              <div key={project} className="space-y-3 text-center">
                <h3 className="text-lg sm:text-xl font-bold text-[#2B0D3E]">
                  {formatProjectTitle(project)}
                </h3>
                <div className="relative h-64 overflow-hidden rounded-xl shadow-md bg-white">
                  <Image
                    src={`/images/Recent%20Projects/${encodeURIComponent(project)}`}
                    alt={formatProjectTitle(project)}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section id="contact" className="py-20 bg-[#C59DD9]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Ready to Transform Your Space?
          </h2>
          <p className="text-xl text-[#E8D7F1] max-w-2xl mx-auto">
            Get in touch with our team today to discuss your installation
            project and receive a custom quote.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <button className="bg-white text-[#C59DD9] px-8 py-3 rounded-lg hover:bg-[#F2EAF7] transition font-semibold text-lg">
              Request a Quote
            </button>
            <a
              href="tel:+1234567890"
              className="bg-[#7A3F91] text-white px-8 py-3 rounded-lg hover:bg-[#2B0D3E] transition font-semibold text-lg"
            >
              Call Us Now
            </a>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-8 sm:p-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#2B0D3E] mb-6">
              Drop us a line!
            </h2>
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="flex flex-col gap-2 text-sm font-medium text-[#2B0D3E]">
                  Name
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#C59DD9] focus:border-[#C59DD9] outline-none"
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm font-medium text-[#2B0D3E]">
                  Email
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#C59DD9] focus:border-[#C59DD9] outline-none"
                  />
                </label>
              </div>

              <input
                type="text"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                style={{ display: 'none' }}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              <label className="flex flex-col gap-2 text-sm font-medium text-[#2B0D3E]">
                Message
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                  placeholder="Tell us about your project..."
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#C59DD9] focus:border-[#C59DD9] outline-none resize-none"
                />
              </label>

              {status === 'success' && (
                <p className="text-sm font-medium text-green-600">
                  Message sent successfully!
                </p>
              )}
              {status === 'error' && (
                <p className="text-sm font-medium text-red-600">
                  {errorMessage}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#C59DD9] text-white font-semibold py-3 rounded-lg hover:bg-[#7A3F91] transition text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending...' : 'Send'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2B0D3E] text-gray-300 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#C59DD9] rounded-lg flex items-center justify-center text-white font-bold">
                  3C
                </div>
                <span className="font-bold text-white">3Cinstallers</span>
              </div>
              <p className="text-sm text-gray-400">
                Professional graphic and visual installations for your business.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#services" className="text-[#E8D7F1] hover:text-white transition">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#about" className="text-[#E8D7F1] hover:text-white transition">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-[#E8D7F1] hover:text-white transition">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-semibold text-white mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Phone: (123) 456-7890</li>
                <li>Email: info@3cinstallers.com</li>
                <li>Located in Your City</li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2024 3Cinstallers. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
