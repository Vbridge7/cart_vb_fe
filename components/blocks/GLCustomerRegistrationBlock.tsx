'use client';

import { Block } from 'models/block';
import { NavigationLink } from 'models/navigation';
import { TextOption } from 'models/option';
import DOMPurify from 'isomorphic-dompurify';
import React, { useMemo, useState } from 'react';


export type CustomerRegistrationFieldName =
  | 'firstName'
  | 'lastName'
  | 'email'
  | 'phone'
  | 'companyName'
  | 'companyRegistrationNumber'
  | 'terms';

export interface CustomerRegistrationFormFieldConfig {
  label: string;
  fieldType: 'text' | 'email' | 'tel' | 'checkbox';
  fieldName: CustomerRegistrationFieldName;
  required: boolean;
  placeholder?: string;
}

export interface GLCustomerRegistrationBlockProps extends Block {
  fields: {
    blockTitle: string;
    multiLangEditor: string;
    customerRegistrationFormFields: TextOption[];
    formReceiverEmail: string;
    termsPageUrl: NavigationLink;
    privacyPageUrl: NavigationLink;
    successMessage: string;
    isFullWidth: boolean;
    backgroundColor: TextOption;
    titleFontColor: TextOption;
    fontColor: TextOption;
  };
  onSubmit?: (formData: Record<string, any>) => Promise<void>;
}

const FIELD_CONFIGS: Record<
  CustomerRegistrationFieldName,
  CustomerRegistrationFormFieldConfig
> = {
  firstName: {
    label: 'First Name',
    fieldType: 'text',
    fieldName: 'firstName',
    required: true,
    placeholder: 'Enter your first name',
  },
  lastName: {
    label: 'Last Name',
    fieldType: 'text',
    fieldName: 'lastName',
    required: true,
    placeholder: 'Enter your last name',
  },
  email: {
    label: 'Email',
    fieldType: 'email',
    fieldName: 'email',
    required: true,
    placeholder: 'Enter your email',
  },
  phone: {
    label: 'Phone',
    fieldType: 'tel',
    fieldName: 'phone',
    required: true,
    placeholder: 'Enter your phone number',
  },
  companyName: {
    label: 'Company Name',
    fieldType: 'text',
    fieldName: 'companyName',
    required: false,
    placeholder: 'Enter your company name',
  },
  companyRegistrationNumber: {
    label: 'Company Registration Number',
    fieldType: 'text',
    fieldName: 'companyRegistrationNumber',
    required: false,
    placeholder: 'Enter your company registration number',
  },
  terms: {
    label: 'I accept the terms and conditions',
    fieldType: 'checkbox',
    fieldName: 'terms',
    required: true,
  },
};

