'use client';

import DOMPurify from 'isomorphic-dompurify';
import { Block } from 'models/block';
import { NavigationLink } from 'models/navigation';
import { TextOption } from 'models/option';
import { PointerMediaImageItem } from 'models/pointers';
import Image from 'next/image';
import React, { useMemo } from 'react';


export interface ColumnBlock {
  blockImagePointer?: PointerMediaImageItem;
  backgroundOverlay?: boolean;
  blockTitle?: string;
  multiLangEditor?: string;
  navigationLink?: NavigationLink;
  isButton?: boolean;
}

export interface GLColumnBannerBlockProps extends Omit<Block, 'children'> {
  fields: {
    backgroundColor?: TextOption;
    isFullWidth?: boolean;
    isSingleRowLayout?: boolean;
    gutterBlock?: boolean;
    fontColor?: TextOption;
    columnBlocks?: ColumnBlock[];
  };
  children?: React.ReactNode;
}

export const GLColumnBannerBlock: React.FC<GLColumnBannerBlockProps> = ({ fields }) => {
  const {
    backgroundColor,
    isFullWidth,
    isSingleRowLayout,
    gutterBlock,
    fontColor,
    columnBlocks = [],
  } = fields;

  const containerStyle: React.CSSProperties = {
    ...(backgroundColor?.value && { backgroundColor: backgroundColor.value }),
  };

  const columnStyle: React.CSSProperties = {
    ...(fontColor?.value && { color: fontColor.value }),
  };

  const columnCount = columnBlocks?.length;

  // Determine explicit Tailwind grid classes
  const gridColsClassMap: Record<number, string> = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
  };

  const gridColsClass =
    isSingleRowLayout && (columnCount === 3 || columnCount === 4)
      ? gridColsClassMap[columnCount] || 'grid-cols-1'
      : columnCount === 1
        ? 'grid-cols-1'
        : 'grid-cols-2';

  const containerClasses = isFullWidth ? 'w-full' : 'max-w-7xl mx-auto';

  const gapClasses = gutterBlock ? 'gap-x-8 gap-y-4' : 'gap-0';

  return (
    <div className={`${containerClasses}`} style={containerStyle}>
      <div className={`grid min-h-full ${gridColsClass} ${gapClasses}`}>
        {columnBlocks?.map((columnBlock, index) => (
          <ColumnItem
            key={index}
            columnBlock={columnBlock}
            columnCount={columnCount}
            columnStyle={columnStyle}
            backgroundColor={backgroundColor}
          />
        ))}
      </div>
    </div>
  );
};

interface ColumnItemProps {
  columnBlock: ColumnBlock;
  columnCount: number;
  columnStyle: React.CSSProperties;
  backgroundColor?: TextOption;
}

const ColumnItem: React.FC<ColumnItemProps> = ({
  columnBlock,
  columnCount,
  columnStyle,
  backgroundColor,
}) => {
  const sanitizedContent = useMemo(() => {
    if (!columnBlock.multiLangEditor) return '';
    return DOMPurify.sanitize(columnBlock.multiLangEditor, {
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
  }, [columnBlock.multiLangEditor]);

  const hasImage = columnBlock.blockImagePointer?.item?.url;

  const titleSizeClass =
    columnCount === 1
      ? 'lg:text-[46px] lg:leading-10'
      : columnCount === 4
        ? 'lg:text-[26px]'
        : 'lg:text-[36px]';

  return (
    <div
      className={`relative flex rounded-lg ${hasImage ? 'h-[34rem]' : ''}`}
      style={
        backgroundColor?.value
          ? { backgroundColor: backgroundColor.value }
          : undefined
      }
    >
      {hasImage && columnBlock.blockImagePointer?.item && (
        <Image
          src={columnBlock.blockImagePointer.item.url}
          alt={columnBlock.blockTitle || ''}
          fill
          className="rounded-lg object-cover object-center"
          loading="lazy"
        />
      )}

      {columnBlock.backgroundOverlay && (
        <div className="absolute inset-0 rounded-lg bg-black bg-opacity-50" />
      )}

      <div
        style={columnStyle}
        className={`relative flex w-full flex-col items-end justify-end p-7 md:p-10 ${
          columnCount === 1 ? 'xl:w-1/2' : ''
        }`}
      >
        <div className={`w-full ${columnCount === 1 ? 'self-start' : ''}`}>
          {columnBlock.blockTitle && (
            <h2 className={`mb-4 font-bold sm:text-2xl ${titleSizeClass}`}>
              {columnBlock.blockTitle}
            </h2>
          )}

          {sanitizedContent && (
            <div className="overflow-hidden break-words text-base">
              <div
                className="[&>p:first-of-type]:mt-0 [&>p:last-of-type]:mb-0"
                dangerouslySetInnerHTML={{ __html: sanitizedContent }}
              />
            </div>
          )}
        </div>

        {columnBlock.navigationLink?.name &&
          columnBlock.navigationLink?.url && (
            <div
              className={`w-full pt-4 ${
                columnBlock.isButton ? 'flex justify-start' : ''
              }`}
            >
              <a
                href={columnBlock.navigationLink.url}
                className={
                  columnBlock.isButton
                    ? 'inline-flex items-center rounded-lg bg-blue-600 px-6 py-3 text-sm font-bold text-white transition-colors duration-200 hover:bg-blue-700'
                    : 'inline-block min-h-9 px-4 pl-0 text-base font-bold leading-4 tracking-wide hover:underline'
                }
              >
                {columnBlock.navigationLink.name}
              </a>
            </div>
          )}
      </div>
    </div>
  );
};
