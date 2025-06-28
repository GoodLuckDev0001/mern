import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import { DocumentGenerator, type DocumentGenerationResponse } from '../utils/documentGeneration';

interface DocumentGenerationStepProps {
  onComplete: (documents: Record<string, DocumentGenerationResponse>) => void;
  onError: (errors: string[]) => void;
}

export const DocumentGenerationStep: React.FC<DocumentGenerationStepProps> = ({
  onComplete,
  onError
}) => {
  const formData = useSelector((state: RootState) => state.form);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentDocument, setCurrentDocument] = useState<string>('');
  const [documents, setDocuments] = useState<Record<string, DocumentGenerationResponse>>({});
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [validationWarnings, setValidationWarnings] = useState<string[]>([]);

  useEffect(() => {
    // Validate form data before generation
    const validation = DocumentGenerator.validateFormData(formData);
    setValidationErrors(validation.errors);
    setValidationWarnings(validation.warnings);

    if (validation.isValid) {
      generateDocuments();
    } else {
      onError(validation.errors);
    }
  }, []);

  const generateDocuments = async () => {
    setIsGenerating(true);
    setProgress(0);

    try {
      // Generate required documents based on client type
      const result = await DocumentGenerator.generateRequiredDocuments(formData);
      
      setDocuments(result.documents);
      
      if (result.success) {
        onComplete(result.documents);
      } else {
        onError(result.errors);
      }

    } catch (error) {
      console.error('Document generation failed:', error);
      onError([error instanceof Error ? error.message : 'Unknown error occurred']);
    } finally {
      setIsGenerating(false);
    }
  };

  const getDocumentName = (templateId: string): string => {
    const documentNames: Record<string, string> = {
      '902.1e': 'Identification Form',
      '902.4e': 'Risk Profile',
      '902.5e': 'Customer Profile',
      '902.9e': 'Form-A (Establishing Persons)',
      '902.11e': 'Form-K (Financial Information)'
    };
    return documentNames[templateId] || templateId;
  };

  const getStatusIcon = (success: boolean, error?: string) => {
    if (error) return '❌';
    if (success) return '✅';
    return '⏳';
  };

  const getStatusText = (success: boolean, error?: string) => {
    if (error) return 'Failed';
    if (success) return 'Generated';
    return 'Pending';
  };

  if (validationErrors.length > 0) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-red-800 mb-4">
            Form Validation Errors
          </h2>
          <p className="text-red-700 mb-4">
            Please fix the following errors before generating documents:
          </p>
          <ul className="list-disc list-inside space-y-2 text-red-700">
            {validationErrors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Generating VQF Documents
        </h2>

        {validationWarnings.length > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-medium text-yellow-800 mb-2">Warnings</h3>
            <ul className="list-disc list-inside space-y-1 text-yellow-700">
              {validationWarnings.map((warning, index) => (
                <li key={index}>{warning}</li>
              ))}
            </ul>
          </div>
        )}

        {isGenerating && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Generating documents...
              </span>
              <span className="text-sm text-gray-500">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        <div className="space-y-4">
          {Object.entries(documents).map(([templateId, document]) => (
            <div 
              key={templateId}
              className={`p-4 rounded-lg border ${
                document.success 
                  ? 'bg-green-50 border-green-200' 
                  : document.error 
                    ? 'bg-red-50 border-red-200'
                    : 'bg-gray-50 border-gray-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-lg">
                    {getStatusIcon(document.success, document.error)}
                  </span>
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {getDocumentName(templateId)}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {getStatusText(document.success, document.error)}
                    </p>
                  </div>
                </div>
                
                {document.success && document.pdfPath && (
                  <a
                    href={document.pdfPath}
                    download
                    className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Download PDF
                  </a>
                )}
              </div>

              {document.error && (
                <p className="mt-2 text-sm text-red-600">
                  Error: {document.error}
                </p>
              )}

              {document.submissionTimestamp && (
                <p className="mt-1 text-xs text-gray-500">
                  Generated: {new Date(document.submissionTimestamp).toLocaleString()}
                </p>
              )}
            </div>
          ))}
        </div>

        {!isGenerating && Object.keys(documents).length > 0 && (
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="text-lg font-medium text-blue-800 mb-2">
              Document Generation Complete
            </h3>
            <p className="text-blue-700">
              All required VQF documents have been generated and are ready for submission to compliance.
              The documents will be securely transmitted to compliance@centi.ch for review.
            </p>
          </div>
        )}

        {isGenerating && (
          <div className="mt-6 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
            <p className="text-sm text-gray-600">
              Please wait while we generate your VQF documents...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}; 