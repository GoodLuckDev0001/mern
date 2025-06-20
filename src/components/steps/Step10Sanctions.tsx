import React from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store';
import { setSanctionsInfoField } from '../../store/slices/formSlice';

const PEP_POSITIONS = [
  'Head of State or Government',
  'Minister or Deputy Minister',
  'Member of Parliament',
  'Supreme Court Judge',
  'Central Bank Governor',
  'Ambassador or Diplomat',
  'High-ranking Military Officer',
  'CEO of State-owned Enterprise',
  'Political Party Leader',
  'Other'
];

const SANCTIONED_COUNTRIES = [
  'Afghanistan', 'Belarus', 'Central African Republic', 'Cuba', 'Democratic Republic of Congo',
  'Eritrea', 'Guinea-Bissau', 'Iran', 'Iraq', 'Lebanon', 'Libya', 'Mali', 'Myanmar',
  'Nicaragua', 'North Korea', 'Russia', 'Somalia', 'South Sudan', 'Sudan', 'Syria',
  'Venezuela', 'Yemen', 'Zimbabwe'
];

export const Step10Sanctions: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const sanctionsInfo = useSelector((state: RootState) => state.form.sanctionsInfo);

  return (
    <section className="step" data-step="10">
      <h2 className="text-xl font-semibold mb-6" data-i18n="step10_title">10. PEP & Sanctions Screening</h2>

      <div className="space-y-8">
        {/* PEP Screening Section */}
        <div className="p-6 border border-gray-200 rounded-lg bg-white">
          <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-800 mb-2" data-i18n="pep_q">
              {t('pep_q')}
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              A Politically Exposed Person (PEP) is someone who holds or has held a prominent public function.
            </p>
            <ul className="ml-6 list-disc text-sm text-gray-700 space-y-1">
              <li data-i18n="pep_client">The client/owner</li>
              <li data-i18n="pep_control">Any controlling person</li>
              <li data-i18n="pep_beneficial">Any beneficial owner</li>
              <li data-i18n="pep_establishing">Any person establishing the business relationship</li>
            </ul>
          </div>

          <div className="mb-4">
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  checked={sanctionsInfo.isPep}
                  type="radio"
                  name="is_pep"
                  value="yes"
                  onChange={(e) => dispatch(setSanctionsInfoField({ field: 'isPep', value: e.target.value === 'yes' }))}
                  required
                  className="mr-2"
                />
                <span className="text-sm font-medium">Yes</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="is_pep"
                  value="no"
                  checked={!sanctionsInfo.isPep}
                  onChange={(e) => dispatch(setSanctionsInfoField({ field: 'isPep', value: e.target.value === 'yes' }))}
                  className="mr-2"
                />
                <span className="text-sm font-medium">No</span>
              </label>
            </div>
          </div>

          {/* PEP Details Form */}
          {sanctionsInfo.isPep && (
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg space-y-4">
              <h4 className="font-medium text-yellow-800">PEP Details</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="pep_name"
                    placeholder="Full name of the PEP"
                    className="w-full border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={sanctionsInfo.pepName}
                    onChange={(e) => dispatch(setSanctionsInfoField({ field: 'pepName', value: e.target.value }))}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Position Held *
                  </label>
                  <select
                    name="pep_position"
                    className="w-full border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={sanctionsInfo.pepPosition}
                    onChange={(e) => dispatch(setSanctionsInfoField({ field: 'pepPosition', value: e.target.value }))}
                    required
                  >
                    <option value="">Select position</option>
                    {PEP_POSITIONS.map(position => (
                      <option key={position} value={position}>
                        {position}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Country *
                  </label>
                  <input
                    type="text"
                    name="pep_country"
                    placeholder="Country where position was held"
                    className="w-full border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={sanctionsInfo.pepCountry}
                    onChange={(e) => dispatch(setSanctionsInfoField({ field: 'pepCountry', value: e.target.value }))}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Period in Office *
                  </label>
                  <input
                    type="text"
                    name="pep_period"
                    placeholder="e.g., 2015-2020"
                    className="w-full border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={sanctionsInfo.pepPeriod}
                    onChange={(e) => dispatch(setSanctionsInfoField({ field: 'pepPeriod', value: e.target.value }))}
                    required
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sanctions Screening Section */}
        <div className="p-6 border border-gray-200 rounded-lg bg-white">
          <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-800 mb-2" data-i18n="sanctions_q">
              {t('sanctions_q')}
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              Check if any of the following persons have connections to sanctioned countries or entities.
            </p>
            <ul className="ml-6 list-disc text-sm text-gray-700 space-y-1">
              <li data-i18n="sanctions_client">The client/owner</li>
              <li data-i18n="sanctions_control">Any controlling person</li>
              <li data-i18n="sanctions_beneficial">Any beneficial owner</li>
              <li data-i18n="sanctions_establishing">Any person establishing the business relationship</li>
            </ul>
          </div>

          <div className="mb-4">
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="is_sanctioned"
                  value="yes"
                  checked={sanctionsInfo.isSanctions}
                  onChange={(e) => dispatch(setSanctionsInfoField({ field: 'isSanctions', value: e.target.value === 'yes' }))}
                  className="mr-2"
                />
                <span className="text-sm font-medium">Yes</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="is_sanctioned"
                  value="no"
                  checked={!sanctionsInfo.isSanctions}
                  onChange={(e) => dispatch(setSanctionsInfoField({ field: 'isSanctions', value: e.target.value === 'yes' }))}
                  className="mr-2"
                />
                <span className="text-sm font-medium">No</span>
              </label>
            </div>
          </div>

          {/* Sanctions Details Form */}
          {sanctionsInfo.isSanctions && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg space-y-4">
              <h4 className="font-medium text-red-800">Sanctions Details</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Person Name *
                  </label>
                  <input
                    type="text"
                    name="sanction_name"
                    placeholder="Full name of the person"
                    className="w-full border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={sanctionsInfo.sanctionsName}
                    onChange={(e) => dispatch(setSanctionsInfoField({ field: 'sanctionsName', value: e.target.value }))}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sanctioned Country *
                  </label>
                  <select
                    name="sanction_country"
                    className="w-full border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={sanctionsInfo.sanctionsCountry}
                    onChange={(e) => dispatch(setSanctionsInfoField({ field: 'sanctionsCountry', value: e.target.value }))}
                    required
                  >
                    <option value="">Select country</option>
                    {SANCTIONED_COUNTRIES.map(country => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nature of Ties *
                  </label>
                  <textarea
                    name="sanction_ties"
                    placeholder="Describe the nature of business ties or connections"
                    rows={3}
                    className="w-full border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={sanctionsInfo.sanctionsNature}
                    onChange={(e) => dispatch(setSanctionsInfoField({ field: 'sanctionsNature', value: e.target.value }))}
                    required
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Compliance Summary */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium text-gray-800 mb-2">Compliance Summary</h3>
          <div className="text-sm text-gray-600 space-y-1">
            <p>
              <strong>PEP Status:</strong> {sanctionsInfo.isPep ? 'Yes - Enhanced due diligence required' : 'No - Standard screening applies'}
            </p>
            <p>
              <strong>Sanctions Status:</strong> {sanctionsInfo.isSanctions ? 'Yes - Immediate review required' : 'No - Standard screening applies'}
            </p>
            {sanctionsInfo.isPep && (
              <p><strong>PEP Details:</strong> {sanctionsInfo.pepName} - {sanctionsInfo.pepPosition} in {sanctionsInfo.pepCountry}</p>
            )}
            {sanctionsInfo.isSanctions && (
              <p><strong>Sanctions Details:</strong> {sanctionsInfo.sanctionsName} - {sanctionsInfo.sanctionsCountry}</p>
            )}
          </div>
        </div>

        {/* Compliance Notice */}
        {(sanctionsInfo.isPep || sanctionsInfo.isSanctions) && (
          <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
            <h4 className="font-medium text-orange-800 mb-2">⚠️ Enhanced Due Diligence Required</h4>
            <div className="text-sm text-orange-700">
              {sanctionsInfo.isPep && (
                <p className="mb-2">• PEP identification requires enhanced due diligence procedures</p>
              )}
              {sanctionsInfo.isSanctions && (
                <p>• Sanctions connections require immediate compliance review</p>
              )}
              <p className="mt-2">Your application will be reviewed by our compliance team for additional verification.</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};