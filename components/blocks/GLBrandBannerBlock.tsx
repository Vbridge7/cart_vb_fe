'use client';

import { Block } from 'models/block';
import { TextOption } from 'models/option';
import DOMPurify from 'isomorphic-dompurify';
import React, { useMemo } from 'react';


interface BrandLogoItem {
  blockImagePointer?: {
    item?: {
      url: string;
      alt?: string;
      dimension?: {
        height?: number;
        width?: number;
      };
    };
  };
}

export interface GLBrandBannerBlockProps extends Block {
  fields: {
    blockTitle?: string;
    leftHeading?: string;
    leftSubheading?: string;
    leftDescription?: string;
    brandSectionTitle?: string;
    brandLogos?: BrandLogoItem[];
    backgroundColor?: TextOption;
    titleFontColor?: TextOption;
    fontColor?: TextOption;
    isFullWidth?: boolean;
    gridColumns?: TextOption[];
  };
}

export const GLBrandBannerBlock: React.FC<GLBrandBannerBlockProps> = ({ fields }) => {
  const sanitizedDescription = useMemo(() => {
    if (!fields.leftDescription) return '';
    return DOMPurify.sanitize(fields.leftDescription, {
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
        'span',
        'div',
      ],
      ALLOWED_ATTR: ['href', 'target', 'rel', 'class', 'style'],
    });
  }, [fields.leftDescription]);

  const hasLeftContent = !!(
    fields.leftHeading ||
    fields.leftSubheading ||
    fields.leftDescription
  );

  const containerStyle: React.CSSProperties = {
    ...(fields.backgroundColor?.value && {
      backgroundColor: fields.backgroundColor.value,
    }),
  };

  const titleStyle: React.CSSProperties = {
    ...(fields.titleFontColor?.value && { color: fields.titleFontColor.value }),
  };

  const contentStyle: React.CSSProperties = {
    ...(fields.fontColor?.value && { color: fields.fontColor.value }),
  };

  // Map gridColumns value to Tailwind classes (fixed columns, no responsive)
  const getGridColsClass = () => {
    const cols = fields.gridColumns?.[0]?.value || '4';
    const colsMap: Record<string, string> = {
      '2': 'grid-cols-2',
      '3': 'grid-cols-3',
      '4': 'grid-cols-4',
      '5': 'grid-cols-5',
      '6': 'grid-cols-6',
    };
    return colsMap[cols] || 'grid-cols-4';
  };

  return (
    <div
      className={`w-full ${fields.isFullWidth ? '' : 'mx-auto max-w-7xl'} px-6 py-12 sm:px-12`}
    >
      <div
        className="overflow-hidden rounded-lg p-6 sm:p-12"
        style={containerStyle}
      >
        {/* Block Title */}
        {fields.blockTitle && (
          <h2 className="mb-8 text-2xl font-semibold" style={titleStyle}>
            {fields.blockTitle}
          </h2>
        )}

        {/* Main Flex Container */}
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Left Content */}
          {hasLeftContent && (
            <div className="flex w-full flex-col gap-4 lg:w-1/2">
              {fields.leftSubheading && (
                <span
                  className="text-sm font-semibold uppercase"
                  style={titleStyle}
                >
                  {fields.leftSubheading}
                </span>
              )}
              {fields.leftHeading && (
                <h3
                  className="mt-1 text-2xl font-semibold leading-tight md:text-3xl"
                  style={contentStyle}
                >
                  {fields.leftHeading}
                </h3>
              )}
              {sanitizedDescription && (
                <div
                  className="text-base leading-relaxed"
                  style={contentStyle}
                  dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
                />
              )}
            </div>
          )}

          {/* Right Logos */}
          <div className="flex w-full flex-col lg:w-1/2">
            {fields.brandSectionTitle && (
              <h3
                className="mb-6 text-xl font-semibold md:text-2xl"
                style={contentStyle}
              >
                {fields.brandSectionTitle}
              </h3>
            )}
            {fields.brandLogos && fields.brandLogos.length > 0 ? (
              <div className={`grid ${getGridColsClass()} gap-4 md:gap-8`}>
                {fields.brandLogos.map((logo, index) => {
                  const url = logo.blockImagePointer?.item?.url;
                  if (!url) return null;
                  const alt =
                    logo.blockImagePointer?.item?.alt ||
                    `Brand logo ${index + 1}`;
                  return (
                    <div
                      key={index}
                      className="flex items-center justify-center p-4"
                    >
                      <img
                        src={url}
                        alt={alt}
                        className="h-auto max-w-full object-contain"
                        style={{ maxHeight: '75px', width: 'auto' }}
                        loading="lazy"
                      />
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="py-8 text-center text-gray-400">
                No brand logos to display
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
