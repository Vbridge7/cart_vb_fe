'use client';

import { Block } from 'models/block';
import { TextOption } from 'models/option';
import DOMPurify from 'isomorphic-dompurify';
import React, { useMemo, useState } from 'react';


/* ---------- Field Setup (unchanged) ---------- */

export type FormFieldName =
  | 'firstName'
  | 'lastName'
  | 'email'
  | 'phone'
  | 'message'
  | 'organization';

export interface FormFieldConfig {
  label: string;
  fieldType: 'text' | 'email' | 'tel' | 'textarea';
  fieldName: FormFieldName;
  required: boolean;
  placeholder?: string;
}

export interface GLRequestQuoteBlockProps extends Block {
  fields: {
    blockTitle: string;
    multiLangEditor: string;
    formFields: TextOption[];
    formReceiverEmail: TextOption;
    isFullWidth: boolean;
    backgroundColor: TextOption;
    titleFontColor: TextOption;
    fontColor: string;
  };
  onSubmit?: (formData: Record<string, any>) => Promise<void>;
}

const FIELD_CONFIGS: Record<FormFieldName, FormFieldConfig> = {
  firstName: {
    label: 'First Name',
    fieldType: 'text',
    required: true,
    fieldName: 'firstName',
    placeholder: 'Enter your first name',
  },
  lastName: {
    label: 'Last Name',
    fieldType: 'text',
    required: true,
    fieldName: 'lastName',
    placeholder: 'Enter your last name',
  },
  email: {
    label: 'Email',
    fieldType: 'email',
    required: true,
    fieldName: 'email',
    placeholder: 'you@example.com',
  },
  phone: {
    label: 'Phone',
    fieldType: 'tel',
    required: true,
    fieldName: 'phone',
    placeholder: '(555) 555-5555',
  },
  message: {
    label: 'Message / Project Details',
    fieldType: 'textarea',
    required: false,
    fieldName: 'message',
    placeholder:
      'Provide details about your project or query (scope, requirements, timeline)',
  },
  organization: {
    label: 'Organization',
    fieldType: 'text',
    required: false,
    fieldName: 'organization',
    placeholder: 'Your Company Name',
  },
};

