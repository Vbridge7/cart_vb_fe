'use client';

import React, { useContext, useEffect, useState } from 'react';

import { WebsiteContext } from 'contexts/websiteContext';
import { Block } from 'models/block';
import { NavigationLink } from 'models/navigation';
import { TextOption } from 'models/option';
import Image from 'next/image';
import { getAbsoluteImageUrl } from 'services/imageService';

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
  const {imageServerUrl} =useContext(WebsiteContext)

  // Auto-advance carousel every 5 seconds
  useEffect(() => {
    if (slides.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 2000);

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
    ? 'w-full'
    : 'w-full max-w-7xl mx-auto';

  if (slides.length === 0) {
    return (
      <div className={`carousel-banner p-8 text-center ${containerClasses}`} style={containerStyle}>
        <p className="text-gray-500" style={textStyle}>No carousel slides available</p>
      </div>
    );
  }

  return (
    <div className={`carousel-banner relative ${containerClasses}`} style={containerStyle}>
      {/* Carousel Container */}
      <div className="relative overflow-hidden h-96" >
        {/* Slides */}
        <div
          className="flex transition-transform duration-500 ease-in-out h-full"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-full h-full relative px-12 py-5"
              style={{
                background: 'linear-gradient(360deg, rgba(255, 255, 255, 0) 12%, rgba(251.13, 255, 212.09, 0.12) 50%, rgba(255, 255, 255, 0) 87%), var(--primary, #1A2332)',
              }}
            >
              {/* Background Image */}
              {slide.slideImage?.item?.url && (
                <div className="absolute inset-0 z-0">
                  <Image
                    src={getAbsoluteImageUrl(slide.slideImage.item,imageServerUrl)}
                    alt={slide.slideImage.item.alt || slide.title || 'Carousel slide'}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />

                  {/* Overlay for better text readability */}
                  <div className="absolute inset-0 bg-black opacity-40"></div>
                </div>
              )}

              {/* Decorative Elements - inspired by the HTML structure
              <div className="absolute w-20 h-20 right-24 bottom-24 z-10" style={{ backgroundColor: '#E8FF00' }}></div>
              <div className="absolute w-60 h-60 -left-20 -top-20 border border-yellow-300 z-10"></div>
              <div className="absolute w-9 h-9 right-16 top-24 z-10" style={{ backgroundColor: '#E8FF00' }}></div>
              <div className="absolute w-3.5 h-3.5 right-12 bottom-16 z-10" style={{ backgroundColor: '#E8FF00' }}></div>
              <div className="absolute w-3 h-3 right-28 bottom-8 z-10" style={{ backgroundColor: '#E8FF00' }}></div>
              <div className="absolute w-2 h-2 right-20 bottom-24 z-10" style={{ backgroundColor: '#E8FF00' }}></div>
              <div className="absolute w-14 h-14 right-16 bottom-12 z-10" style={{ backgroundColor: '#E8FF00' }}></div> */}

              {/* Slide Content */}
              <div className="relative z-20 flex flex-col justify-center h-full max-w-2xl">
                {slide.title && (
                  <h2
                    className="text-5xl font-bold mb-4 leading-tight"
                    style={{ color: 'white', ...textStyle }}
                  >
                    {slide.title}
                  </h2>
                )}

                {slide.slideDescription && (
                  <p
                    className="text-lg mb-6 leading-relaxed"
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
                      className="inline-flex items-center px-6 py-3 font-medium transition-colors duration-200"
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
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-800 rounded-full p-3 transition-all duration-200 z-20"
              aria-label="Previous slide"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-800 rounded-full p-3 transition-all duration-200 z-20"
              aria-label="Next slide"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Dots Indicator */}
        {slides.length > 1 && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentSlide
                    ? 'bg-white w-8'
                    : 'bg-white bg-opacity-50 hover:bg-opacity-75'
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
