'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const services = [
  {
    slug: 'wall-graphics-installation',
    title: 'Wall Graphics Installation',
    description:
      'Professional installation of branded wall graphics and murals for offices, retail spaces, and commercial interiors.',
    folder: 'Wall Graphics Installation',
    images: [
      'IMG_9400.jpeg',
      '5b3cadbd-00b0-49a0-aac6-3af102593ec2.JPG',
      'IMG_2429.jpg',
      'IMG_2470.jpeg',
      'IMG_9394.jpeg',
      'IMG_9403.jpg',
    ],
  },
  {
    slug: 'vinyl-graphics-installation',
    title: 'Vinyl Graphics Installation',
    description:
      'Precise application of vinyl graphics for smooth, durable results across a wide range of surfaces.',
    folder: 'Vinyl Graphics Installation',
    images: [
      '150546ee-8ea7-4300-b39e-8b8e7092a343.JPG',
      '1977aa26-5468-471b-bbd7-ad0d13c3294b.JPG',
      'e5b62284-0fee-4fce-bc31-a4df1fc5c355.JPG',
    ],
  },
  {
    slug: 'window-glass-decals',
    title: 'Window / Glass Decals',
    description:
      'Clean, polished decal installation for storefronts, entryways, and interior glass partitions.',
    folder: 'Window&Glass Decals',
    images: ['Amazon big wall.jpg', 'Datadog.jpg'],
  },
  {
    slug: 'banners-signage-installation',
    title: 'Banners & Signage Installation',
    description:
      'Secure installation of banners, promotional signage, and branded display materials for business environments.',
    folder: 'Banners & Signage Installation',
    images: ['IMG_1912 (1).jpg'],
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
    folder: 'Interior Branding Graphics',
    images: ['Darden Restaurant Support Center.jpg', 'IMG_9276.jpeg'],
  },
  {
    slug: 'exterior-graphic-applications',
    title: 'Exterior Graphic Applications',
    description:
      'Durable outdoor graphic and decal applications designed for visibility, longevity, and clean presentation.',
    folder: 'Exterior Graphic Applications',
    images: ['Cool science banner.jpg', 'Pitbull stadium.jpg'],
  },
  {
    slug: 'custom-installation-projects',
    title: 'Custom Installation Projects',
    description:
      'Flexible installation support for unique graphic projects requiring careful planning and execution.',
  },
];

