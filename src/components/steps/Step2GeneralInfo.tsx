import React from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store';
import { setCompanyInfoField, setValidationError } from '../../store/slices/formSlice';
import { validateFormField } from '../../utils/validation';

export const Step2GeneralInformation: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { companyInfo, validationErrors } = useSelector((state: RootState) => state.form);

  const handleBlur = (field: keyof typeof companyInfo) => {
    const error = validateFormField(field, companyInfo[field]);
    dispatch(setValidationError({ field, error }));
  };

  const getErrorClass = (fieldName: string) => {
    return validationErrors[fieldName] ? 'border-red-500' : 'border-gray-300';
  };

  return (
    <section className="step" data-step="2">
      <h2 className="text-xl font-semibold mb-6">2. General Information</h2>

      <div className="space-y-4">
        <div>
          <label htmlFor="company_name" className="block text-sm font-medium text-gray-700">
            {t('company_name')} *
          </label>
          <input
            type="text"
            id="company_name"
            name="company_name"
            required
            className={`w-full mt-1 border px-3 py-2 rounded focus:ring-blue-500 focus:border-blue-500 ${getErrorClass('name')}`}
            value={companyInfo.name}
            onChange={(e) => dispatch(setCompanyInfoField({ field: 'name', value: e.target.value }))}
            onBlur={() => handleBlur('name')}
          />
          {validationErrors.name && (
            <p className="text-red-500 text-sm mt-1">{validationErrors.name}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="street" className="block text-sm font-medium text-gray-700">
              {t('address_street')} *
            </label>
            <input
              type="text"
              id="street"
              name="street"
              required
              className={`w-full mt-1 border px-3 py-2 rounded focus:ring-blue-500 focus:border-blue-500 ${getErrorClass('address')}`}
              value={companyInfo.address}
              onChange={(e) => dispatch(setCompanyInfoField({ field: 'address', value: e.target.value }))}
              onBlur={() => handleBlur('address')}
            />
            {validationErrors.address && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.address}</p>
            )}
          </div>
          <div>
            <label htmlFor="postal_code" className="block text-sm font-medium text-gray-700">
              {t('postal_code')} *
            </label>
            <input
              type="text"
              id="postal_code"
              name="postal_code"
              required
              className={`w-full mt-1 border px-3 py-2 rounded focus:ring-blue-500 focus:border-blue-500 ${getErrorClass('postal')}`}
              value={companyInfo.postal}
              onChange={(e) => dispatch(setCompanyInfoField({ field: 'postal', value: e.target.value }))}
              onBlur={() => handleBlur('postal')}
            />
            {validationErrors.postal && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.postal}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700">
              {t('city')} *
            </label>
            <input
              type="text"
              id="city"
              name="city"
              required
              className={`w-full mt-1 border px-3 py-2 rounded focus:ring-blue-500 focus:border-blue-500 ${getErrorClass('city')}`}
              value={companyInfo.city}
              onChange={(e) => dispatch(setCompanyInfoField({ field: 'city', value: e.target.value }))}
              onBlur={() => handleBlur('city')}
            />
            {validationErrors.city && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.city}</p>
            )}
          </div>
          <div>
            <label htmlFor="canton" className="block text-sm font-medium text-gray-700">
              {t('canton')} *
            </label>
            <input
              type="text"
              id="canton"
              name="canton"
              required
              className={`w-full mt-1 border px-3 py-2 rounded focus:ring-blue-500 focus:border-blue-500 ${getErrorClass('canton')}`}
              value={companyInfo.canton}
              onChange={(e) => dispatch(setCompanyInfoField({ field: 'canton', value: e.target.value }))}
              onBlur={() => handleBlur('canton')}
            />
            {validationErrors.canton && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.canton}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            {t('phone')}
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className={`w-full mt-1 border px-3 py-2 rounded focus:ring-blue-500 focus:border-blue-500 ${getErrorClass('phone')}`}
            value={companyInfo.phone}
            onChange={(e) => dispatch(setCompanyInfoField({ field: 'phone', value: e.target.value }))}
            onBlur={() => handleBlur('phone')}
          />
          {validationErrors.phone && (
            <p className="text-red-500 text-sm mt-1">{validationErrors.phone}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font--medium text-gray-700">
            {t('email')} *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className={`w-full mt-1 border px-3 py-2 rounded focus:ring-blue-500 focus:border-blue-500 ${getErrorClass('email')}`}
            value={companyInfo.email}
            onChange={(e) => dispatch(setCompanyInfoField({ field: 'email', value: e.target.value }))}
            onBlur={() => handleBlur('email')}
          />
          {validationErrors.email && (
            <p className="text-red-500 text-sm mt-1">{validationErrors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="industry" className="block text-sm font-medium text-gray-700">
            {t('industry')} *
          </label>
          <select
            name="industry"
            id="industry"
            required
            className={`w-full mt-1 border px-3 py-2 rounded focus:ring-blue-500 focus:border-blue-500 ${getErrorClass('industry')}`}
            value={companyInfo.industry}
            onChange={(e) => dispatch(setCompanyInfoField({ field: 'industry', value: e.target.value }))}
            onBlur={() => handleBlur('industry')}
          >
            <option value="">-- Select --</option>
            <option value="psp">{t('psp')}</option>
            <option value="acquirer">{t('acquirer')}</option>
            <option value="event">{t('event')}</option>
            <option value="media">{t('media')}</option>
            <option value="publisher">{t('publisher')}</option>
            <option value="other">{t('other')}</option>
          </select>
          {validationErrors.industry && (
            <p className="text-red-500 text-sm mt-1">{validationErrors.industry}</p>
          )}
        </div>

        {companyInfo.industry === 'other' && (
          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-700">
            {t('industry_warning')}
          </div>
        )}
      </div>
    </section>
  )
}