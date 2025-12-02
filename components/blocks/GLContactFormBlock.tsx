/* ---------------- SAME LOOK & FEEL AS REQUEST QUOTE FORM ---------------- */

'use client';

import { Block } from 'models/block';
import { TextOption } from 'models/option';
import DOMPurify from 'isomorphic-dompurify';
import React, { useMemo, useState } from 'react';


export interface ContactFormField {
  name: string;
  value: string;
}

export interface GLContactFormBlockProps extends Block {
  fields: {
    title: string;
    multiLangEditor: string;
    formFields: ContactFormField[];
    formReceiverEmail: string;
    isFullWidth: boolean;
    backgroundColor: TextOption;
    titleFontColor: TextOption;
    fontColor: string;
  };
  onSubmit?: (formData: Record<string, any>) => Promise<void>;
}

type PossibleFormFields =
  | 'firstName'
  | 'lastName'
  | 'email'
  | 'phone'
  | 'organization'
  | 'message';

export const GLContactFormBlock: React.FC<GLContactFormBlockProps> = ({
  fields,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  /* ---------------- Sanitize WYSIWYG ---------------- */
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
        'div',
        'span',
        'h1',
        'h2',
        'h3',
      ],
      ALLOWED_ATTR: ['href', 'target', 'rel', 'class', 'style'],
    });
  }, [fields.multiLangEditor]);

  /* ---------------- Dynamic Styling ---------------- */

  const containerClasses = fields.isFullWidth
    ? 'w-full p-6 space-y-6'
    : 'w-full max-w-4xl mx-auto p-6 space-y-6';

  const cardClasses =
    'w-full max-w-4xl bg-white shadow-xl rounded-2xl overflow-hidden';

  const headerClasses = 'p-6 sm:p-10 border-b border-gray-100 text-center';

  /* clean light-gray info box */
  const infoBoxClasses =
    'text-gray-600 leading-relaxed text-md bg-gray-100 p-3 rounded-lg border border-gray-200 [&_*]:!text-gray-600';

  const labelClasses = 'block text-sm font-medium text-gray-700 mb-1';

  const sectionTitleClasses =
    'text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-4';

  /* Inputs styling (same as Request Quote) */
  const baseInputClasses =
    'w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm ' +
    'focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-600 ' +
    'transition duration-150 ease-in-out';

  /* GRAY button (identical to Request Quote) */
  const buttonClasses =
    'w-full flex items-center justify-center px-6 py-3 bg-gray-700 text-white font-semibold rounded-lg ' +
    'shadow-md hover:bg-gray-800 transition duration-300 ease-in-out ' +
    'transform hover:scale-[1.005] focus:outline-none focus:ring-4 focus:ring-gray-300 ' +
    'disabled:opacity-50 disabled:cursor-not-allowed';

  /* ---------------- Helpers ---------------- */

  const isFieldRequired = (fieldName: PossibleFormFields) => {
    if (!fields.formFields?.length) return true;
    return fields.formFields.some((f) => f.value === fieldName);
  };

  const handleInputChange = (name: string, value: string) =>
    setFormData((prev) => ({ ...prev, [name]: value }));

  /* ---------------- Submit ---------------- */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const required = [
        'firstName',
        'lastName',
        'email',
        'phone',
        'organization',
        'message',
      ].filter((f) => isFieldRequired(f as PossibleFormFields));

      const missing = required.filter(
        (name) => !formData[name] || formData[name].trim() === ''
      );
      if (missing.length > 0)
        throw new Error('Please fill in all required fields');

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (formData.email && !emailRegex.test(formData.email))
        throw new Error('Please enter a valid email address');

      const phoneRegex = /^[+\d]?(?:[\d-. ]{7,15})$/;
      if (formData.phone && !phoneRegex.test(formData.phone))
        throw new Error('Please enter a valid phone number');

      if (onSubmit) {
        await onSubmit({
          ...formData,
          receiverEmail: fields.formReceiverEmail,
          timestamp: new Date().toISOString(),
        });
      }

      setSubmitStatus('success');
      setFormData({});
    } catch (err: any) {
      setSubmitStatus('error');
      setErrorMessage(err.message || 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ---------------- RENDER ---------------- */

  return (
    <div className={containerClasses}>
      <div className={cardClasses}>
        <div className={headerClasses}>
          {fields.title && (
            <h1
              className="mb-2 text-3xl font-extrabold text-gray-900"
              style={
                fields.titleFontColor?.value
                  ? { color: fields.titleFontColor.value }
                  : {}
              }
            >
              {fields.title}
            </h1>
          )}

          {sanitizedContent && (
            <div
              className={infoBoxClasses}
              dangerouslySetInnerHTML={{ __html: sanitizedContent }}
            />
          )}
        </div>

        {/* BODY */}
        <div className="p-6 sm:p-10">
          {/* SUCCESS MESSAGE */}
          {submitStatus === 'success' && (
            <div className="mb-6 rounded-lg border-l-4 border-green-400 bg-green-50 p-4 shadow-md">
              <p className="font-medium text-green-800">
                Thank you for contacting us! We'll get back to you soon.
              </p>
            </div>
          )}

          {/* ERROR MESSAGE */}
          {submitStatus === 'error' && (
            <div className="mb-6 rounded-lg border-l-4 border-red-400 bg-red-50 p-4 shadow-md">
              <p className="font-medium text-red-800">{errorMessage}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* ---- CONTACT DETAILS SECTION ---- */}
            <h3 className={sectionTitleClasses}>Contact Details</h3>

            {/* First + Last name */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {isFieldRequired('firstName') && (
                <div>
                  <label className={labelClasses}>
                    First Name<span className="text-red-500">*</span>
                  </label>
                  <input
                    className={baseInputClasses}
                    type="text"
                    value={formData.firstName || ''}
                    placeholder="John"
                    onChange={(e) =>
                      handleInputChange('firstName', e.target.value)
                    }
                    required
                  />
                </div>
              )}

              {isFieldRequired('lastName') && (
                <div>
                  <label className={labelClasses}>
                    Last Name<span className="text-red-500">*</span>
                  </label>
                  <input
                    className={baseInputClasses}
                    type="text"
                    value={formData.lastName || ''}
                    placeholder="Doe"
                    onChange={(e) =>
                      handleInputChange('lastName', e.target.value)
                    }
                    required
                  />
                </div>
              )}
            </div>

            {/* Email + Phone */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {isFieldRequired('email') && (
                <div>
                  <label className={labelClasses}>
                    Email<span className="text-red-500">*</span>
                  </label>
                  <input
                    className={baseInputClasses}
                    type="email"
                    value={formData.email || ''}
                    placeholder="john@example.com"
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                  />
                </div>
              )}

              {isFieldRequired('phone') && (
                <div>
                  <label className={labelClasses}>
                    Phone<span className="text-red-500">*</span>
                  </label>
                  <input
                    className={baseInputClasses}
                    type="tel"
                    value={formData.phone || ''}
                    placeholder="+1 (555) 123-4567"
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    required
                  />
                </div>
              )}
            </div>

            {/* Organization */}
            {isFieldRequired('organization') && (
              <div>
                <label className={labelClasses}>
                  Organization<span className="text-red-500">*</span>
                </label>
                <input
                  className={baseInputClasses}
                  type="text"
                  value={formData.organization || ''}
                  placeholder="Your Company Name"
                  onChange={(e) =>
                    handleInputChange('organization', e.target.value)
                  }
                  required
                />
              </div>
            )}

            {/* MESSAGE */}
            {isFieldRequired('message') && (
              <>
                <h3 className={`${sectionTitleClasses} pt-4`}>Message</h3>

                <div>
                  <textarea
                    className={`${baseInputClasses} resize-y`}
                    rows={6}
                    value={formData.message || ''}
                    placeholder="How can we help you?"
                    onChange={(e) =>
                      handleInputChange('message', e.target.value)
                    }
                    required
                  />
                </div>
              </>
            )}

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={buttonClasses}
            >
              {isSubmitting ? 'Submitting…' : 'Submit'}
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
