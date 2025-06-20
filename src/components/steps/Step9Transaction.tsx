import React, { useState } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store';
import {
  setTransactionNature,
  setTransactionOrigin,
  setTransactionCategory,
  setTransactionMonthlyVolume,
  addBusinessPurpose,
  removeBusinessPurpose,
  setIsOtherCategory,
} from '../../store/slices/formSlice';

const ASSET_NATURES = [
  'Cash deposits',
  'Bank transfers',
  'Investment proceeds',
  'Business revenue',
  'Inheritance',
  'Gift',
  'Sale of assets',
  'Insurance proceeds',
  'Legal settlements',
  'Other'
];

const ASSET_ORIGINS = [
  'Business operations',
  'Employment income',
  'Investment returns',
  'Inheritance',
  'Gift from family',
  'Sale of property',
  'Insurance payout',
  'Legal settlement',
  'Other'
];

const BUSINESS_PURPOSES = [
  { value: 'payment_processing', label: 'Payment Processing' },
  { value: 'merchant_services', label: 'Merchant Services' },
  { value: 'ecommerce', label: 'E-commerce Solutions' },
  { value: 'subscription_billing', label: 'Subscription Billing' },
  { value: 'international_payments', label: 'International Payments' },
  { value: 'crypto_services', label: 'Cryptocurrency Services' },
  { value: 'financial_services', label: 'Financial Services' },
  { value: 'consulting', label: 'Consulting Services' },
  { value: 'other', label: 'Other' }
];

