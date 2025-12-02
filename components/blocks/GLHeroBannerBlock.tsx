import { Block } from 'models/block';
import React from 'react';
import Image from 'next/image';
import { TextOption } from 'models/option';

/**
 * GLHeroBanner Block Component
 * Renders a hero banner with image, title, description, link text, and styling options.
 *
 * Props should match the fields defined in the GLHeroBanner YAML template.
 */
export interface GLHeroBannerProps extends Block {
  fields: {
    blockImagePointer?: {
      entitySystemId?: string;
      item?: {
        alt?: string;
        filename?: string;
        url?: string;
      };
    };
    title?: string;
    _name?: string;
    _description?: string;
    linkText?: string;
    isFullWidth?: boolean;
    backgroundColor?: TextOption;
    fontColor?: string;
    backgroundOverlay?: boolean;
  };
}

export const GLHeroBanner: React.FC<GLHeroBannerProps> = ({ fields }) => {
  const imageUrl = fields.blockImagePointer?.item?.url;
  const imageAlt = fields.blockImagePointer?.item?.alt || fields.title || fields._name || 'Hero Banner';

  const containerClasses = [
    'gl-hero-banner',
    fields.isFullWidth ? 'w-full' : 'max-w-5xl mx-auto',
  ]
    .filter(Boolean)
    .join(' ');

  const containerStyle: React.CSSProperties = {
    ...(fields.fontColor && { color: fields.fontColor }),
    ...(fields.backgroundColor?.value && { backgroundColor: fields.backgroundColor.value }),
  };

  return (
    <section className={containerClasses} style={containerStyle}>
      <div className="relative flex flex-col items-center justify-center px-4 py-12 text-center">
        {fields.backgroundOverlay && (
          <div
            className="pointer-events-none absolute inset-0 bg-black opacity-30"
            aria-hidden="true"
          />
        )}
        {imageUrl && (
          <div className="z-10 mb-6 relative max-h-96 w-full rounded-lg overflow-hidden shadow-lg">
            <Image
              src={imageUrl}
              alt={imageAlt}
              width={800}
              height={384}
              className="object-cover"
            />
          </div>
        )}
        {fields.title && (
          <h1 className="z-10 mb-2 text-4xl font-bold">{fields.title}</h1>
        )}
        {fields._description && (
          <p className="z-10 mb-4 text-lg">{fields._description}</p>
        )}
        {fields.linkText && (
          <a
            href="#"
            className="bg-brand-primary hover:bg-brand-secondary z-10 inline-block rounded px-6 py-3 font-semibold text-white transition"
          >
            {fields.linkText}
          </a>
        )}
      </div>
    </section>
  );
};

export default GLHeroBanner;
