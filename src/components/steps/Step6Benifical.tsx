import React from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store';
import { setBeneficialInfoField, addBeneficialOwner, updateBeneficialOwner, deleteBeneficialOwner } from '../../store/slices/formSlice';

export const Step6Benifical: React.FC = () => {
  const { t } = useTranslation();
  const { beneficialInfo } = useSelector((state: RootState) => state.form);
  const dispatch = useDispatch();

  return (
    <section className="step" data-step="6">
      <h2 className="text-xl font-semibold mb-4" data-i18n="step6_title">6. Beneficial Ownership</h2>

      <div className="mb-6">
        <label className="block mb-2 font-medium text-gray-700" data-i18n="sole_owner_q">
          {t('sole_owner_q')}
        </label>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="is_sole_owner"
              value="yes"
              required
              checked={beneficialInfo.isSoleOwner}
              onChange={() => dispatch(setBeneficialInfoField({ field: 'isSoleOwner', value: true }))}
              className="mr-2"
            />
            <span className="text-sm">{t('yes')}</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="is_sole_owner"
              value="no"
              required
              checked={!beneficialInfo.isSoleOwner}
              onChange={() => dispatch(setBeneficialInfoField({ field: 'isSoleOwner', value: false }))}
              className="mr-2"
            />
            <span className="text-sm">{t('no')}</span>
          </label>
        </div>
      </div>

      {!beneficialInfo.isSoleOwner && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-800">Beneficial Owners</h3>
            <button
              type="button"
              onClick={() => dispatch(addBeneficialOwner())}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              disabled={beneficialInfo.beneficialOwners.length >= 10}
            >
              + {t('add_beneficial')}
            </button>
          </div>

          {beneficialInfo.beneficialOwners.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Please add at least one beneficial owner
            </div>
          )}

          {beneficialInfo.beneficialOwners.map((owner, index) => (
            <div key={owner.id} className="p-6 border border-gray-200 rounded-lg bg-white shadow-sm relative">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-medium text-gray-800">Beneficial Owner {index + 1}</h4>
                <button
                  type="button"
                  className="text-red-500 hover:text-red-700 text-lg font-bold"
                  aria-label="Remove beneficial owner"
                  onClick={() => dispatch(deleteBeneficialOwner(owner.id))}
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="First Name"
                    value={owner.firstName}
                    onChange={(e) => dispatch(updateBeneficialOwner({ 
                      index: owner.id, 
                      owner: { firstName: e.target.value } 
                    }))}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Last Name"
                    value={owner.lastName}
                    onChange={(e) => dispatch(updateBeneficialOwner({ 
                      index: owner.id, 
                      owner: { lastName: e.target.value } 
                    }))}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    className="w-full border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={owner.dob}
                    onChange={(e) => dispatch(updateBeneficialOwner({ 
                      index: owner.id, 
                      owner: { dob: e.target.value } 
                    }))}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nationality *
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Nationality"
                    value={owner.nationality}
                    onChange={(e) => dispatch(updateBeneficialOwner({ 
                      index: owner.id, 
                      owner: { nationality: e.target.value } 
                    }))}
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address *
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Full Address"
                    value={owner.address}
                    onChange={(e) => dispatch(updateBeneficialOwner({ 
                      index: owner.id, 
                      owner: { address: e.target.value } 
                    }))}
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Relationship to Client *
                  </label>
                  <select
                    className="w-full border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={owner.relationship}
                    onChange={(e) => dispatch(updateBeneficialOwner({ 
                      index: owner.id, 
                      owner: { relationship: e.target.value } 
                    }))}
                    required
                  >
                    <option value="">Select Relationship</option>
                    <option value="spouse">Spouse</option>
                    <option value="child">Child</option>
                    <option value="parent">Parent</option>
                    <option value="sibling">Sibling</option>
                    <option value="business_partner">Business Partner</option>
                    <option value="trust_beneficiary">Trust Beneficiary</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {beneficialInfo.isSoleOwner && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800">
            ✓ The client is the sole beneficial owner of the assets involved in the business relationship.
          </p>
        </div>
      )}
    </section>
  );
};
