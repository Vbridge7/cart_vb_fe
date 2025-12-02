'use client';

import React, { useMemo } from 'react';
import DOMPurify from 'isomorphic-dompurify';

import { Block } from 'models/block';
import { TextOption } from 'models/option';
import { NavigationLink } from 'models/navigation';

export interface GLEditorBlockProps extends Block {
  fields: {
    blockTitle?: string;
    multiLangEditor?: string;
    navigationLink?: NavigationLink;
    isButton?: boolean;
    buttonSize?: TextOption;
    buttonColor?: TextOption;
    hollowButton?: boolean;
    titleFontColor?: TextOption;
    backgroundColor?: TextOption;
    fontColor?: TextOption;
    isFullWidth?: boolean;
    extraMargin?: boolean;
  };
}

export const GLEditorBlock: React.FC<GLEditorBlockProps> = ({ fields }) => {
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
        'pre',
        'img',
        'table',
        'thead',
        'tbody',
        'tr',
        'th',
        'td'
      ],
      ALLOWED_ATTR: ['href', 'target', 'rel', 'class', 'style', 'src', 'alt', 'width', 'height']
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

  // Build button classes based on styling options
  const getButtonClasses = (): string => {
    const baseClasses = 'gfl-inline-flex gfl-items-center gfl-font-medium gfl-rounded-lg gfl-transition-colors gfl-duration-200';

    // Size classes
    let sizeClasses = 'gfl-px-6 gfl-py-3'; // Default medium
    if (fields.buttonSize?.value === 'small') {
      sizeClasses = 'gfl-px-4 gfl-py-2 gfl-text-sm';
    } else if (fields.buttonSize?.value === 'large') {
      sizeClasses = 'gfl-px-8 gfl-py-4 gfl-text-lg';
    }

    // Color classes
    let colorClasses = 'gfl-bg-blue-600 gfl-text-white hover:gfl-bg-blue-700'; // Default primary
    if (fields.hollowButton) {
      if (fields.buttonColor?.value === 'secondary') {
        colorClasses = 'gfl-border-2 gfl-border-gray-600 gfl-text-gray-600 gfl-bg-transparent hover:gfl-bg-gray-600 hover:gfl-text-white';
      } else if (fields.buttonColor?.value === 'accent') {
        colorClasses = 'gfl-border-2 gfl-border-green-600 gfl-text-green-600 gfl-bg-transparent hover:gfl-bg-green-600 hover:gfl-text-white';
      } else {
        colorClasses = 'gfl-border-2 gfl-border-blue-600 gfl-text-blue-600 gfl-bg-transparent hover:gfl-bg-blue-600 hover:gfl-text-white';
      }
    } else {
      if (fields.buttonColor?.value === 'secondary') {
        colorClasses = 'gfl-bg-gray-600 gfl-text-white hover:gfl-bg-gray-700';
      } else if (fields.buttonColor?.value === 'accent') {
        colorClasses = 'gfl-bg-green-600 gfl-text-white hover:gfl-bg-green-700';
      }
    }

    return `${baseClasses} ${sizeClasses} ${colorClasses}`;
  };

  // Build container classes
  const containerClasses = [
    'gfl-block',
    'gfl-w-full',
    fields.isFullWidth ? '' : 'gfl-max-w-4xl gfl-mx-auto',
    'gfl-p-6',
    'gfl-space-y-4',
    fields.extraMargin ? 'gfl-my-8' : ''
  ].filter(Boolean).join(' ');

  // Build link classes for non-button style
  const linkClasses = 'gfl-inline-flex gfl-items-center gfl-text-blue-600 hover:gfl-text-blue-800 gfl-underline gfl-transition-colors gfl-duration-200';

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
          {fields.isButton ? (
            <a
              href={fields.navigationLink.url}
              target={fields.navigationLink.target || '_self'}
              rel={fields.navigationLink.target === '_blank' ? 'noopener noreferrer' : undefined}
              className={getButtonClasses()}
            >
              {fields.navigationLink.name}
            </a>
          ) : (
            <a
              href={fields.navigationLink.url}
              target={fields.navigationLink.target || '_self'}
              rel={fields.navigationLink.target === '_blank' ? 'noopener noreferrer' : undefined}
              className={linkClasses}
            >
              {fields.navigationLink.name}
            </a>
          )}
        </div>
      )}
    </div>
  );
};
