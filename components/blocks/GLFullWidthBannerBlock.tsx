
'use client';

import React from 'react';

import { NavigationLink } from 'models/navigation';
import { PointerMediaImageItem } from 'models/pointers';

export interface GLFullWidthBannerBlockProps {
  blockTitle?: string;
  blockImagePointer?: PointerMediaImageItem;
  navigationLink?: NavigationLink;
  fontColor?: string; // Tailwind class or hex
  backgroundColor?: string; // Tailwind class or hex
  isFullWidth?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const GLFullWidthBannerBlock: React.FC<GLFullWidthBannerBlockProps> = ({
  blockTitle,
  blockImagePointer,
  navigationLink,
  fontColor = 'text-black',
  backgroundColor = 'bg-white',
  isFullWidth = true,
  className = '',
  children,
}) => {
  // Support both Tailwind class and direct color value for background/font
  const containerStyle: React.CSSProperties = {
    ...(backgroundColor && !backgroundColor.startsWith('bg-') ? { backgroundColor } : {}),
    ...(fontColor && !fontColor.startsWith('text-') ? { color: fontColor } : {}),
  };

  const containerClasses = [
    'relative',
    isFullWidth ? 'w-full' : 'max-w-5xl mx-auto',
    'p-8',
    'rounded-lg',
    'shadow-md',
    'overflow-hidden',
    backgroundColor && backgroundColor.startsWith('bg-') ? backgroundColor : '',
    fontColor && fontColor.startsWith('text-') ? fontColor : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section className={containerClasses} style={containerStyle} aria-label="Full Width Banner">
      {blockImagePointer?.item?.url && (
        <img
          src={blockImagePointer.item.url}
          alt={blockTitle || 'Banner image'}
          className="w-full h-64 object-cover rounded mb-4"
          loading="lazy"
        />
      )}
      {blockTitle && <h2 className="text-3xl font-bold mb-2">{blockTitle}</h2>}
      {children}
      {navigationLink?.name && navigationLink?.url && (
        <a
          href={navigationLink.url}
          target={navigationLink.target || '_self'}
          className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          {navigationLink.name}
        </a>
      )}
    </section>
  );
};
