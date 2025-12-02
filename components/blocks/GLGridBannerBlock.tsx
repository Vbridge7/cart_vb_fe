import { Block } from 'models/block';
import React from 'react';
import { TextOption } from 'models/option';

/**
 * GLGridBanner - A reusable grid banner block component.
 *
 * Props:
 * - title: string
 * - gridBanner: React.ReactNode | string
 * - titleFontColor?: TextOption
 * - backgroundColor?: TextOption
 * - fullWidthBlock?: boolean
 */
export interface GLGridBannerProps extends Block {
  fields: {
    title?: string;
    gridBanner?: React.ReactNode | string;
    titleFontColor?: TextOption;
    backgroundColor?: TextOption;
    fullWidthBlock?: boolean;
  };
}

export const GLGridBanner: React.FC<GLGridBannerProps> = ({ fields }) => {
  const containerClasses = [
    'gl-grid-banner',
    fields.fullWidthBlock ? 'w-full' : 'max-w-7xl mx-auto',
    'py-8 px-4',
  ]
    .filter(Boolean)
    .join(' ');

  const containerStyle: React.CSSProperties = {
    ...(fields.backgroundColor?.value && { backgroundColor: fields.backgroundColor.value }),
  };

  const titleStyle: React.CSSProperties = {
    ...(fields.titleFontColor?.value && { color: fields.titleFontColor.value }),
  };

  return (
    <section className={containerClasses} style={containerStyle}>
      {fields.title && (
        <h2 className="mb-6 text-2xl font-bold" style={titleStyle}>
          {fields.title}
        </h2>
      )}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {typeof fields.gridBanner === 'string' ? (
          <span>{fields.gridBanner}</span>
        ) : (
          fields.gridBanner
        )}
      </div>
    </section>
  );
};

export default GLGridBanner;
