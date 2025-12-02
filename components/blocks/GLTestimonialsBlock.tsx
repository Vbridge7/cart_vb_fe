'use client';

import { Block } from 'models/block';
import { TextOption } from 'models/option';
import React, { useEffect, useState } from 'react';


export interface Testimonial {
  testimonialReview: string;
  testimonialName: string;
  testimonialRole: string;
}

export interface GLTestimonialsBlockProps extends Block {
  fields: {
    backgroundColor?: TextOption;
    isFullWidth?: boolean;
    title?: string;
    titleFontColor?: TextOption;
    _description?: string;
    descriptionFontColor?: TextOption;
    buttonColor?: TextOption;
    buttonTextColor?: TextOption;
    testimonialBackgroundColor?: TextOption;
    testimonials?: Testimonial[];
    showLeftSection?: boolean;
    showRightSection?: boolean;
  };
}

export const GLTestimonialsBlock: React.FC<GLTestimonialsBlockProps> = ({ fields }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sanitizedDescription, setSanitizedDescription] = useState('');

  // Sanitize description HTML
  useEffect(() => {
    if (!fields?._description) return setSanitizedDescription('');
    import('isomorphic-dompurify').then((DOMPurifyModule) => {
      const DOMPurify = DOMPurifyModule.default;
      setSanitizedDescription(
        DOMPurify.sanitize(fields._description || '', {
          ALLOWED_TAGS: [
            'p',
            'br',
            'strong',
            'em',
            'a',
            'ul',
            'ol',
            'li',
            'h1',
            'h2',
            'h3',
            'h4',
            'h5',
            'h6',
          ],
          ALLOWED_ATTR: ['href', 'target', 'rel', 'class', 'style'],
        })
      );
    });
  }, [fields?._description]);

  const testimonials = fields?.testimonials || [];
  const showLeft = fields?.showLeftSection ?? true;
  const showRight = fields?.showRightSection ?? true;

  const containerClasses = fields?.isFullWidth
    ? 'block w-full'
    : 'block w-full max-w-7xl mx-auto';

  return (
    <div
      className={containerClasses}
      style={{ backgroundColor: fields?.backgroundColor?.value }}
    >
      <div className="p-8 md:p-12">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* LEFT SECTION */}
          {showLeft && (
            <div className="flex w-full flex-col justify-center gap-5">
              {fields?.title && (
                <h2
                  className="text-3xl font-semibold"
                  style={{ color: fields?.titleFontColor?.value }}
                >
                  {fields.title}
                </h2>
              )}

              {sanitizedDescription && (
                <div
                  className="text-base leading-relaxed"
                  style={{ color: fields?.descriptionFontColor?.value }}
                  dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
                />
              )}
            </div>
          )}

          {/* RIGHT SECTION */}
          {showRight && testimonials.length > 0 && (
            <div
              className="flex w-full justify-center overflow-hidden bg-[#F8F6F2]"
              style={{
                backgroundColor: fields?.testimonialBackgroundColor?.value,
              }}
            >
              <div className="flex w-full max-w-4xl items-center gap-6 p-10 md:p-14">
                {/* Left arrow button */}
                {testimonials.length > 1 && (
                  <button
                    onClick={() =>
                      setCurrentIndex(
                        currentIndex === 0
                          ? testimonials.length - 1
                          : currentIndex - 1
                      )
                    }
                    className="flex h-8 w-8 items-center justify-center border border-black transition hover:bg-black hover:text-white"
                    aria-label="Previous testimonial"
                  >
                    ‹
                  </button>
                )}

                {/* Testimonial content */}
                <div className="flex-1">
                  <p className="mb-6 text-lg font-medium leading-7">
                    "{testimonials[currentIndex].testimonialReview}"
                  </p>

                  <p className="text-base font-semibold">
                    {testimonials[currentIndex].testimonialName}
                  </p>
                  <p className="text-xs opacity-60">
                    {testimonials[currentIndex].testimonialRole}
                  </p>
                </div>

                {/* Right arrow button */}
                {testimonials.length > 1 && (
                  <button
                    onClick={() =>
                      setCurrentIndex(
                        currentIndex === testimonials.length - 1
                          ? 0
                          : currentIndex + 1
                      )
                    }
                    className="flex h-8 w-8 items-center justify-center border border-black transition hover:bg-black hover:text-white"
                    aria-label="Next testimonial"
                  >
                    ›
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
