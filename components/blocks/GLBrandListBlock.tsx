'use client';

import React from 'react';

import { Block } from 'models/block';
import { TextOption } from 'models/option';
import { NavigationLink } from 'models/navigation';
import { PointerMediaImageItem } from 'models/pointers';

/**
 * Brand item interface matching the BrandList MultiField
 */
export interface BrandItem {
  title?: string;
  blockImagePointer?: PointerMediaImageItem;
  navigationLink?: NavigationLink;
}

/**
 * GLBrandList component props extending Block interface
 */
export interface GLBrandListBlockProps extends Block {
  fields: {
    title?: string;
    fontColor?: TextOption;
    backgroundColor?: TextOption;
    isFullWidth?: boolean;
    brandList?: BrandItem[];
  };
}
 
export const GLBrandListBlock: React.FC<GLBrandListBlockProps> = ({ fields }) => {
  const brandList = fields.brandList ?? [];
  const brandCount = brandList.length;

  // Build container styles
  const containerStyle: React.CSSProperties = {
    ...(fields.backgroundColor?.value && { backgroundColor: fields.backgroundColor.value })
  };

  const textStyle: React.CSSProperties = {
    ...(fields.fontColor?.value && { color: fields.fontColor.value })
  };

  // Build container classes
  const containerClasses = fields.isFullWidth ?? false
    ? 'gfl-block gfl-w-full'
    : 'gfl-block gfl-w-full gfl-max-w-7xl gfl-mx-auto';

  // Calculate grid columns based on brand count for responsive layout
  // Provides optimal layout for different brand counts
  const getGridColumnsClass = () => {
    if (brandCount === 0) return '';
    if (brandCount === 1) return 'gfl-grid-cols-1';
    if (brandCount === 2) return 'gfl-grid-cols-1 sm:gfl-grid-cols-2';
    if (brandCount === 3) return 'gfl-grid-cols-1 sm:gfl-grid-cols-2 md:gfl-grid-cols-3';
    if (brandCount === 4) return 'gfl-grid-cols-2 sm:gfl-grid-cols-2 md:gfl-grid-cols-4';
    if (brandCount === 5) return 'gfl-grid-cols-2 sm:gfl-grid-cols-3 md:gfl-grid-cols-5';
    if (brandCount === 6) return 'gfl-grid-cols-2 sm:gfl-grid-cols-3 md:gfl-grid-cols-6';
    // For 7 or more brands, use a responsive grid
    return 'gfl-grid-cols-2 sm:gfl-grid-cols-3 md:gfl-grid-cols-4 lg:gfl-grid-cols-5 xl:gfl-grid-cols-6 2xl:gfl-grid-cols-7';
  };

  // Render empty state
  if (brandCount === 0) {
    return (
      <div className={containerClasses} style={containerStyle}>
        <div className="gfl-p-8 gfl-text-center">
          {fields.title && (
            <h2 className="gfl-text-3xl gfl-font-bold gfl-mb-4" style={textStyle}>
              {fields.title}
            </h2>
          )}
          <p className="gfl-text-gray-500">No brands to display</p>
        </div>
      </div>
    );
  }

  return (
    <div className={containerClasses} style={containerStyle}>
      <div className="gfl-p-8">
        {/* Title */}
        {fields.title && (
          <h2 className="gfl-text-3xl gfl-font-bold gfl-mb-8 gfl-text-center" style={textStyle}>
            {fields.title}
          </h2>
        )}

        {/* Brand Grid */}
        <div className={`gfl-grid ${getGridColumnsClass()} gfl-gap-8 gfl-items-center gfl-justify-items-center`}>
          {brandList.map((brand, index) => {
            const imageUrl = brand.blockImagePointer?.item?.url;
            const imageAlt = (brand.blockImagePointer?.item as any)?.alt || brand.title || `Brand ${index + 1}`;
            const hasLink = brand.navigationLink?.url;

            // Brand content (image and optional title)
            const brandContent = (
              <div className="gfl-flex gfl-flex-col gfl-items-center gfl-justify-center gfl-gap-3 gfl-w-full gfl-h-full gfl-p-4">
                {/* Brand Logo */}
                {imageUrl ? (
                  <div className="gfl-relative gfl-w-full gfl-max-w-[192px] gfl-h-16 gfl-flex gfl-items-center gfl-justify-center">
                    <img
                      src={imageUrl}
                      alt={imageAlt}
                      className="gfl-max-w-full gfl-max-h-full gfl-object-contain gfl-transition-transform gfl-duration-300 hover:gfl-scale-110"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://via.placeholder.com/192x64?text=Brand';
                      }}
                    />
                  </div>
                ) : (
                  <div className="gfl-w-full gfl-max-w-[192px] gfl-h-16 gfl-bg-gray-200 gfl-rounded gfl-flex gfl-items-center gfl-justify-center">
                    <span className="gfl-text-gray-400 gfl-text-sm">No Image</span>
                  </div>
                )}

                {/* Brand Title (optional) */}
                {brand.title && (
                  <span className="gfl-text-sm gfl-font-medium gfl-text-center" style={textStyle}>
                    {brand.title}
                  </span>
                )}
              </div>
            );

            // Wrap in link if navigation URL exists
            if (hasLink) {
              return (
                <a
                  key={index}
                  href={brand.navigationLink!.url}
                  target={brand.navigationLink!.target || '_self'}
                  rel={brand.navigationLink!.target === '_blank' ? 'noopener noreferrer' : undefined}
                  className="gfl-block gfl-w-full gfl-transition-all gfl-duration-300 hover:gfl-shadow-lg gfl-rounded-lg gfl-bg-white gfl-bg-opacity-50 hover:gfl-bg-opacity-100"
                  aria-label={brand.navigationLink?.name || brand.title || `Brand ${index + 1}`}
                >
                  {brandContent}
                </a>
              );
            }

            // Render without link
            return (
              <div
                key={index}
                className="gfl-w-full gfl-rounded-lg gfl-bg-white gfl-bg-opacity-50"
              >
                {brandContent}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
