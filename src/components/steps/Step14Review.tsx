import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store';
import { setCurrentStep } from '../../store/slices/formSlice';
import { useTranslation } from '../../hooks/useTranslation';
import { getTemplatesToGenerate } from '../../utils/templateSelector';


type RiskIndicator = {
  key: string;
  label: string;
  triggered: boolean;
};

function getRiskIndicators(formState: any): { isHighRisk: boolean; indicators: RiskIndicator[] } {
  const indicators: RiskIndicator[] = [
    {
      key: 'isPEP',
      label: 'Client is a Politically Exposed Person (PEP)',
      triggered: !!formState.sanctionsInfo?.isPep,
    },
    {
      key: 'pepTypeForeign',
      label: 'PEP type is Foreign',
      triggered: formState.sanctionsInfo?.pepType === 'foreign',
    },
    {
      key: 'pepTypeInternational',
      label: 'PEP type is International Organization',
      triggered: formState.sanctionsInfo?.pepType === 'international',
    },
    {
      key: 'hasPepRelationship',
      label: 'Family or business relationship with a PEP',
      triggered: !!formState.sanctionsInfo?.hasPepRelationship,
    },
    {
      key: 'hasSanctionedCountry',
      label: 'Connection to sanctioned country',
      triggered: (formState.sanctionsInfo?.sanctionedCountries || []).length > 0,
    },
    {
      key: 'complexOwnership',
      label: 'Complex ownership structure (multiple beneficial owners)',
      triggered: (formState.beneficialInfo?.beneficialOwners?.length || 0) > 1,
    },
  ];
  const isHighRisk = indicators.some(ind => ind.triggered);
  return { isHighRisk, indicators };
}

