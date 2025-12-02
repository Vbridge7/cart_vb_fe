'use client';

import { Block } from 'models/block';
import { TextOption } from 'models/option';
import { Product } from 'models/Product';
import DOMPurify from 'isomorphic-dompurify';
import React, { useMemo } from 'react';
import Image from 'next/image';

import { ProductCard } from '../products/ProductCard';

export interface GLFeaturedProductsBannerBlockProps extends Block {
  fields: {
    backgroundColor?: TextOption;
    isFullWidth?: boolean;
    showImageToRight?: boolean;
    blockImagePointer?: {
      item?: {
        url?: string;
      };
    };
    backgroundOverlay?: boolean;
    title?: string;
    fontColor?: string;
    _description?: string;
    navigationLink?: {
      text?: string;
      url?: string;
    };
    isButton?: boolean;
    blockTitle?: string;
    productsLinkList?: string[];
    showVariants?: boolean;
  };
  products?: Product[];
  onProductClick?: (product: Product) => void;
}

export const GLFeaturedProductsBannerBlock: React.FC<GLFeaturedProductsBannerBlockProps> = ({
  fields,
  products = [],
  onProductClick,
}) => {
  // Sanitize HTML content to prevent XSS attacks
  const sanitizedDescription = useMemo(() => {
    if (!fields._description) return '';
    return DOMPurify.sanitize(fields._description, {
      ALLOWED_TAGS: [
        'p',
        'br',
        'strong',
        'em',
        'u',
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
        'span',
        'div',
        'blockquote',
        'code',
        'pre',
      ],
      ALLOWED_ATTR: ['href', 'target', 'rel', 'class', 'style'],
    });
  }, [fields._description]);

  // Build container styles
  const containerStyle: React.CSSProperties = {
    ...(fields.backgroundColor?.value && {
      backgroundColor: fields.backgroundColor.value,
    }),
  };

  const textStyle: React.CSSProperties = {
    ...(fields.fontColor && { color: fields.fontColor }),
  };

  // Build container classes
  const containerClasses =
    (fields.isFullWidth ?? false)
      ? 'gfl-block gfl-w-full'
      : 'gfl-block gfl-w-full gfl-max-w-7xl gfl-mx-auto';

  const imageUrl = fields.blockImagePointer?.item?.url;

  return (
    <div className={containerClasses} style={containerStyle}>
      {/* Banner Section */}
      <div
        className={`gfl-grid gfl-grid-cols-1 ${imageUrl ? 'md:gfl-grid-cols-2' : ''} gfl-gap-8 gfl-p-8 gfl-items-center`}
      >
        {/* Text Content */}
        <div
          className={`${(fields.showImageToRight ?? false) ? 'gfl-order-1' : imageUrl ? 'gfl-order-2' : ''}`}
          style={textStyle}
        >
          {fields.title && (
            <h2 className="gfl-text-4xl gfl-font-bold gfl-mb-4">
              {fields.title}
            </h2>
          )}
          {sanitizedDescription && (
            <div
              className="gfl-text-lg gfl-leading-relaxed gfl-mb-6"
              dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
            />
          )}
          {fields.navigationLink?.url && fields.navigationLink?.text && (
            <div>
              {(fields.isButton ?? false) ? (
                <a
                  href={fields.navigationLink.url}
                  className="gfl-inline-flex gfl-items-center gfl-px-6 gfl-py-3 gfl-bg-blue-600 gfl-text-white gfl-font-medium gfl-rounded-lg hover:gfl-bg-blue-700 gfl-transition-colors gfl-duration-200"
                >
                  {fields.navigationLink.text}
                </a>
              ) : (
                <a
                  href={fields.navigationLink.url}
                  className="gfl-inline-flex gfl-items-center gfl-text-blue-600 hover:gfl-text-blue-800 gfl-font-medium gfl-underline"
                >
                  {fields.navigationLink.text}
                </a>
              )}
            </div>
          )}
        </div>

        {/* Image */}
        {imageUrl && (
          <div
            className={`gfl-relative ${(fields.showImageToRight ?? false) ? 'gfl-order-2' : 'gfl-order-1'}`}
          >
            <div className="gfl-relative gfl-h-96 gfl-overflow-hidden gfl-rounded-lg">
              <Image
                src={imageUrl}
                alt={fields.title || 'Banner image'}
                fill
                className="gfl-object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src =
                    'https://via.placeholder.com/800x600?text=No+Image';
                }}
              />
              {(fields.backgroundOverlay ?? false) && (
                <div className="gfl-absolute gfl-inset-0 gfl-bg-black gfl-bg-opacity-30"></div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Featured Products Section */}
      {products.length > 0 && (
        <div className="gfl-p-8">
          {fields.blockTitle && (
            <h3
              className="gfl-text-3xl gfl-font-bold gfl-mb-8 gfl-text-gray-900"
              style={textStyle}
            >
              {fields.blockTitle}
            </h3>
          )}
          <div className="gfl-grid gfl-grid-cols-1 gfl-gap-6 gfl-sm:grid-cols-2 gfl-lg:grid-cols-3 gfl-xl:grid-cols-5">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onProductClick={onProductClick}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
