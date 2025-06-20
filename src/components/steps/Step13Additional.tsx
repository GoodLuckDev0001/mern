import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store';
import { setAdditionalInfoField } from '../../store/slices/formSlice';

interface FileInputProps {
  label: string;
  field: keyof RootState['form']['additionalInfo'];
  file: File | null;
  onFileChange: (field: keyof RootState['form']['additionalInfo'], file: File | null) => void;
}

const FileInput: React.FC<FileInputProps> = ({ label, field, file, onFileChange }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="flex items-center space-x-2">
        <input
          id={field}
          type="file"
          name={field}
          accept=".pdf,.jpg,.png,.doc,.docx"
          onChange={(e) => onFileChange(field, e.target.files?.[0] ?? null)}
          className="hidden"
        />
        <label
          htmlFor={field}
          className="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Choose File
        </label>
        {file && (
          <div className="text-sm text-gray-600">
            <span>{file.name}</span>
            <span className="text-gray-500 ml-2">({(file.size / 1024).toFixed(1)} KB)</span>
          </div>
        )}
      </div>
    </div>
  );
};

export const Step13Additional: React.FC = () => {
  const dispatch = useDispatch();
  const { additionalInfo } = useSelector((state: RootState) => state.form);

  const handleFileChange = (field: keyof typeof additionalInfo, file: File | null) => {
    dispatch(setAdditionalInfoField({ field, value: file }));
  };

  return (
    <section className="step" data-step="13">
      <h2 className="text-xl font-semibold mb-6" data-i18n="step13_title">13. Additional Documents</h2>

      <p className="text-sm text-gray-600 mb-6" data-i18n="upload_note">
        You may upload any additional documents relevant to your business (optional). Accepted formats: PDF, JPG, PNG, DOC, DOCX.
      </p>

      <div className="space-y-6">
        <FileInput
          label="Financial Statements"
          field="financialStatements"
          file={additionalInfo.financialStatements}
          onFileChange={handleFileChange}
        />
        <FileInput
          label="Business Plan"
          field="businessPlan"
          file={additionalInfo.businessPlan}
          onFileChange={handleFileChange}
        />
        <FileInput
          label="Licenses / Permits"
          field="licensesPermits"
          file={additionalInfo.licensesPermits}
          onFileChange={handleFileChange}
        />
        <FileInput
          label="Other Supporting Documents"
          field="supportingDocuments"
          file={additionalInfo.supportingDocuments}
          onFileChange={handleFileChange}
        />
      </div>

      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-medium text-gray-800 mb-2">Uploaded Documents Summary</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>Financial Statements: {additionalInfo.financialStatements?.name || 'Not uploaded'}</li>
          <li>Business Plan: {additionalInfo.businessPlan?.name || 'Not uploaded'}</li>
          <li>Licenses / Permits: {additionalInfo.licensesPermits?.name || 'Not uploaded'}</li>
          <li>Supporting Documents: {additionalInfo.supportingDocuments?.name || 'Not uploaded'}</li>
        </ul>
      </div>
    </section>
  );
};