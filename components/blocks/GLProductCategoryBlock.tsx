'use client';

import React from 'react';

import { Block } from 'models/block';
import { TextOption } from 'models/option';
import { CategoryItem } from 'models/category';

export interface GLProductCategoryBlockProps extends Block {
  fields: {
    categoryList?: string[];
    backgroundColor: TextOption;
    fullWidthBlock: boolean;
  };
  categories?: CategoryItem[];
  onCategoryClick?: (category: CategoryItem) => void;
}

export const GLProductCategoryBlock: React.FC<GLProductCategoryBlockProps> = ({
  fields,
  categories = [],
  onCategoryClick
}) => {
  // Build container styles
  const containerStyle: React.CSSProperties = {
    ...(fields.backgroundColor?.value && { backgroundColor: fields.backgroundColor.value })
  };

  // Build container classes
  const containerClasses = fields.fullWidthBlock
    ? 'gfl-block gfl-w-full gfl-p-8'
    : 'gfl-block gfl-w-full gfl-max-w-7xl gfl-mx-auto gfl-p-8';

  const handleCategoryClick = (category: CategoryItem) => {
    if (onCategoryClick) {
      onCategoryClick(category);
    }
  };

  if (categories.length === 0) {
    return (
      <div className={containerClasses} style={containerStyle}>
        <div className="gfl-text-center gfl-py-12 gfl-text-gray-500">
          No categories available
        </div>
      </div>
    );
  }

  return (
    <div className={containerClasses} style={containerStyle}>
      <div className="gfl-grid gfl-grid-cols-1 gfl-sm:grid-cols-2 gfl-md:grid-cols-3 gfl-lg:grid-cols-4 gfl-gap-6">
        {categories.map((category) => {
          const categoryImage = category.images?.[0]?.url;

          return (
            <div
              key={category.id}
              className="gfl-group gfl-cursor-pointer gfl-bg-white gfl-rounded-lg gfl-shadow-md gfl-overflow-hidden gfl-transition-all gfl-duration-300 hover:gfl-shadow-xl hover:gfl-scale-105"
              onClick={() => handleCategoryClick(category)}
            >
              {/* Category Image */}
              <div className="gfl-relative gfl-h-48 gfl-overflow-hidden gfl-bg-gray-200">
                {categoryImage ? (
                  <img
                    src={categoryImage}
                    alt={category.name}
                    className="gfl-w-full gfl-h-full gfl-object-cover gfl-transition-transform gfl-duration-300 group-hover:gfl-scale-110"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://via.placeholder.com/400x300?text=No+Image';
                    }}
                  />
                ) : (
                  <div className="gfl-flex gfl-items-center gfl-justify-center gfl-h-full gfl-text-gray-400">
                    <svg
                      className="gfl-w-16 gfl-h-16"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                )}
              </div>

              {/* Category Info */}
              <div className="gfl-p-4">
                <h3 className="gfl-text-lg gfl-font-semibold gfl-text-gray-900 gfl-mb-2 gfl-line-clamp-2">
                  {category.name}
                </h3>
                {category.description && (
                  <p className="gfl-text-sm gfl-text-gray-600 gfl-line-clamp-3 gfl-mb-3">
                    {category.description}
                  </p>
                )}
                {category.products && category.products.totalCount > 0 && (
                  <div className="gfl-text-xs gfl-text-gray-500 gfl-flex gfl-items-center">
                    <svg
                      className="gfl-w-4 gfl-h-4 gfl-mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                      />
                    </svg>
                    {category.products.totalCount} {category.products.totalCount === 1 ? 'product' : 'products'}
                  </div>
                )}
              </div>

              {/* Arrow indicator */}
              <div className="gfl-px-4 gfl-pb-4">
                <div className="gfl-flex gfl-items-center gfl-text-blue-600 gfl-text-sm gfl-font-medium group-hover:gfl-translate-x-2 gfl-transition-transform gfl-duration-300">
                  View Category
                  <svg
                    className="gfl-w-4 gfl-h-4 gfl-ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
