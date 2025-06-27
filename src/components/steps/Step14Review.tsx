import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import type { RootState } from '../../store';
import { setCurrentStep } from '../../store/slices/formSlice';
import { useTranslation } from '../../hooks/useTranslation';

// Mapping function for risk profile template
function mapRiskProfileToPlaceholders(riskProfile: any) {
  return {
    Text10: riskProfile.clientName,
    Text8: riskProfile.date,
    Kontrollkästchen1: riskProfile.isForeignPEP ? 'true' : 'false',
    Kontrollkästchen2: riskProfile.isDomesticPEP ? 'true' : 'false',
    // Add more mappings as needed
  };
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Create a deep copy to avoid modifying the Redux state directly
    const stateToSubmit = JSON.parse(JSON.stringify(formState));
    console.log("stateToSubmit💖💖💖", stateToSubmit);
    
    // Example: Only generate risk profile PDF if user is high risk (replace with your real condition)
    const needsRiskProfile = formState.riskProfile && formState.riskProfile.isHighRisk;

    if (needsRiskProfile) {
      const riskData = mapRiskProfileToPlaceholders(formState.riskProfile);
      const riskFormData = new FormData();
      riskFormData.append('template', '902.4e');
      Object.entries(riskData).forEach(([key, value]) => {
        riskFormData.append(key, value);
      });
      try {
        const response = await fetch('/api/submit', {
          method: 'POST',
          body: riskFormData,
        });
        if (response.ok) {
          setSubmitStatus('success');
          toast.success('Risk Profile PDF generated successfully!');
        } else {
          const errorData = await response.json();
          toast.error(errorData.message || 'Error generating Risk Profile PDF.');
          setSubmitStatus('error');
        }
      } catch (error) {
        toast.error('Unexpected error generating Risk Profile PDF.');
        setSubmitStatus('error');
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    // The backend expects multipart/form-data, so we send the whole state as a JSON string
    // This is simpler than appending each field, especially for nested objects and arrays.
    // The backend can then parse this string back into an object.
    const formData = new FormData();
    const today = new Date();
    const formattedDate = `${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getDate().toString().padStart(2, '0')}/${today.getFullYear()}`;
    formData.append('5', formattedDate);
    formData.append('6', formState.companyInfo.name);
    formData.append('7', formState.companyInfo.address);
    formData.append('8', formState.companyInfo.phone);
    formData.append('9', formState.companyInfo.email);
    formData.append('10', '  ');
    formData.append('11', ' ');
    formData.append('12', ' ');
    formData.append('12:1', formState.entityInfo.registerFile === null ? 'false' : 'true');
    formData.append('13', formState.companyInfo.name);
    formData.append('14', formState.companyInfo.address);
    formData.append('15', ' ');
    formData.append('15:1', formState.entityInfo.articlesFile === null ? 'false' : 'true');
    formData.append('16', formState.companyInfo.name);
    formData.append('17', formState.companyInfo.canton + ' ' + formState.companyInfo.city + ' ' + formState.companyInfo.address + ' ' + formState.companyInfo.postal);
    formData.append('18', ' ');
    formData.append('19', formState.companyInfo.phone);
    formData.append('20', formState.companyInfo.email);
    formData.append('21', ' ');
    formData.append('23', formState.establishingPersons[0].name);
    formData.append('24', formState.establishingPersons[0].address);
    formData.append('25', formState.establishingPersons[0].dob);
    formData.append('26', formState.establishingPersons[0].nationality);
    formData.append('27', formState.establishingPersons[0].toa);
    formData.append('28', formState.establishingPersons[0].iddoc === null ? 'false' : 'true');
    formData.append('29', ' ');
    formData.append('29:1', 'false');
    formData.append('29:2', 'false');
    formData.append('29:3', formState.establishingPersons[0].poa === null ? 'false' : 'true');
    formData.append('31', ' ');
    formData.append('31:1', 'false');
    formData.append('31:2', 'true');
    formData.append('31:3', 'false');
    formData.append('31:4', 'false');
    formData.append('32', ' ');
    formData.append('32:1', 'false');
    formData.append('32:2', 'false');
    formData.append('32:3', 'false');
    formData.append('32:4', 'true');
    formData.append('34', 'No information');
    formData.append('35:5', 'false');
    formData.append('35:1', 'true');
    formData.append('35:2', 'false');
    formData.append('35:3', 'false');
    formData.append('35:4', 'false');
    formData.append('36', 'false');
    formData.append('39', formState.transactionInfo.businessPurposes[0]);

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        body: formData, // No 'Content-Type' header needed; the browser sets it for FormData
      });

      if (response.ok) {
        setSubmitStatus('success');
        toast.success('Your application has been submitted successfully!');
        console.log('Submission successful!');
      } else {
        const errorData = await response.json();
        console.error('Submission failed:', errorData);
        toast.error(errorData.message || 'There was an error submitting your application.');
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('An unexpected error occurred. Please try again.');
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