import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store';
import { setAdditionalInfoField } from '../../store/slices/formSlice';
import { FileUpload } from '../FileUpload';

export const Step13Additional: React.FC = () => {
  const dispatch = useDispatch();
  const { additionalInfo } = useSelector((state: RootState) => state.form);

  const handleFileChange = (field: keyof typeof additionalInfo, file: File | null) => {
    dispatch(setAdditionalInfoField({ field, value: file }));
  };

  return (
    <section className="step" data-step="13">
      <h2 className="text-xl font-semibold mb-6">13. Additional Documents</h2>

      <p className="text-sm text-gray-600 mb-6">
        You may upload any additional documents relevant to your business (optional). 
        These documents help us better understand your business activities and ensure compliance.
      </p>

      <div className="space-y-6">
        <FileUpload
          label="Financial Statements"
          required={false}
          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
          maxSize={10 * 1024 * 1024}
          onFileSelect={(file) => handleFileChange('financialStatements', file)}
          currentFile={additionalInfo.financialStatements}
          helpText="Upload recent financial statements (annual reports, balance sheets, etc.). Acceptable formats: PDF, JPG, PNG, DOC, DOCX (max 10MB)."
        />

        <FileUpload
          label="Business Plan"
          required={false}
          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
          maxSize={10 * 1024 * 1024}
          onFileSelect={(file) => handleFileChange('businessPlan', file)}
          currentFile={additionalInfo.businessPlan}
          helpText="Upload your business plan or strategy document. Acceptable formats: PDF, JPG, PNG, DOC, DOCX (max 10MB)."
        />

        <FileUpload
          label="Licenses / Permits"
          required={false}
          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
          maxSize={10 * 1024 * 1024}
          onFileSelect={(file) => handleFileChange('licensesPermits', file)}
          currentFile={additionalInfo.licensesPermits}
          helpText="Upload relevant business licenses, permits, or certifications. Acceptable formats: PDF, JPG, PNG, DOC, DOCX (max 10MB)."
        />

        <FileUpload
          label="Other Supporting Documents"
          required={false}
          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
          maxSize={10 * 1024 * 1024}
          onFileSelect={(file) => handleFileChange('supportingDocuments', file)}
          currentFile={additionalInfo.supportingDocuments}
          helpText="Upload any other documents that support your application. Acceptable formats: PDF, JPG, PNG, DOC, DOCX (max 10MB)."
        />
      </div>

      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="font-medium text-blue-900 mb-2">Document Upload Guidelines</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• All documents should be clear and legible</li>
          <li>• Maximum file size: 10MB per document</li>
          <li>• Supported formats: PDF, JPG, PNG, DOC, DOCX</li>
          <li>• For images, ensure minimum 300 DPI resolution</li>
          <li>• Documents will be securely transmitted to compliance@centi.ch</li>
        </ul>
      </div>
    </section>
  );
};