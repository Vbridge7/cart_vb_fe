'use client';

import { Block } from 'models/block';
import { NavigationLink } from 'models/navigation';
import { TextOption } from 'models/option';
import { PointerMediaImageItem } from 'models/pointers';
import React from 'react';


export interface LinkItem {
  blockImagePointer?: PointerMediaImageItem;
  navigationLink?: NavigationLink;
}

export interface GLLinkListingBlockProps extends Block {
  fields: {
    title?: string;
    navigationList?: LinkItem[];
    backgroundColor?: TextOption;
    fullWidthBlock?: boolean;
  };
}

export const GLLinkListingBlock: React.FC<GLLinkListingBlockProps> = ({ fields }) => {
  const links = React.useMemo(() => {
    if (fields.navigationList && Array.isArray(fields.navigationList)) {
      return fields.navigationList.filter(
        (item) => item.blockImagePointer || item.navigationLink
      );
    }
    return [];
  }, [fields.navigationList]);

  const bgColorValue = React.useMemo(() => {
    return Array.isArray(fields.backgroundColor)
      ? fields.backgroundColor[0]?.value
      : fields.backgroundColor?.value;
  }, [fields.backgroundColor]);

  const containerStyle: React.CSSProperties = React.useMemo(() => {
    if (bgColorValue && !bgColorValue.startsWith('bg-')) {
      return { backgroundColor: bgColorValue };
    }
    return {};
  }, [bgColorValue]);

  const containerClasses = React.useMemo(() => {
    const base = fields.fullWidthBlock
      ? 'gfl-block w-full px-12 py-12'
      : 'gfl-block w-full max-w-7xl mx-auto px-12 py-12';

    if (bgColorValue && bgColorValue.startsWith('bg-')) {
      return `${base} ${bgColorValue}`;
    }
    return base;
  }, [fields.fullWidthBlock, bgColorValue]);

  if (links.length === 0) {
    return (
      <div className={containerClasses} style={containerStyle}>
        {fields.title && (
          <h2 className="mb-4 text-2xl font-semibold text-black">
            {fields.title}
          </h2>
        )}
        <div className="py-12 text-center text-gray-500">
          No links available
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${containerClasses} relative flex flex-col items-start gap-4`}
      style={containerStyle}
    >
      {/* Title */}
      {fields.title && (
        <h2 className="text-[14px] font-semibold text-black">{fields.title}</h2>
      )}

      {/* Figma Gradient Overlay */}
      <div className="pointer-events-none absolute left-[45px] top-[81px] mt-4 h-[241px] w-[1417px] bg-gradient-to-r from-white/95 to-white/0"></div>

      {/* Horizontal Scroll Section */}
      <div className="w-full overflow-hidden">
        <div className="scrollbar-thin scrollbar-thumb-[#101010] scrollbar-track-[rgba(16,16,16,0.20)] horizontal-scrollbar flex gap-[15px] overflow-x-auto overflow-y-hidden pb-4">
          {links.map((link, index) => {
            const imageUrl = link.blockImagePointer?.item?.url;
            const imageAlt =
              (link.blockImagePointer?.item as any)?.alt ||
              link.navigationLink?.name ||
              `Link ${index + 1}`;
            const linkUrl = link.navigationLink?.url || '#';
            const linkText = link.navigationLink?.name || `Link ${index + 1}`;

            return (
              <a
                key={index}
                href={linkUrl}
                className="flex flex-shrink-0 flex-col bg-white transition-all duration-300 hover:shadow-lg"
              >
                {/* Image */}
                <div className="relative h-[163px] w-[221px] overflow-hidden bg-[#1A2332]">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={imageAlt}
                      className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="h-full w-full" />
                  )}
                </div>

                {/* Text + Arrow */}
                <div className="flex w-full items-center gap-2 py-[6px]">
                  <span className="text-[14px] font-semibold text-[#101010]">
                    {linkText}
                  </span>

                  <div className="flex h-6 w-6 items-center justify-center">
                    <svg width="18" height="15" viewBox="0 0 18 15" fill="none">
                      <path
                        d="M1 7.5h16M10 2l6 5.5L10 13"
                        stroke="#101010"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};
