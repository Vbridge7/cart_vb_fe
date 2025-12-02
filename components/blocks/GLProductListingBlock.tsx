'use client';

import React from 'react';

import { Block } from 'models/block';
import { TextOption } from 'models/option';
import { Product } from 'models/Product';
import { ProductCard } from '../products/ProductCard';

export interface GLProductListingBlockProps extends Block {
  fields: {
    blockTitle?: string;
    productsLinkList?: string[];
    showVariants: boolean;
    backgroundColor?: TextOption;
    fullWidthBlock: boolean;
  };
  products?: Product[];
  onProductClick?: (product: Product) => void;
}

export const GLProductListingBlock: React.FC<GLProductListingBlockProps> = ({
  fields,
  products = [],
  onProductClick
}) => {
  // Build container styles
  const containerStyle: React.CSSProperties = {
    ...(fields.backgroundColor?.value && { backgroundColor: fields.backgroundColor.value })
  };

  // Build container classes
  const containerClasses = fields.fullWidthBlock
    ? 'gfl-block gfl-w-full'
    : 'gfl-block gfl-w-full gfl-max-w-7xl gfl-mx-auto';

  return (
    <div className={containerClasses} style={containerStyle}>
      <div className="gfl-p-8">
        {/* Block Title */}
        {fields.blockTitle && (
          <h2 className="gfl-text-3xl gfl-font-bold gfl-mb-8 gfl-text-gray-900">
            {fields.blockTitle}
          </h2>
        )}

        {/* Product Grid */}
        {products.length > 0 ? (
          <div className="gfl-grid gfl-grid-cols-1 gfl-gap-6 gfl-sm:grid-cols-2 gfl-lg:grid-cols-3 gfl-xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onProductClick={onProductClick}
              />
            ))}
          </div>
        ) : (
          <div className="gfl-text-center gfl-py-12 gfl-text-gray-500">
            <p className="gfl-text-lg">No products available</p>
          </div>
        )}
      </div>
    </div>
  );
};