function ServiceGallery({
  title,
  folder,
  images,
}: {
  title: string;
  folder: string;
  images: string[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  const goToPrevious = () => {
    setActiveIndex((currentIndex) =>
      currentIndex === 0 ? images.length - 1 : currentIndex - 1
    );
  };

  const goToNext = () => {
    setActiveIndex((currentIndex) =>
      currentIndex === images.length - 1 ? 0 : currentIndex + 1
    );
  };

  const activeImage = images[activeIndex];

  return (
    <div className="lg:w-1/2 rounded-2xl border border-[#E3D3EE] bg-[#F9F5FC] p-4 shadow-sm">
      <div className="relative overflow-hidden rounded-xl bg-white shadow-[inset_0_0_0_1px_rgba(227,211,238,0.7)]">
        <div className="relative aspect-[4/3] w-full">
          <Image
            src={`/images/${encodeURIComponent(folder)}/${encodeURIComponent(activeImage)}`}
            alt={`${title} example ${activeIndex + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={goToPrevious}
              aria-label={`Show previous ${title} image`}
              className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/60 text-[#2B0D3E] shadow-md transition hover:bg-white/85"
            >
              <span className="text-2xl leading-none" aria-hidden="true">
                ‹
              </span>
            </button>
            <button
              type="button"
              onClick={goToNext}
              aria-label={`Show next ${title} image`}
              className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/60 text-[#2B0D3E] shadow-md transition hover:bg-white/85"
            >
              <span className="text-2xl leading-none" aria-hidden="true">
                ›
              </span>
            </button>
          </>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between gap-4 px-1">
        <p className="text-sm font-medium text-[#7A3F91]">
          {activeIndex + 1} / {images.length}
        </p>
        <div className="flex items-center gap-2">
          {images.map((imageName, imageIndex) => (
            <button
              key={imageName}
              type="button"
              onClick={() => setActiveIndex(imageIndex)}
              aria-label={`Show ${title} image ${imageIndex + 1}`}
              className={`h-2.5 rounded-full transition ${
                imageIndex === activeIndex
                  ? 'w-8 bg-[#7A3F91]'
                  : 'w-2.5 bg-[#C59DD9]'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <div className="w-full bg-white">
      <nav className="sticky top-0 z-50 bg-[#F2EAF7]/80 shadow-sm border-b border-gray-200 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-0 -ml-90">
            <Image
              src="/images/3c-logo.png"
              alt="3Cinstallers Logo"
              width={100}
              height={100}
              className="object-contain"
            />
            <span className="font-bold text-[#2B0D3E] text-lg hidden sm:inline -ml-3">
              3Cinstallers
            </span>
          </Link>

          <div className="flex items-center gap-8 ml-auto pr-0 md:absolute md:right-8 lg:right-10 md:top-1/2 md:-translate-y-1/2">
            <Link
              href="/services"
              className="text-[#7A3F91] hover:text-[#C59DD9] transition font-medium text-sm sm:text-base"
            >
              Services
            </Link>
            <Link
              href="/#about"
              className="text-[#7A3F91] hover:text-[#C59DD9] transition font-medium text-sm sm:text-base"
            >
              About Us
            </Link>
            <Link
              href="/#contact"
              className="bg-[#C59DD9] text-white px-4 py-2 rounded-lg hover:bg-[#7A3F91] transition font-medium text-sm sm:text-base"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-20">
        <section className="bg-[#F2EAF7] py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#2B0D3E] mb-6">
              Professional Installation Services
            </h1>
            <p className="text-lg sm:text-xl text-[#7A3F91] max-w-3xl mx-auto leading-relaxed">
              3Cinstallers delivers dependable graphic and decal installation services for retail,
              commercial, and branded environments nationwide.
            </p>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-[#2B0D3E] mb-4">What We Install</h2>
            <p className="text-lg text-[#7A3F91] leading-relaxed">
              From single-site updates to large multi-location rollouts, our team provides clean,
              professional installations with attention to detail and consistent brand presentation.
            </p>
          </div>
        </section>

        <section className="pb-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-24">
              {services.map((service, index) => (
                <div
                  key={service.title}
                  id={service.slug}
                  className={`scroll-mt-32 flex flex-col items-stretch gap-6 lg:flex-row lg:gap-10 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
                >
                  <div className="lg:w-1/2 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition p-8 min-h-[220px] flex flex-col justify-center">
                    <h3 className="text-2xl font-bold text-[#2B0D3E] mb-4">{service.title}</h3>
                    <p className="text-[#7A3F91] text-lg leading-relaxed">{service.description}</p>
                  </div>

                  {service.images ? (
                    <ServiceGallery
                      title={service.title}
                      folder={service.folder!}
                      images={service.images}
                    />
                  ) : (
                    <div className="lg:w-1/2 rounded-2xl border-2 border-dashed border-[#C59DD9] bg-[#F9F5FC] min-h-[220px] flex items-center justify-center text-center p-6">
                      <span className="text-[#7A3F91] font-medium text-lg">Future image space</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-[#C59DD9]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Need a Quote for Your Next Project?
            </h2>
            <p className="text-lg text-[#F7F0FB] max-w-2xl mx-auto mb-8">
              Tell us about your installation needs and we’ll help you plan the right solution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/#contact"
                className="bg-white text-[#C59DD9] px-8 py-3 rounded-lg hover:bg-[#F2EAF7] transition font-semibold text-lg"
              >
                Contact Us
              </Link>
              <a
                href="tel:+1234567890"
                className="bg-[#7A3F91] text-white px-8 py-3 rounded-lg hover:bg-[#2B0D3E] transition font-semibold text-lg"
              >
                Call Us Now
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