export const GLRequestQuoteBlock: React.FC<GLRequestQuoteBlockProps> = ({
  fields,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  /* ---------- Map Litium selected fields ---------- */

  const activeFields = useMemo(() => {
    if (!fields?.formFields?.length) return Object.values(FIELD_CONFIGS);

    return fields.formFields
      .filter((f) => f?.value)
      .map((f) => f.value as FormFieldName)
      .filter((key) => key in FIELD_CONFIGS)
      .map((key) => FIELD_CONFIGS[key]);
  }, [fields?.formFields]);

  /* ---------- Sanitize HTML ---------- */

  const sanitizedContent = useMemo(() => {
    if (!fields?.multiLangEditor) return '';
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
        'div',
        'span',
      ],
      ALLOWED_ATTR: ['href', 'target', 'rel', 'class', 'style'],
    });
  }, [fields?.multiLangEditor]);

  /* ---------- Dynamic Style ---------- */

  const containerStyle: React.CSSProperties = {
    ...(fields?.backgroundColor?.value && {
      backgroundColor: fields.backgroundColor.value,
    }),
  };

  const titleStyle = fields?.titleFontColor?.value
    ? { color: fields.titleFontColor.value }
    : {};

  const contentStyle = fields?.fontColor ? { color: fields.fontColor } : {};

  /* ---------- Normal Tailwind Classes ---------- */

  const containerClasses = fields?.isFullWidth
    ? 'w-full p-6 space-y-6'
    : 'w-full max-w-4xl mx-auto p-6 space-y-6';

  const cardClasses =
    'w-full max-w-4xl bg-white shadow-xl rounded-2xl overflow-hidden';

  const headerClasses = 'p-6 sm:p-10 border-b border-gray-100 text-center';

  const blueInfoBoxClasses =
    'text-gray-600 leading-relaxed text-md bg-gray-50 p-3 rounded-lg border border-gray-100';

  const sectionTitleClasses =
    'text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-4';

  const labelClasses = 'block text-sm font-medium text-gray-700 mb-1';

  const baseInputClasses =
    'w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm ' +
    'focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-600 ' +
    'transition duration-150 ease-in-out';

  const buttonClasses =
    'w-full flex items-center justify-center px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg ' +
    'shadow-md hover:bg-blue-700 transition duration-300 ease-in-out ' +
    'transform hover:scale-[1.005] focus:outline-none focus:ring-4 focus:ring-blue-300 ' +
    'disabled:opacity-50 disabled:cursor-not-allowed';

  /* ---------- Helpers ---------- */

  const shouldShowField = (fieldName: FormFieldName) =>
    activeFields.some((f) => f.fieldName === fieldName);

  const hasNameFields =
    shouldShowField('firstName') || shouldShowField('lastName');

  const hasContactFields = shouldShowField('email') || shouldShowField('phone');

  /* ---------- Input Change ---------- */

  const handleInputChange = (field: string, value: any) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  /* ---------- Submit ---------- */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const missing = activeFields
        .filter((f) => f.required && !formData[f.fieldName])
        .map((f) => f.label);

      if (missing.length)
        throw new Error(
          `Please fill in required fields: ${missing.join(', ')}`
        );

      if (formData.email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email))
          throw new Error('Please enter a valid email address');
      }

      if (formData.phone) {
        const phoneRegex = /^[\d\s+()-]*$/;
        if (!phoneRegex.test(formData.phone))
          throw new Error('Please enter a valid phone number');
      }

      if (onSubmit) {
        await onSubmit({
          ...formData,
          receiverEmail: fields?.formReceiverEmail?.value || '',
          timestamp: new Date().toISOString(),
        });
      }

      setSubmitStatus('success');
      setFormData({});
    } catch (err: any) {
      setSubmitStatus('error');
      setErrorMessage(err?.message || 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ---------- RENDER ---------- */

  return (
    <div className={containerClasses} style={containerStyle}>
      <div className={cardClasses}>
        {/* HEADER */}
        {(fields?.blockTitle || sanitizedContent) && (
          <div className={headerClasses}>
            {fields.blockTitle && (
              <h1
                className="mb-2 text-3xl font-extrabold text-gray-900"
                style={titleStyle}
              >
                {fields.blockTitle}
              </h1>
            )}

            {sanitizedContent && (
              <div
                className={blueInfoBoxClasses}
                style={contentStyle}
                dangerouslySetInnerHTML={{ __html: sanitizedContent }}
              />
            )}
          </div>
        )}

        {/* FORM BODY */}
        <div className="p-6 sm:p-10">
          {/* SUCCESS */}
          {submitStatus === 'success' && (
            <div
              className="mb-6 rounded-lg border-l-4 border-green-400 bg-green-50 p-4 shadow-md"
              role="alert"
            >
              <div className="flex items-center">
                <svg
                  className="mr-3 h-6 w-6 text-green-500"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="font-medium text-green-800">
                  Your request has been successfully submitted!
                </p>
              </div>
              <p className="mt-1 text-sm text-green-700">
                We appreciate your interest and will respond within one business
                day.
              </p>
            </div>
          )}

          {/* ERROR */}
          {submitStatus === 'error' && (
            <div
              className="mb-6 rounded-lg border-l-4 border-red-400 bg-red-50 p-4 shadow-md"
              role="alert"
            >
              <div className="flex items-center">
                <svg
                  className="mr-3 h-6 w-6 text-red-500"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="font-medium text-red-800">{errorMessage}</p>
              </div>
            </div>
          )}

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* CONTACT DETAILS */}
            {(hasNameFields ||
              hasContactFields ||
              shouldShowField('organization')) && (
              <>
                <h3 className={sectionTitleClasses}>Contact Details</h3>

                {/* Name Fields */}
                {hasNameFields && (
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {shouldShowField('firstName') && (
                      <div>
                        <label className={labelClasses}>
                          First Name<span className="text-red-500">*</span>
                        </label>
                        <input
                          className={baseInputClasses}
                          type="text"
                          placeholder="Enter your first name"
                          required
                          value={formData.firstName || ''}
                          onChange={(e) =>
                            handleInputChange('firstName', e.target.value)
                          }
                        />
                      </div>
                    )}

                    {shouldShowField('lastName') && (
                      <div>
                        <label className={labelClasses}>
                          Last Name<span className="text-red-500">*</span>
                        </label>
                        <input
                          className={baseInputClasses}
                          type="text"
                          placeholder="Enter your last name"
                          required
                          value={formData.lastName || ''}
                          onChange={(e) =>
                            handleInputChange('lastName', e.target.value)
                          }
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* Contact Fields */}
                {hasContactFields && (
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {shouldShowField('email') && (
                      <div>
                        <label className={labelClasses}>
                          Email<span className="text-red-500">*</span>
                        </label>
                        <input
                          className={baseInputClasses}
                          type="email"
                          placeholder="you@example.com"
                          required
                          value={formData.email || ''}
                          onChange={(e) =>
                            handleInputChange('email', e.target.value)
                          }
                        />
                      </div>
                    )}

                    {shouldShowField('phone') && (
                      <div>
                        <label className={labelClasses}>
                          Phone<span className="text-red-500">*</span>
                        </label>
                        <input
                          className={baseInputClasses}
                          type="tel"
                          placeholder="(555) 555-5555"
                          required
                          value={formData.phone || ''}
                          onChange={(e) =>
                            handleInputChange('phone', e.target.value)
                          }
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* Organization */}
                {shouldShowField('organization') && (
                  <div>
                    <label className={labelClasses}>
                      Organization
                      <span className="ml-1 text-gray-500">(Optional)</span>
                    </label>
                    <input
                      className={baseInputClasses}
                      type="text"
                      placeholder="Your Company Name"
                      value={formData.organization || ''}
                      onChange={(e) =>
                        handleInputChange('organization', e.target.value)
                      }
                    />
                  </div>
                )}
              </>
            )}

            {/* MESSAGE */}
            {shouldShowField('message') && (
              <>
                <h3 className={`${sectionTitleClasses} pt-4`}>Your Request</h3>

                <div>
                  <label className={labelClasses}>
                    Message / Project Details
                  </label>
                  <textarea
                    className={`${baseInputClasses} resize-y`}
                    rows={6}
                    placeholder="Provide details about your project or query…"
                    value={formData.message || ''}
                    onChange={(e) =>
                      handleInputChange('message', e.target.value)
                    }
                  />
                </div>
              </>
            )}

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={buttonClasses}
            >
              {isSubmitting ? 'Submitting…' : 'Submit Quote Request'}
            </button>

            <p className="mt-4 text-center text-xs text-gray-500">
              Required fields are marked with an asterisk (*)
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
