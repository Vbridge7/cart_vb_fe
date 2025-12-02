'use client';
import { Block } from 'models/block';
import { CategoryItem } from 'models/category';
import { TextOption } from 'models/option';
import React from 'react';


export interface CategorySelectorItem {
  categoryPointer?: string;
  showAllChildCategories?: boolean;
}

export interface GLCategoryListingBlockProps extends Block {
  fields: {
    title?: string;
    categorySelector?: CategorySelectorItem[];
    backgroundColor?: TextOption;
    fullWidthBlock?: boolean;
  };
  categories?: CategoryItem[];
  onCategoryClick?: (category: CategoryItem) => void;
}

export const GLCategoryListingBlock: React.FC<GLCategoryListingBlockProps> = ({
  fields,
  categories: categoriesProp,
  onCategoryClick,
}) => {
  // Extract categories from categorySelector field
  const categories = React.useMemo(() => {
    if (categoriesProp && categoriesProp.length > 0) {
      return categoriesProp;
    }

    // Extract from fields.categorySelector if available
    if (fields.categorySelector && Array.isArray(fields.categorySelector)) {
      const extractedCategories = fields.categorySelector
        .flatMap((selector: any) => {
          // categoryPointer is an array, so we need to handle it
          if (Array.isArray(selector?.categoryPointer)) {
            return selector.categoryPointer
              .map((pointer: any) => pointer?.item)
              .filter(Boolean);
          }
          // Fallback for if it's an object (old structure)
          return selector?.categoryPointer?.item
            ? [selector.categoryPointer.item]
            : [];
        })
        .filter(Boolean);

      console.log(
        'GLCategoryListing - Extracted categories:',
        extractedCategories
      );
      return extractedCategories;
    }

    return [];
  }, [categoriesProp, fields.categorySelector]);

  // Extract backgroundColor value
  const bgColorValue = React.useMemo(() => {
    return Array.isArray(fields.backgroundColor)
      ? fields.backgroundColor[0]?.value
      : fields.backgroundColor?.value;
  }, [fields.backgroundColor]);

  // Build container styles - only use if it's a valid color value (not a CSS class)
  const containerStyle: React.CSSProperties = React.useMemo(() => {
    if (bgColorValue && !bgColorValue.startsWith('bg-')) {
      // It's a color value like "#ffffff" or "white"
      return { backgroundColor: bgColorValue };
    }
    return {};
  }, [bgColorValue]);

  // Build container classes - include backgroundColor if it's a Tailwind class
  const containerClasses = React.useMemo(() => {
    const baseClasses = fields.fullWidthBlock
      ? 'gfl-block gfl-w-full gfl-px-12 gfl-py-12'
      : 'gfl-block gfl-w-full gfl-max-w-7xl gfl-mx-auto gfl-px-12 gfl-py-12';

    // Add backgroundColor class if it's a Tailwind class
    if (bgColorValue && bgColorValue.startsWith('bg-')) {
      return `${baseClasses} ${bgColorValue}`;
    }
    return baseClasses;
  }, [fields.fullWidthBlock, bgColorValue]);

  const handleCategoryClick = (category: CategoryItem) => {
    if (onCategoryClick) {
      onCategoryClick(category);
    }
  };

  if (categories.length === 0) {
    return (
      <div className={containerClasses} style={containerStyle}>
        {fields.title && (
          <h2 className="gfl-text-2xl gfl-font-semibold gfl-text-black gfl-mb-4">
            {fields.title}
          </h2>
        )}
        <div className="gfl-text-center gfl-py-12 gfl-text-gray-500">
          No categories available
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        className={containerClasses}
        style={{
          ...containerStyle,
          position: 'relative',
          //overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          gap: '16px',
        }}
      >
        {/* Title */}
        {fields.title && (
          <h2
            className="gfl-text-2xl gfl-font-semibold gfl-text-black"
            style={{
              fontSize: '24px',
              fontWeight: '600',
              wordWrap: 'break-word',
            }}
          >
            {fields.title}
          </h2>
        )}

        {/* Categories Container */}
        <div style={{ overflow: 'hidden', width: '100%' }}>
          <div
            className="gfl-w-full"
            style={{
              display: 'flex',
              gap: '15px',
              overflowX: 'auto',
              overflowY: 'hidden',
              whiteSpace: 'nowrap',
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'thin',
              scrollbarColor: '#101010 rgba(16,16,16,0.2)',
            }}
          >
            {categories.map((category) => {
              const categoryImage = category.images?.[0]?.url;

              return (
                <div
                  key={category.id}
                  className="gfl-cursor-pointer gfl-bg-white gfl-overflow-hidden gfl-flex-shrink-0 gfl-transition-all gfl-duration-300 hover:gfl-shadow-lg"
                  onClick={() => handleCategoryClick(category)}
                  style={{
                    background: 'white',
                    flexShrink: 0,
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    display: 'flex',
                  }}
                >
                  {/* Category Image */}
                  <div
                    className="gfl-relative gfl-overflow-hidden gfl-bg-gray-800"
                    style={{
                      width: '221px',
                      height: '163px',
                      background: 'var(--primary, #1A2332)',
                    }}
                  >
                    {categoryImage ? (
                      <img
                        src={categoryImage}
                        alt={category.name}
                        className="gfl-w-full gfl-h-full gfl-object-cover gfl-transition-transform gfl-duration-300 hover:gfl-scale-110"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="gfl-flex gfl-items-center gfl-justify-center gfl-h-full gfl-w-full" />
                    )}
                  </div>

                  {/* Category Name and Arrow */}
                  <div
                    className="gfl-w-full gfl-flex gfl-items-center gfl-gap-2 gfl-py-1.5"
                    style={{
                      alignSelf: 'stretch',
                      paddingTop: '6px',
                      paddingBottom: '6px',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      gap: '8px',
                      display: 'inline-flex',
                    }}
                  >
                    <div
                      className="gfl-text-base gfl-font-semibold gfl-leading-7"
                      style={{
                        color: '#1A2332',
                        fontSize: '16px',
                        fontWeight: '600',
                        lineHeight: '27px',
                        wordWrap: 'break-word',
                      }}
                    >
                      {category.name}
                    </div>

                    {/* Arrow Icon */}
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="gfl-flex-shrink-0"
                    >
                      <path
                        d="M5 12h14M13 6l6 6-6 6"
                        stroke="#1A2332"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