export const GLCustomerRegistrationBlock: React.FC<GLCustomerRegistrationBlockProps> = ({
  fields,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<Record<string, any>>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    companyName: '',
    companyRegistrationNumber: '',
    terms: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const activeFields = useMemo(() => {
    if (!fields?.customerRegistrationFormFields?.length)
      return Object.values(FIELD_CONFIGS);
    return fields.customerRegistrationFormFields
      .map((opt) => opt.value as CustomerRegistrationFieldName)
      .filter((name) => name in FIELD_CONFIGS)
      .map((name) => FIELD_CONFIGS[name]);
  }, [fields?.customerRegistrationFormFields]);

  const handleInputChange = (field: string, value: any) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const missingFields = activeFields
        .filter((f) => f.required && !formData[f.fieldName])
        .map((f) => f.label);
      if (missingFields.length)
        throw new Error(
          `Please fill in required fields: ${missingFields.join(', ')}`
        );

      if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
        throw new Error('Please enter a valid email address');
      if (formData.phone && !/^[0-9+-]+$/.test(formData.phone))
        throw new Error('Please enter a valid phone number');
      if (activeFields.find((f) => f.fieldName === 'terms') && !formData.terms)
        throw new Error('Please accept the terms and conditions');

      if (onSubmit)
        await onSubmit({
          ...formData,
          receiverEmail: fields?.formReceiverEmail || '',
          timestamp: new Date().toISOString(),
        });
      else console.log('Form submitted:', formData);

      setSubmitStatus('success');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        companyName: '',
        companyRegistrationNumber: '',
        terms: false,
      });
    } catch (err) {
      setSubmitStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const shouldShowField = (name: CustomerRegistrationFieldName) =>
    activeFields.some((f) => f.fieldName === name);
  const getFieldConfig = (name: CustomerRegistrationFieldName) =>
    activeFields.find((f) => f.fieldName === name);

  const containerClasses = fields?.isFullWidth
    ? `w-full p-10 rounded-xl shadow-md flex flex-col gap-6 ${fields.backgroundColor?.value || 'bg-white'}`
    : `max-w-md w-full mx-auto p-10 rounded-xl shadow-md flex flex-col gap-6 ${fields.backgroundColor?.value || 'bg-white'}`;

  const baseInputClasses =
    'w-full h-11 px-4 rounded-md border border-gray-300 bg-white text-gray-800 placeholder-gray-400 focus:border-gray-500 focus:outline-none';

  return (
    <div className={containerClasses}>
      {fields.blockTitle && (
        <h2
          className="text-2xl font-semibold"
          style={{ color: fields.titleFontColor?.value, fontFamily: 'Onest' }}
        >
          {fields.blockTitle}
        </h2>
      )}

      {fields.multiLangEditor && (
        <div
          className="leading-relaxed text-gray-700"
          style={{ color: fields.fontColor?.value }}
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(fields.multiLangEditor),
          }}
        />
      )}

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {/* First & Last Name */}
        {(shouldShowField('firstName') || shouldShowField('lastName')) && (
          <div className="flex flex-col gap-4 sm:flex-row">
            {shouldShowField('firstName') && (
              <input
                type="text"
                placeholder={`${getFieldConfig('firstName')?.label}${getFieldConfig('firstName')?.required ? '*' : ''}`}
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                required={getFieldConfig('firstName')?.required}
                className={baseInputClasses}
                style={{ fontFamily: 'Onest' }}
              />
            )}
            {shouldShowField('lastName') && (
              <input
                type="text"
                placeholder={`${getFieldConfig('lastName')?.label}${getFieldConfig('lastName')?.required ? '*' : ''}`}
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                required={getFieldConfig('lastName')?.required}
                className={baseInputClasses}
                style={{ fontFamily: 'Onest' }}
              />
            )}
          </div>
        )}

        {/* Other Fields */}
        {shouldShowField('email') && (
          <input
            type="email"
            placeholder={`${getFieldConfig('email')?.label}${getFieldConfig('email')?.required ? '*' : ''}`}
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            required={getFieldConfig('email')?.required}
            className={baseInputClasses}
            style={{ fontFamily: 'Onest' }}
          />
        )}
        {shouldShowField('phone') && (
          <input
            type="tel"
            placeholder={`${getFieldConfig('phone')?.label}${getFieldConfig('phone')?.required ? '*' : ''}`}
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            required={getFieldConfig('phone')?.required}
            className={baseInputClasses}
            style={{ fontFamily: 'Onest' }}
          />
        )}
        {shouldShowField('companyName') && (
          <input
            type="text"
            placeholder={`${getFieldConfig('companyName')?.label}${getFieldConfig('companyName')?.required ? '*' : ''}`}
            value={formData.companyName}
            onChange={(e) => handleInputChange('companyName', e.target.value)}
            required={getFieldConfig('companyName')?.required}
            className={baseInputClasses}
            style={{ fontFamily: 'Onest' }}
          />
        )}
        {shouldShowField('companyRegistrationNumber') && (
          <input
            type="text"
            placeholder={`${getFieldConfig('companyRegistrationNumber')?.label}${getFieldConfig('companyRegistrationNumber')?.required ? '*' : ''}`}
            value={formData.companyRegistrationNumber}
            onChange={(e) =>
              handleInputChange('companyRegistrationNumber', e.target.value)
            }
            required={getFieldConfig('companyRegistrationNumber')?.required}
            className={baseInputClasses}
            style={{ fontFamily: 'Onest' }}
          />
        )}

        {/* Terms Checkbox */}
        {shouldShowField('terms') && (
          <label
            htmlFor="terms"
            className="flex items-start gap-3 text-sm text-gray-600"
            style={{ fontFamily: 'Onest' }}
          >
            <input
              type="checkbox"
              id="terms"
              checked={formData.terms}
              onChange={(e) => handleInputChange('terms', e.target.checked)}
              required={getFieldConfig('terms')?.required}
              className="h-4 w-4 rounded border border-gray-500 checked:border-black checked:bg-black"
            />
            <span>
              By clicking, you agree to our{' '}
              <a
                className="text-gray-700 underline"
                href={fields.termsPageUrl?.url || '#'}
                target="_blank"
                rel="noopener noreferrer"
              >
                Terms
              </a>{' '}
              and{' '}
              <a
                className="text-gray-700 underline"
                href={fields.privacyPageUrl?.url || '#'}
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy Policy
              </a>
              .
            </span>
          </label>
        )}

        {/* Success / Error Messages */}
        {submitStatus === 'success' && (
          <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-green-800">
            {fields.successMessage ||
              'Your registration has been submitted successfully!'}
          </div>
        )}
        {submitStatus === 'error' && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
            {errorMessage}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="h-11 w-full rounded-md bg-gray-400 font-medium text-white transition hover:bg-gray-600 disabled:opacity-50"
          style={{ fontFamily: 'Onest' }}
        >
          {isSubmitting ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>
    </div>
  );
};
