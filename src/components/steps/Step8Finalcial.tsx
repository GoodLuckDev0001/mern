import React from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import type { RootState } from '../../store';
import { useSelector, useDispatch } from 'react-redux';
import { setFinancialInfoField } from '../../store/slices/formSlice';

const REVENUE_RANGES = [
  { value: '<50k', label: '< 50,000 CHF' },
  { value: '50k-250k', label: '50,000 – 250,000 CHF' },
  { value: '250k-1m', label: '250,000 – 1,000,000 CHF' },
  { value: '1m-5m', label: '1,000,000 – 5,000,000 CHF' },
  { value: '5m-25m', label: '5,000,000 – 25,000,000 CHF' },
  { value: '25m-100m', label: '25,000,000 – 100,000,000 CHF' },
  { value: '>100m', label: '> 100,000,000 CHF' }
];

const ASSET_RANGES = [
  { value: '<100k', label: '< 100,000 CHF' },
  { value: '100k-500k', label: '100,000 – 500,000 CHF' },
  { value: '500k-2m', label: '500,000 – 2,000,000 CHF' },
  { value: '2m-10m', label: '2,000,000 – 10,000,000 CHF' },
  { value: '10m-50m', label: '10,000,000 – 50,000,000 CHF' },
  { value: '50m-200m', label: '50,000,000 – 200,000,000 CHF' },
  { value: '>200m', label: '> 200,000,000 CHF' }
];

const LIABILITY_RANGES = [
  { value: 'none', label: 'No liabilities' },
  { value: '<50k', label: '< 50,000 CHF' },
  { value: '50k-250k', label: '50,000 – 250,000 CHF' },
  { value: '250k-1m', label: '250,000 – 1,000,000 CHF' },
  { value: '1m-5m', label: '1,000,000 – 5,000,000 CHF' },
  { value: '5m-25m', label: '5,000,000 – 25,000,000 CHF' },
  { value: '>25m', label: '> 25,000,000 CHF' }
];

export const Step8Finalcial: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { financialInfo } = useSelector((state: RootState) => state.form);

  return (
    <section className="step" data-step="8">
      <h2 className="text-xl font-semibold mb-6" data-i18n="step8_title">8. Financial Information</h2>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('annual_revenue')} *
          </label>
          <select
            name="annual_revenue"
            required
            className="w-full border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={financialInfo.annualRevenue}
            onChange={(e) => dispatch(setFinancialInfoField({ field: 'annualRevenue', value: e.target.value }))}
          >
            <option value="">Select annual revenue range</option>
            {REVENUE_RANGES.map(range => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-500 mt-1">
            Select the range that best represents your approximate annual revenue.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('total_assets')} *
          </label>
          <select
            name="total_assets"
            required
            className="w-full border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={financialInfo.totalAssets}
            onChange={(e) => dispatch(setFinancialInfoField({ field: 'totalAssets', value: e.target.value }))}
          >
            <option value="">Select total assets range</option>
            {ASSET_RANGES.map(range => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-500 mt-1">
            Include all assets: cash, investments, property, equipment, etc.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('liabilities')} (Optional)
          </label>
          <select
            name="liabilities"
            className="w-full border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={financialInfo.liabilities}
            onChange={(e) => dispatch(setFinancialInfoField({ field: 'liabilities', value: e.target.value }))}
          >
            <option value="">Select liabilities range (if applicable)</option>
            {LIABILITY_RANGES.map(range => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-500 mt-1">
            Include loans, mortgages, credit lines, and other outstanding debts.
          </p>
        </div>

        {/* Financial Summary */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium text-gray-800 mb-2">Financial Summary</h3>
          <div className="text-sm text-gray-600 space-y-1">
            <p>
              <strong>Annual Revenue:</strong> {
                REVENUE_RANGES.find(r => r.value === financialInfo.annualRevenue)?.label || 'Not specified'
              }
            </p>
            <p>
              <strong>Total Assets:</strong> {
                ASSET_RANGES.find(r => r.value === financialInfo.totalAssets)?.label || 'Not specified'
              }
            </p>
            <p>
              <strong>Liabilities:</strong> {
                LIABILITY_RANGES.find(r => r.value === financialInfo.liabilities)?.label || 'Not specified'
              }
            </p>
          </div>
        </div>

        {/* Financial Health Indicator */}
        {financialInfo.annualRevenue && financialInfo.totalAssets && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-2">Financial Health Indicator</h4>
            <div className="text-sm text-blue-700">
              {(() => {
                const revenue = financialInfo.annualRevenue;
                const assets = financialInfo.totalAssets;
                
                if (revenue === '<50k' && assets === '<100k') {
                  return 'Small business profile - suitable for basic financial services.';
                } else if (revenue === '>100m' || assets === '>200m') {
                  return 'Large enterprise profile - may require enhanced due diligence.';
                } else if (revenue.includes('m') || assets.includes('m')) {
                  return 'Medium to large business profile - standard due diligence applies.';
                } else {
                  return 'Standard business profile - normal onboarding process applies.';
                }
              })()}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};