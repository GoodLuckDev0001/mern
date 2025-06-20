import React, { useState } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store';
import { setBusinessActivityField } from '../../store/slices/formSlice';

const COUNTRIES = [
  'Switzerland', 'Germany', 'France', 'Italy', 'Austria', 'Liechtenstein',
  'United States', 'Canada', 'United Kingdom', 'Netherlands', 'Belgium',
  'Luxembourg', 'Spain', 'Portugal', 'Sweden', 'Norway', 'Denmark', 'Finland',
  'Poland', 'Czech Republic', 'Hungary', 'Slovakia', 'Slovenia', 'Croatia',
  'Serbia', 'Bosnia and Herzegovina', 'Montenegro', 'Albania', 'North Macedonia',
  'Bulgaria', 'Romania', 'Greece', 'Cyprus', 'Malta', 'Estonia', 'Latvia',
  'Lithuania', 'Ireland', 'Iceland', 'Japan', 'South Korea', 'China', 'India',
  'Singapore', 'Hong Kong', 'Australia', 'New Zealand', 'Brazil', 'Argentina',
  'Chile', 'Mexico', 'South Africa', 'United Arab Emirates', 'Saudi Arabia',
  'Israel', 'Turkey', 'Russia', 'Ukraine', 'Belarus', 'Moldova', 'Georgia',
  'Armenia', 'Azerbaijan', 'Kazakhstan', 'Uzbekistan', 'Kyrgyzstan', 'Tajikistan',
  'Turkmenistan', 'Mongolia', 'Vietnam', 'Thailand', 'Malaysia', 'Indonesia',
  'Philippines', 'Pakistan', 'Bangladesh', 'Sri Lanka', 'Nepal', 'Bhutan',
  'Myanmar', 'Cambodia', 'Laos', 'Brunei', 'Timor-Leste', 'Papua New Guinea',
  'Fiji', 'Vanuatu', 'Solomon Islands', 'Samoa', 'Tonga', 'Kiribati',
  'Tuvalu', 'Nauru', 'Palau', 'Marshall Islands', 'Micronesia', 'Other'
];

export const Step7BusinessActivity: React.FC = () => {
  const { t } = useTranslation();
  const { businessActivity } = useSelector((state: RootState) => state.form);
  const dispatch = useDispatch();
  const [newCountry, setNewCountry] = useState('');

  const addCountry = () => {
    if (newCountry && !businessActivity.mainCountries.includes(newCountry)) {
      dispatch(setBusinessActivityField({ 
        field: 'mainCountries', 
        value: [...businessActivity.mainCountries, newCountry] 
      }));
      setNewCountry('');
    }
  };

  const removeCountry = (countryToRemove: string) => {
    dispatch(setBusinessActivityField({ 
      field: 'mainCountries', 
      value: businessActivity.mainCountries.filter(country => country !== countryToRemove) 
    }));
  };

  return (
    <section className="step" data-step="7">
      <h2 className="text-xl font-semibold mb-6" data-i18n="step7_title">7. Business Activity</h2>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('profession_activity')} *
          </label>
          <textarea
            name="business_activities"
            required
            rows={4}
            className="w-full border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Describe your profession and business activities (past, current, and planned)"
            value={businessActivity.professionActivity}
            onChange={(e) => dispatch(setBusinessActivityField({ field: 'professionActivity', value: e.target.value }))}
          />
          <p className="text-xs text-gray-500 mt-1">
            Include details about your professional background, current business activities, and future plans.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('business_description')} *
          </label>
          <textarea
            name="business_description"
            required
            rows={4}
            className="w-full border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Provide a detailed description of your core business"
            value={businessActivity.businessDescription}
            onChange={(e) => dispatch(setBusinessActivityField({ field: 'businessDescription', value: e.target.value }))}
          />
          <p className="text-xs text-gray-500 mt-1">
            Describe what your business does, its main products/services, and how it operates.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('target_clients')} *
          </label>
          <textarea
            name="business_clients"
            required
            rows={3}
            className="w-full border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Describe your main clients and target audience"
            value={businessActivity.targetClients}
            onChange={(e) => dispatch(setBusinessActivityField({ field: 'targetClients', value: e.target.value }))}
          />
          <p className="text-xs text-gray-500 mt-1">
            Include information about your customer base, market segments, and target demographics.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('main_countries')} *
          </label>
          
          {/* Selected Countries Display */}
          {businessActivity.mainCountries.length > 0 && (
            <div className="mb-3">
              <div className="flex flex-wrap gap-2">
                {businessActivity.mainCountries.map((country, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                  >
                    {country}
                    <button
                      type="button"
                      onClick={() => removeCountry(country)}
                      className="ml-2 text-blue-600 hover:text-blue-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Add Country Input */}
          <div className="flex gap-2">
            <select
              value={newCountry}
              onChange={(e) => setNewCountry(e.target.value)}
              className="flex-1 border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select a country</option>
              {COUNTRIES.map(country => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={addCountry}
              disabled={!newCountry || businessActivity.mainCountries.includes(newCountry)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Add
            </button>
          </div>
          
          <p className="text-xs text-gray-500 mt-1">
            Select all countries where your business operates or plans to operate.
          </p>
        </div>

        {/* Business Activity Summary */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium text-gray-800 mb-2">Business Activity Summary</h3>
          <div className="text-sm text-gray-600 space-y-1">
            <p><strong>Activities:</strong> {businessActivity.professionActivity || 'Not specified'}</p>
            <p><strong>Description:</strong> {businessActivity.businessDescription || 'Not specified'}</p>
            <p><strong>Target Clients:</strong> {businessActivity.targetClients || 'Not specified'}</p>
            <p><strong>Countries:</strong> {businessActivity.mainCountries.length > 0 ? businessActivity.mainCountries.join(', ') : 'Not specified'}</p>
          </div>
        </div>
      </div>
    </section>
  );
};