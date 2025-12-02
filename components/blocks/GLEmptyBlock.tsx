'use client';

import React from 'react';

import { Block } from 'models/block';
import { TextOption } from 'models/option';

export type GLEmptyBlockSize = 'small' | 'medium' | 'large';

export interface GLEmptyBlockProps extends Block {
  fields: {
    emptyBlockSize?: TextOption;
    backgroundColor?: TextOption;
  };
}

const sizeMap: Record<GLEmptyBlockSize, string> = {
  small: 'gfl-h-4',
  medium: 'gfl-h-12',
  large: 'gfl-h-24',
};

export const GLEmptyBlock: React.FC<GLEmptyBlockProps> = ({ fields }) => {
  // Build container styles
  const containerStyle: React.CSSProperties = {
    ...(fields.backgroundColor?.value && { backgroundColor: fields.backgroundColor.value })
  };

  // Get size value with fallback to medium
  const sizeValue = (fields.emptyBlockSize?.value || 'medium') as GLEmptyBlockSize;

  return (
    <div
      className={`gfl-block gfl-w-full ${sizeMap[sizeValue]}`}
      style={containerStyle}
      aria-label="Empty Block"
    />
  );
};