export const Step9Transaction: React.FC = () => {
  const { t } = useTranslation();
  const { transactionInfo } = useSelector((state: RootState) => state.form);
  const dispatch = useDispatch();
  const [newPurpose, setNewPurpose] = useState('');

  const addPurpose = () => {
    if (newPurpose && !transactionInfo.businessPurposes.includes(newPurpose)) {
      dispatch(addBusinessPurpose(newPurpose));
      setNewPurpose('');
    }
  };

  const removePurpose = (purposeToRemove: string) => {
    dispatch(removeBusinessPurpose(purposeToRemove));
  };

  return (
    <section className="step" data-step="9">
      <h2 className="text-xl font-semibold mb-6" data-i18n="step9_title">9. Transaction Information</h2>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('asset_nature')} *
          </label>
          <select
            name="asset_nature"
            required
            className="w-full border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={transactionInfo.assetNature}
            onChange={(e) => dispatch(setTransactionNature(e.target.value))}
          >
            <option value="">Select nature of assets</option>
            {ASSET_NATURES.map(nature => (
              <option key={nature} value={nature}>
                {nature}
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-500 mt-1">
            Select the primary nature of assets involved in your business relationship.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('asset_origin')} *
          </label>
          <select
            name="asset_origin"
            required
            className="w-full border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={transactionInfo.assetOrigin}
            onChange={(e) => dispatch(setTransactionOrigin(e.target.value))}
          >
            <option value="">Select origin of assets</option>
            {ASSET_ORIGINS.map(origin => (
              <option key={origin} value={origin}>
                {origin}
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-500 mt-1">
            Indicate the primary source of assets involved in your business activities.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('asset_category')} *
          </label>
          <div className="space-y-3">
            <label className="flex items-center">
              <input
                type="radio"
                name="asset_category"
                value="business"
                checked={transactionInfo.assetCategory === 'business'}
                onChange={(e) => dispatch(setTransactionCategory(e.target.value))}
                className="mr-2"
              />
              <span className="text-sm">{t('cat_business')}</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="asset_category"
                value="personal"
                checked={transactionInfo.assetCategory === 'personal'}
                onChange={(e) => dispatch(setTransactionCategory(e.target.value))}
                className="mr-2"
              />
              <span className="text-sm">Personal transactions</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="asset_category"
                value="investment"
                checked={transactionInfo.assetCategory === 'investment'}
                onChange={(e) => dispatch(setTransactionCategory(e.target.value))}
                className="mr-2"
              />
              <span className="text-sm">Investment activities</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="asset_category"
                value="other"
                checked={transactionInfo.isOtherCategory}
                onChange={() => dispatch(setIsOtherCategory(!transactionInfo.isOtherCategory))}
                className="mr-2"
              />
              <span className="text-sm">{t('cat_other')}</span>
            </label>
            
            {transactionInfo.isOtherCategory && (
              <input
                type="text"
                name="asset_category_other"
                value={transactionInfo.assetCategory === 'other' ? '' : transactionInfo.assetCategory}
                className="w-full border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Describe other category"
                onChange={(e) => dispatch(setTransactionCategory(e.target.value))}
              />
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('monthly_volume')} *
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              name="monthly_volume"
              required
              min="0"
              step="1000"
              className="flex-1 border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="0"
              value={transactionInfo.monthlyVolume || ''}
              onChange={(e) => dispatch(setTransactionMonthlyVolume(Number(e.target.value)))}
            />
            <span className="flex items-center px-3 text-gray-500">CHF</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Expected monthly transaction volume in Swiss Francs.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('business_purpose')} *
          </label>
          
          {/* Selected Purposes Display */}
          {transactionInfo.businessPurposes.length > 0 && (
            <div className="mb-3">
              <div className="flex flex-wrap gap-2">
                {transactionInfo.businessPurposes.map((purpose, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                  >
                    {BUSINESS_PURPOSES.find(p => p.value === purpose)?.label || purpose}
                    <button
                      type="button"
                      onClick={() => removePurpose(purpose)}
                      className="ml-2 text-blue-600 hover:text-blue-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Add Purpose Input */}
          <div className="flex gap-2">
            <select
              value={newPurpose}
              onChange={(e) => setNewPurpose(e.target.value)}
              className="flex-1 border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select business purpose</option>
              {BUSINESS_PURPOSES.map(purpose => (
                <option key={purpose.value} value={purpose.value}>
                  {purpose.label}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={addPurpose}
              disabled={!newPurpose || transactionInfo.businessPurposes.includes(newPurpose)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Add
            </button>
          </div>
          
          <p className="text-xs text-gray-500 mt-1">
            Select all purposes that apply to your business relationship with Centi.
          </p>
        </div>

        {/* Transaction Summary */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium text-gray-800 mb-2">Transaction Details Summary</h3>
          <div className="text-sm text-gray-600 space-y-1">
            <p><strong>Nature of Assets:</strong> {transactionInfo.assetNature || 'Not specified'}</p>
            <p><strong>Origin of Assets:</strong> {transactionInfo.assetOrigin || 'Not specified'}</p>
            <p><strong>Asset Category:</strong> {transactionInfo.assetCategory || 'Not specified'}</p>
            <p><strong>Expected Volume:</strong> {transactionInfo.monthlyVolume ? `${transactionInfo.monthlyVolume} CHF` : 'Not specified'}</p>
            <p><strong>Business Purposes:</strong> {transactionInfo.businessPurposes.length > 0 ? transactionInfo.businessPurposes.map(p => BUSINESS_PURPOSES.find(bp => bp.value === p)?.label || p).join(', ') : 'Not specified'}</p>
          </div>
        </div>

        {/* Risk Assessment */}
        {transactionInfo.monthlyVolume && (
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h4 className="font-medium text-yellow-800 mb-2">Transaction Risk Assessment</h4>
            <div className="text-sm text-yellow-700">
              {(() => {
                const volume = transactionInfo.monthlyVolume;
                if (volume < 10000) {
                  return 'Low volume - standard monitoring applies.';
                } else if (volume < 100000) {
                  return 'Medium volume - enhanced monitoring may be required.';
                } else if (volume < 1000000) {
                  return 'High volume - enhanced due diligence required.';
                } else {
                  return 'Very high volume - comprehensive due diligence and monitoring required.';
                }
              })()}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};