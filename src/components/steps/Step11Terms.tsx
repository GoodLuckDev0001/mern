import React from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { PDFViewer } from '../PDFViewer';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store';
import { setTermsInfoField } from '../../store/slices/formSlice';

export const Step11Terms: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const termsInfo = useSelector((state: RootState) => state.form.termsInfo);

  const allTermsAccepted = termsInfo.agreePrivacy && termsInfo.agreeTerms && termsInfo.confirmTruth;

  return (
    <section className="step" data-step="11">
      <h2 className="text-xl font-semibold mb-6" data-i18n="step11_title">11. Terms and Conditions</h2>

      <div className="space-y-6">
        {/* Legal Notice */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-medium text-blue-800 mb-2">Important Legal Information</h3>
          <div className="text-sm text-blue-700 space-y-2">
            <p>
              Before proceeding with your application, please carefully read and understand the following terms and conditions.
              By accepting these terms, you acknowledge that you have read, understood, and agree to be bound by them.
            </p>
            <p>
              <strong>Note:</strong> This application is subject to Swiss financial regulations and compliance requirements.
            </p>
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="space-y-4">
          <div className="p-4 border border-gray-200 rounded-lg">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="agree_privacy"
                checked={termsInfo.agreePrivacy}
                onChange={(e) => dispatch(setTermsInfoField({ field: 'agreePrivacy', value: e.target.checked }))}
                required
                className="mt-1"
              />
              <div className="flex-1">
                <span className="text-sm font-medium text-gray-700">
                  I agree to the{' '}
                  <PDFViewer pdfUrl="/terms-and-conditions.pdf">
                    <span className="text-blue-600 hover:text-blue-800 underline cursor-pointer">
                      Privacy Policy
                    </span>
                  </PDFViewer>
                </span>
                <p className="text-xs text-gray-500 mt-1">
                  I understand how my personal data will be collected, processed, and protected.
                </p>
              </div>
            </label>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="agree_terms"
                checked={termsInfo.agreeTerms}
                onChange={(e) => dispatch(setTermsInfoField({ field: 'agreeTerms', value: e.target.checked }))}
                required
                className="mt-1"
              />
              <div className="flex-1">
                <span className="text-sm font-medium text-gray-700">
                  I accept the{' '}
                  <PDFViewer pdfUrl="/terms-and-conditions.pdf">
                    <span className="text-blue-600 hover:text-blue-800 underline cursor-pointer">
                      Terms and Conditions
                    </span>
                  </PDFViewer>
                </span>
                <p className="text-xs text-gray-500 mt-1">
                  I agree to the terms of service and business relationship with Centi.
                </p>
              </div>
            </label>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="confirm_truth"
                checked={termsInfo.confirmTruth}
                onChange={(e) => dispatch(setTermsInfoField({ field: 'confirmTruth', value: e.target.checked }))}
                required
                className="mt-1"
              />
              <div className="flex-1">
                <span className="text-sm font-medium text-gray-700">
                  {t('confirm_truth')}
                </span>
                <p className="text-xs text-gray-500 mt-1">
                  I confirm that all information provided in this application is accurate and complete to the best of my knowledge.
                </p>
              </div>
            </label>
          </div>
        </div>

        {/* Legal Penalty Notice */}
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <h4 className="font-medium text-red-800 mb-2">⚠️ Legal Penalty Notice</h4>
          <div className="text-sm text-red-700 space-y-2">
            <p>
              <strong>Article 251 of the Swiss Criminal Code:</strong> Document forgery and false declaration are criminal offenses.
            </p>
            <p>
              Providing false or misleading information in this application may result in:
            </p>
            <ul className="ml-4 list-disc space-y-1">
              <li>Criminal prosecution under Swiss law</li>
              <li>Immediate rejection of your application</li>
              <li>Potential legal consequences including fines and imprisonment</li>
              <li>Reporting to relevant authorities</li>
            </ul>
            <p className="mt-2">
              <strong>By submitting this application, you acknowledge that you understand these legal implications.</strong>
            </p>
          </div>
        </div>

        {/* Compliance Information */}
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <h4 className="font-medium text-green-800 mb-2">Compliance Information</h4>
          <div className="text-sm text-green-700 space-y-2">
            <p>
              <strong>Swiss Financial Regulations:</strong> This application complies with:
            </p>
            <ul className="ml-4 list-disc space-y-1">
              <li>Swiss Anti-Money Laundering Act (AMLA)</li>
              <li>Swiss Financial Market Supervisory Authority (FINMA) requirements</li>
              <li>Know Your Customer (KYC) procedures</li>
              <li>Data protection regulations (GDPR and Swiss Data Protection Act)</li>
            </ul>
            <p className="mt-2">
              Your information will be processed in accordance with these regulations and our privacy policy.
            </p>
          </div>
        </div>

        {/* Terms Acceptance Status */}
        <div className={`p-4 rounded-lg border ${
          allTermsAccepted 
            ? 'bg-green-50 border-green-200' 
            : 'bg-yellow-50 border-yellow-200'
        }`}>
          <h4 className={`font-medium mb-2 ${
            allTermsAccepted ? 'text-green-800' : 'text-yellow-800'
          }`}>
            {allTermsAccepted ? '✓ All Terms Accepted' : '⚠️ Terms Acceptance Required'}
          </h4>
          <div className={`text-sm space-y-1 ${
            allTermsAccepted ? 'text-green-700' : 'text-yellow-700'
          }`}>
            <p>Privacy Policy: {termsInfo.agreePrivacy ? '✓ Accepted' : '✗ Not accepted'}</p>
            <p>Terms & Conditions: {termsInfo.agreeTerms ? '✓ Accepted' : '✗ Not accepted'}</p>
            <p>Truth Declaration: {termsInfo.confirmTruth ? '✓ Accepted' : '✗ Not accepted'}</p>
          </div>
          {allTermsAccepted && (
            <p className="text-sm text-green-700 mt-2">
              ✓ You have accepted all required terms and conditions. You may proceed to the next step.
            </p>
          )}
        </div>

        {/* Data Processing Consent */}
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h4 className="font-medium text-gray-800 mb-2">Data Processing Consent</h4>
          <div className="text-sm text-gray-600 space-y-2">
            <p>
              By accepting these terms, you consent to Centi processing your personal data for:
            </p>
            <ul className="ml-4 list-disc space-y-1">
              <li>Identity verification and due diligence</li>
              <li>Compliance with regulatory requirements</li>
              <li>Risk assessment and monitoring</li>
              <li>Communication regarding your application</li>
              <li>Legal and regulatory reporting obligations</li>
            </ul>
            <p className="mt-2">
              Your data will be retained in accordance with Swiss data protection laws and regulatory requirements.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};