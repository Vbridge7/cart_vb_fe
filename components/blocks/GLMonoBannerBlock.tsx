import { Block } from 'models/block';
import { LinkFieldDefinition } from 'models/navigation';
import { TextOption } from 'models/option';
import Image from 'next/image';
import React from 'react';

/**
 * GLMonoBanner Block Component
 * Renders a mono banner with image, title, description, navigation link/button, and styling options.
 *
 * Props should match the fields defined in the GLMonoBanner YAML template.
 */
export interface GLMonoBannerProps extends Block {
  fields: {
    blockImagePointer?: {
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
    title?: string;
    _description?: string;
    navigationLink?: LinkFieldDefinition;
    isButton?: boolean;
    buttonSize?: TextOption;
    buttonColor?: TextOption;
    hollowButton?: boolean;
    centerImage?: boolean;
    backgroundColor?: TextOption;
    isFullWidth?: boolean;
    fontColor?: string;
    isBannerImage?: boolean;
    backgroundOverlay?: boolean;
  };
}

export const GLMonoBanner: React.FC<GLMonoBannerProps> = ({ fields }) => {
  const imageUrl = fields.blockImagePointer?.item?.url;
  const imageAlt =
    fields.blockImagePointer?.item?.alt || fields.title || 'Mono Banner';
  const imageWidth = fields.blockImagePointer?.item?.dimension?.width || 800;
  const imageHeight = fields.blockImagePointer?.item?.dimension?.height || 384;

  const containerClasses = [
    'gl-mono-banner',
    fields.isFullWidth ? 'w-full' : 'max-w-5xl mx-auto',
  ]
    .filter(Boolean)
    .join(' ');

  const containerStyle: React.CSSProperties = {
    ...(fields.fontColor && { color: fields.fontColor }),
    ...(fields.backgroundColor?.value && {
      backgroundColor: fields.backgroundColor.value,
    }),
  };

  const imageClasses = [
    'mb-6 max-h-96 object-cover rounded-lg shadow-lg z-10',
    fields.centerImage ? 'mx-auto' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const buttonSizeClass =
    fields.buttonSize?.value === 'small'
      ? 'text-sm'
      : fields.buttonSize?.value === 'large'
        ? 'text-lg'
        : 'text-base';

  const buttonStyleClasses = fields.hollowButton
    ? 'border-2 border-brand-primary text-brand-primary bg-transparent hover:bg-brand-primary hover:text-white'
    : `bg-brand-${fields.buttonColor?.value || 'primary'} text-white hover:bg-brand-secondary`;

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
          <div className="relative z-10 max-h-96 w-full overflow-hidden rounded-lg shadow-lg">
            <Image
              src={imageUrl}
              alt={imageAlt}
              width={imageWidth}
              height={imageHeight}
              className={imageClasses}
            />
          </div>
        )}
        {fields.title && (
          <h2 className="z-10 mb-2 text-3xl font-bold">{fields.title}</h2>
        )}
        {fields._description && (
          <p className="z-10 mb-4 text-lg">{fields._description}</p>
        )}
        {fields.navigationLink?.url && fields.isButton ? (
          <a
            href={fields.navigationLink.url}
            className={`z-10 inline-block rounded px-6 py-3 font-semibold transition ${buttonStyleClasses} ${buttonSizeClass}`}
          >
            {fields.navigationLink.text}
          </a>
        ) : fields.navigationLink?.url ? (
          <a
            href={fields.navigationLink.url}
            className="text-brand-primary z-10 underline"
          >
            {fields.navigationLink.text}
          </a>
        ) : null}
      </div>
    </section>
  );
};

export default GLMonoBanner;
