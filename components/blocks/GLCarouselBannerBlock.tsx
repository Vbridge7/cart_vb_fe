'use client';

import React, { useState, useEffect } from 'react';

import { Block } from 'models/block';
import { TextOption } from 'models/option';
import { NavigationLink } from 'models/navigation';

// NOTE: For Live Next.js Projects - Uncomment the line below for optimized image loading
// import Image from 'next/image';

export interface CarouselSlide {
  title?: string;
  slideDescription?: string;
  buttonLabel?: string;
  navigationLink?: NavigationLink;
  slideImage?: {
    item?: {
      url?: string;
      alt?: string;
      filename?: string;
      dimension?: {
        width?: number;
        height?: number;
      };
    };
  };
}

export interface GLCarouselBannerBlockProps extends Block {
  fields: {
    carouselSlides?: CarouselSlide[];
    backgroundColor?: TextOption;
    fontColor?: string;
    isFullWidth?: boolean;
  };
}

export const GLCarouselBannerBlock: React.FC<GLCarouselBannerBlockProps> = ({ fields }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = fields.carouselSlides || [];

  // Auto-advance carousel every 5 seconds
  useEffect(() => {
    if (slides.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  // Determine if link is external
  const isExternalLink = (url?: string): boolean => {
    if (!url) return false;
    return url.startsWith('http://') || url.startsWith('https://');
  };

  // Build container styles
  const containerStyle: React.CSSProperties = {
    ...(fields.backgroundColor?.value && { backgroundColor: fields.backgroundColor.value }),
  };

  const textStyle: React.CSSProperties = {
    ...(fields.fontColor && { color: fields.fontColor }),
  };

  // Build container classes
  const containerClasses = fields.isFullWidth ?? false
    ? 'gfl-w-full'
    : 'gfl-w-full gfl-max-w-7xl gfl-mx-auto';

  if (slides.length === 0) {
    return (
      <div className={`gfl-carousel-banner gfl-p-8 gfl-text-center ${containerClasses}`} style={containerStyle}>
        <p className="gfl-text-gray-500" style={textStyle}>No carousel slides available</p>
      </div>
    );
  }

  return (
    <div className={`gfl-carousel-banner gfl-relative ${containerClasses}`} style={containerStyle}>
      {/* Carousel Container */}
      <div className="gfl-relative gfl-overflow-hidden" style={{ height: '538px' }}>
        {/* Slides */}
        <div
          className="gfl-flex gfl-transition-transform gfl-duration-500 gfl-ease-in-out gfl-h-full"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className="gfl-flex-shrink-0 gfl-w-full gfl-h-full gfl-relative gfl-px-12 gfl-py-5"
              style={{
                background: 'linear-gradient(360deg, rgba(255, 255, 255, 0) 12%, rgba(251.13, 255, 212.09, 0.12) 50%, rgba(255, 255, 255, 0) 87%), var(--primary, #1A2332)',
              }}
            >
              {/* Background Image */}
              {slide.slideImage?.item?.url && (
                <div className="gfl-absolute gfl-inset-0 gfl-z-0">
                  {/* NOTE: For Live Next.js Projects - Replace <img> with <Image> component below for better optimization */}
                  {/* Uncomment this for Next.js projects:
                  <Image
                    src={slide.slideImage.item.url}
                    alt={slide.slideImage.item.alt || slide.title || 'Carousel slide'}
                    fill
                    className="gfl-object-cover"
                    priority={index === 0}
                  />
                  */} 

                  {/* Overlay for better text readability */}
                  <div className="gfl-absolute gfl-inset-0 gfl-bg-black gfl-opacity-40"></div>
                </div>
              )}

              {/* Decorative Elements - inspired by the HTML structure */}
              <div className="gfl-absolute gfl-w-20 gfl-h-20 gfl-right-24 gfl-bottom-24 gfl-z-10" style={{ backgroundColor: '#E8FF00' }}></div>
              <div className="gfl-absolute gfl-w-60 gfl-h-60 gfl--left-20 gfl--top-20 gfl-border gfl-border-yellow-300 gfl-z-10"></div>
              <div className="gfl-absolute gfl-w-9 gfl-h-9 gfl-right-16 gfl-top-24 gfl-z-10" style={{ backgroundColor: '#E8FF00' }}></div>
              <div className="gfl-absolute gfl-w-3.5 gfl-h-3.5 gfl-right-12 gfl-bottom-16 gfl-z-10" style={{ backgroundColor: '#E8FF00' }}></div>
              <div className="gfl-absolute gfl-w-3 gfl-h-3 gfl-right-28 gfl-bottom-8 gfl-z-10" style={{ backgroundColor: '#E8FF00' }}></div>
              <div className="gfl-absolute gfl-w-2 gfl-h-2 gfl-right-20 gfl-bottom-24 gfl-z-10" style={{ backgroundColor: '#E8FF00' }}></div>
              <div className="gfl-absolute gfl-w-14 gfl-h-14 gfl-right-16 gfl-bottom-12 gfl-z-10" style={{ backgroundColor: '#E8FF00' }}></div>

              {/* Slide Content */}
              <div className="gfl-relative gfl-z-20 gfl-flex gfl-flex-col gfl-justify-center gfl-h-full gfl-max-w-2xl">
                {slide.title && (
                  <h2
                    className="gfl-text-5xl gfl-font-bold gfl-mb-4 gfl-leading-tight"
                    style={{ color: 'white', ...textStyle }}
                  >
                    {slide.title}
                  </h2>
                )}

                {slide.slideDescription && (
                  <p
                    className="gfl-text-lg gfl-mb-6 gfl-leading-relaxed"
                    style={{ color: 'white', ...textStyle }}
                  >
                    {slide.slideDescription}
                  </p>
                )}

                {slide.buttonLabel && slide.navigationLink?.url && (
                  <div>
                    <a
                      href={slide.navigationLink.url}
                      target={isExternalLink(slide.navigationLink.url) ? '_blank' : '_self'}
                      rel={isExternalLink(slide.navigationLink.url) ? 'noopener noreferrer' : undefined}
                      className="gfl-inline-flex gfl-items-center gfl-px-6 gfl-py-3 gfl-font-medium gfl-transition-colors gfl-duration-200"
                      style={{
                        backgroundColor: '#E8FF00',
                        color: '#1A2332',
                      }}
                    >
                      {slide.buttonLabel}
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        {slides.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="gfl-absolute gfl-left-4 gfl-top-1/2 gfl--translate-y-1/2 gfl-bg-white gfl-bg-opacity-80 hover:gfl-bg-opacity-100 gfl-text-gray-800 gfl-rounded-full gfl-p-3 gfl-transition-all gfl-duration-200 gfl-z-20"
              aria-label="Previous slide"
            >
              <svg className="gfl-w-6 gfl-h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={goToNext}
              className="gfl-absolute gfl-right-4 gfl-top-1/2 gfl--translate-y-1/2 gfl-bg-white gfl-bg-opacity-80 hover:gfl-bg-opacity-100 gfl-text-gray-800 gfl-rounded-full gfl-p-3 gfl-transition-all gfl-duration-200 gfl-z-20"
              aria-label="Next slide"
            >
              <svg className="gfl-w-6 gfl-h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Dots Indicator */}
        {slides.length > 1 && (
          <div className="gfl-absolute gfl-bottom-8 gfl-left-1/2 gfl--translate-x-1/2 gfl-flex gfl-gap-2 gfl-z-20">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`gfl-w-3 gfl-h-3 gfl-rounded-full gfl-transition-all gfl-duration-200 ${
                  index === currentSlide
                    ? 'gfl-bg-white gfl-w-8'
                    : 'gfl-bg-white gfl-bg-opacity-50 hover:gfl-bg-opacity-75'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
