'use client';

import React, { useMemo } from 'react';
import DOMPurify from 'isomorphic-dompurify';

import { Block } from 'models/block';
import { TextOption } from 'models/option';
import { NavigationLink } from 'models/navigation';

export interface GLTextBlockProps extends Block {
  fields: {
    blockTitle?: string;
    multiLangEditor?: string;
    isFullWidth?: boolean;
    backgroundColor?: TextOption;
    titleFontColor?: TextOption;
    fontColor?: TextOption;
    navigationLink?: NavigationLink;
  };
}

export const GLTextBlock: React.FC<GLTextBlockProps> = ({ fields }) => {
  // Sanitize HTML content to prevent XSS attacks
  const sanitizedContent = useMemo(() => {
    if (!fields.multiLangEditor) return '';
    return DOMPurify.sanitize(fields.multiLangEditor, {
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
        'pre'
      ],
      ALLOWED_ATTR: ['href', 'target', 'rel', 'class', 'style']
    });
  }, [fields.multiLangEditor]);

  // Build container styles
  const containerStyle: React.CSSProperties = {
    ...(fields.backgroundColor?.value && { backgroundColor: fields.backgroundColor.value })
  };

  const titleStyle: React.CSSProperties = {
    ...(fields.titleFontColor?.value && { color: fields.titleFontColor.value })
  };

  const contentStyle: React.CSSProperties = {
    ...(fields.fontColor?.value && { color: fields.fontColor.value })
  };

  // Build container classes
  const containerClasses = fields.isFullWidth ?? false
    ? 'gfl-block gfl-w-full gfl-p-6 gfl-space-y-4'
    : 'gfl-block gfl-w-full gfl-max-w-4xl gfl-mx-auto gfl-p-6 gfl-space-y-4';

  return (
    <div className={containerClasses} style={containerStyle}>
      {fields.blockTitle && (
        <h2
          className="gfl-text-2xl gfl-font-semibold gfl-leading-tight"
          style={titleStyle}
        >
          {fields.blockTitle}
        </h2>
      )}
      {sanitizedContent && (
        <div
          className="gfl-prose gfl-leading-relaxed"
          style={contentStyle}
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />
      )}
      {fields.navigationLink?.url && fields.navigationLink?.name && (
        <div className="gfl-mt-6">
          <a
            href={fields.navigationLink.url}
            className="gfl-inline-flex gfl-items-center gfl-px-6 gfl-py-3 gfl-bg-blue-600 gfl-text-white gfl-font-medium gfl-rounded-lg hover:gfl-bg-blue-700 gfl-transition-colors gfl-duration-200"
          >
            {fields.navigationLink.name}
          </a>
        </div>
      )}
    </div>
  );
};