export const Step14Review: React.FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const formState = useSelector((state: RootState) => state.form);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleEdit = (step: number) => {
    dispatch(setCurrentStep(step));
  };

  const { isHighRisk, indicators } = getRiskIndicators(formState);

  const requiredTemplates = getTemplatesToGenerate(formState);

  const templateNames: Record<string, string> = {
    '902.1e': 'Identification Form',
    '902.4e': 'Risk Profile',
    '902.5e': 'Customer Profile',
    '902.9e': 'Form-A (Beneficial Ownership)',
    '902.11e': 'Form-K (Controlling Persons)'
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      console.log(requiredTemplates);
      for (const templateId of requiredTemplates) {
        const response = await fetch('/api/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            template: templateId,
            ...formState
          })
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Submission failed');
        }
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderSection = (title: string, step: number, content: React.ReactNode) => (
    <div className="border rounded-lg p-4 mb-4 bg-white shadow-sm">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <button
          onClick={() => handleEdit(step)}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          Edit
        </button>
      </div>
      <div className="text-sm text-gray-700 space-y-2">
        {content}
      </div>
    </div>
  );

  return (
    <section className="step" data-step="14">
      <h2 className="text-xl font-semibold mb-4" data-i18n="step14_title">14. Review & Submit</h2>

      <p className="text-sm text-gray-600 mb-6">
        Please review the information you've provided before submitting the application.
      </p>

      {submitStatus === 'success' && (
        <div className="p-4 mb-4 bg-green-100 text-green-800 rounded-lg">
          Your application has been submitted successfully! You will be redirected shortly.
        </div>
      )}
      {submitStatus === 'error' && (
        <div className="p-4 mb-4 bg-red-100 text-red-800 rounded-lg">
          There was an error submitting your application. Please check the details and try again.
        </div>
      )}

      <div className="space-y-4">
        {renderSection('Client Type', 1, <p><strong>Type:</strong> {t(formState.clientType)}</p>)}

        {renderSection('Company Information', 2, (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
            <p><strong>Name:</strong> {formState.companyInfo.name || 'N/A'}</p>
            <p><strong>Address:</strong> {formState.companyInfo.address || 'N/A'}</p>
            <p><strong>Postal:</strong> {formState.companyInfo.postal || 'N/A'}</p>
            <p><strong>City:</strong> {formState.companyInfo.city || 'N/A'}</p>
            <p><strong>Canton:</strong> {formState.companyInfo.canton || 'N/A'}</p>
            <p><strong>Phone:</strong> {formState.companyInfo.phone || 'N/A'}</p>
            <p><strong>Email:</strong> {formState.companyInfo.email || 'N/A'}</p>
            <p><strong>Industry:</strong> {formState.companyInfo.industry || 'N/A'}</p>
          </div>
        ))}
        
        {renderSection('Entity Information', 3, (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                <p><strong>UID:</strong> {formState.entityInfo.uid || 'N/A'}</p>
                <p><strong>Incorporation Date:</strong> {formState.entityInfo.incorporationDate || 'N/A'}</p>
                <p><strong>Purpose:</strong> {formState.entityInfo.purpose || 'N/A'}</p>
                <p><strong>Listed on stock exchange:</strong> {formState.entityInfo.isListed || 'N/A'}</p>
                {formState.entityInfo.isListed === 'yes' && <p><strong>Exchange Name:</strong> {formState.entityInfo.exchangeName || 'N/A'}</p>}
            </div>
        ))}

        {renderSection('Beneficial Ownership', 6, (
            <div>
                <p><strong>Is the client the sole beneficial owner?</strong> {formState.beneficialInfo.isSoleOwner ? 'Yes' : 'No'}</p>
                {!formState.beneficialInfo.isSoleOwner && (
                    <div className="mt-2">
                        <strong>Beneficial Owners:</strong>
                        <ul className="list-disc pl-5">
                            {formState.beneficialInfo.beneficialOwners.map(owner => (
                                <li key={owner.id}>{owner.firstName} {owner.lastName}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        ))}

        {renderSection('Business Activity', 7, (
            <div className="space-y-2">
                <p><strong>Business Activities:</strong> {formState.businessActivity.professionActivity || 'N/A'}</p>
                <p><strong>Core Business Description:</strong> {formState.businessActivity.businessDescription || 'N/A'}</p>
                <p><strong>Main Clients/Target Audience:</strong> {formState.businessActivity.targetClients || 'N/A'}</p>
                <p><strong>Main Countries of Business:</strong> {formState.businessActivity.mainCountries.join(', ') || 'N/A'}</p>
            </div>
        ))}

        {renderSection('Financial Information', 8, (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                <p><strong>Annual Revenue:</strong> {formState.financialInfo.annualRevenue || 'N/A'}</p>
                <p><strong>Total Assets:</strong> {formState.financialInfo.totalAssets || 'N/A'}</p>
                <p><strong>Liabilities:</strong> {formState.financialInfo.liabilities || 'N/A'}</p>
            </div>
        ))}

        {renderSection('Transaction Information', 9, (
            <div className="space-y-2">
                <p><strong>Nature of Assets:</strong> {formState.transactionInfo.assetNature || 'N/A'}</p>
                <p><strong>Origin of Assets:</strong> {formState.transactionInfo.assetOrigin || 'N/A'}</p>
                <p><strong>Expected Transaction Volume:</strong> {formState.transactionInfo.monthlyVolume || 'N/A'} CHF</p>
                <p><strong>Purpose of Business Relationship:</strong> {formState.transactionInfo.businessPurposes.join(', ') || 'N/A'}</p>
            </div>
        ))}

        {renderSection('PEP & Sanctions', 10, (
            <div>
                <p><strong>PEP Status:</strong> {formState.sanctionsInfo.isPep ? 'Yes' : 'No'}</p>
                {formState.sanctionsInfo.isPep && (
                    <div className="pl-4 mt-2">
                        <p><strong>PEP Name:</strong> {formState.sanctionsInfo.pepName || 'N/A'}</p>
                    </div>
                )}
                <p className="mt-2"><strong>Connections to Sanctioned Countries:</strong> {formState.sanctionsInfo.isSanctions ? 'Yes' : 'No'}</p>
            </div>
        ))}
        
        {renderSection('Terms and Conditions', 11, (
            <div>
                <p><strong>Privacy Policy:</strong> {formState.termsInfo.agreePrivacy ? 'Accepted' : 'Not Accepted'}</p>
                <p><strong>Terms & Conditions:</strong> {formState.termsInfo.agreeTerms ? 'Accepted' : 'Not Accepted'}</p>
                <p><strong>Declaration of Truthfulness:</strong> {formState.termsInfo.confirmTruth ? 'Accepted' : 'Not Accepted'}</p>
            </div>
        ))}

        {renderSection('Verification Method', 12, (
            <p><strong>Method:</strong> {formState.verificationInfo.verificationMethod || 'N/A'}</p>
        ))}

        {renderSection('Additional Documents', 13, (
            <ul className="list-disc pl-5">
                <li><strong>Financial Statements:</strong> {formState.additionalInfo.financialStatements?.name || 'Not uploaded'}</li>
                <li><strong>Business Plan:</strong> {formState.additionalInfo.businessPlan?.name || 'Not uploaded'}</li>
                <li><strong>Licenses/Permits:</strong> {formState.additionalInfo.licensesPermits?.name || 'Not uploaded'}</li>
                <li><strong>Supporting Documents:</strong> {formState.additionalInfo.supportingDocuments?.name || 'Not uploaded'}</li>
            </ul>
        ))}
      </div>

      <h3>Risk Indicators</h3>
      <ul>
        {indicators.filter(ind => ind.triggered).map(ind => (
          <li key={ind.key}>{ind.label}</li>
        ))}
      </ul>
      {isHighRisk ? (
        <p className="text-red-600 font-bold">This client is flagged as HIGH RISK.</p>
      ) : (
        <p className="text-green-600 font-bold">This client is NOT high risk.</p>
      )}

      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="text-lg font-medium text-blue-800 mb-2">
          Required Documents for Submission
        </h3>
        <ul className="list-disc list-inside text-blue-700">
          {requiredTemplates.map((templateId) => (
            <li key={templateId}>{templateNames[templateId] || templateId}</li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <button
          onClick={handleSubmit}
          disabled={isSubmitting || submitStatus === 'success'}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isSubmitting ? 'Submitting...' : (submitStatus === 'success' ? 'Submitted' : 'Submit Application')}
        </button>
      </div>
    </section>
  );
};