import { Block } from 'models/block';
import React from 'react';
import { TextOption } from 'models/option';

export interface GLCategoryBlockBannerProps extends Block {
  fields: {
    title?: string;
    _description?: string;
    backgroundColor?: TextOption;
    textColor?: TextOption;
    backgroundImage?: {
      item?: {
        alt?: string;
        filename?: string;
        url?: string;
        dimension?: {
          height?: number;
          width?: number;
        };
      };
    };
    className?: string;
  };
}

/**
 * GLCategoryBlockBanner - Category Block Banner (GL)
 * Reusable component for displaying a category banner with customizable styling.
 */
export const GLCategoryBlockBanner: React.FC<GLCategoryBlockBannerProps> = ({
  fields,
}) => {
  const backgroundImageUrl = fields.backgroundImage?.item?.url;

  const containerClasses = [
    'relative p-8 rounded-lg shadow-md overflow-hidden',
    fields.className || '',
  ]
    .filter(Boolean)
    .join(' ');

  const containerStyle: React.CSSProperties = {
    ...(fields.backgroundColor?.value && { backgroundColor: fields.backgroundColor.value }),
    ...(fields.textColor?.value && { color: fields.textColor.value }),
  };

  const backgroundStyle: React.CSSProperties = backgroundImageUrl
    ? {
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    : {};

  return (
    <section className={containerClasses} style={containerStyle} aria-label="Category Block Banner">
      <div className="relative z-10">
        {fields.title && (
          <h2 className="mb-2 text-2xl font-bold">{fields.title}</h2>
        )}
        {fields._description && (
          <p className="text-base opacity-80">{fields._description}</p>
        )}
      </div>
      {backgroundImageUrl && (
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-20"
          style={backgroundStyle}
          aria-hidden="true"
        />
      )}
    </section>
  );
};

export default GLCategoryBlockBanner;
