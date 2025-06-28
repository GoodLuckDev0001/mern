import { VQFDataMapper } from './dataMapping';
import type { RootState } from '../store';

export interface DocumentGenerationRequest {
  templateId: string;
  formData: RootState['form'];
  metadata?: {
    language?: string;
    customFields?: Record<string, any>;
  };
}

export interface DocumentGenerationResponse {
  success: boolean;
  pdfPath?: string;
  submissionTimestamp?: string;
  error?: string;
}

export class DocumentGenerator {
  private static readonly API_BASE_URL = '/api/submit-form';
  
  private static readonly TEMPLATE_MAP: Record<string, string> = {
    '902.1e': '902.1e (Identification).docx',
    '902.4e': '902.4e (Risk Profile).docx',
    '902.5e': '902.5e (Customer Profile).docx',
    '902.9e': '902.9e (Form-A).docx',
    '902.11e': '902.11e (Form-K).docx'
  };

  /**
   * Generate a single VQF document
   */
  public static async generateDocument(request: DocumentGenerationRequest): Promise<DocumentGenerationResponse> {
    try {
      // Validate template ID
      if (!(request.templateId in this.TEMPLATE_MAP)) {
        return {
          success: false,
          error: `Invalid template ID: ${request.templateId}`
        };
      }

      // Map form data to VQF format
      const vqfData = VQFDataMapper.generateDocumentData(request.formData);
      
      // Add custom fields if provided
      const renderData = {
        ...vqfData,
        ...request.metadata?.customFields
      };

      // Prepare request payload
      const payload = {
        template: request.templateId,
        ...renderData
      };

      // Send request to backend
      const response = await fetch(this.API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json();
        return {
          success: false,
          error: errorData.error || `HTTP ${response.status}: ${response.statusText}`
        };
      }

      const result = await response.json();
      return {
        success: true,
        pdfPath: result.pdfPath,
        submissionTimestamp: result.submissionTimestamp
      };

    } catch (error) {
      console.error('Document generation error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  /**
   * Generate all VQF documents for a complete onboarding
   */
  public static async generateAllDocuments(formData: RootState['form']): Promise<{
    success: boolean;
    documents: Record<string, DocumentGenerationResponse>;
    errors: string[];
  }> {
    const documents: Record<string, DocumentGenerationResponse> = {};
    const errors: string[] = [];

    // Generate each VQF document
    const templateIds = Object.keys(this.TEMPLATE_MAP);
    
    for (const templateId of templateIds) {
      try {
        const result = await this.generateDocument({
          templateId,
          formData,
          metadata: {
            language: 'en',
            customFields: {
              documentType: templateId,
              generatedAt: new Date().toISOString()
            }
          }
        });

        documents[templateId] = result;

        if (!result.success) {
          errors.push(`${templateId}: ${result.error}`);
        }

      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : 'Unknown error';
        documents[templateId] = {
          success: false,
          error: errorMsg
        };
        errors.push(`${templateId}: ${errorMsg}`);
      }
    }

    return {
      success: errors.length === 0,
      documents,
      errors
    };
  }

  /**
   * Generate specific documents based on client type and requirements
   */
  public static async generateRequiredDocuments(formData: RootState['form']): Promise<{
    success: boolean;
    documents: Record<string, DocumentGenerationResponse>;
    errors: string[];
  }> {
    const documents: Record<string, DocumentGenerationResponse> = {};
    const errors: string[] = [];
    const requiredTemplates: string[] = [];

    // Always required
    requiredTemplates.push('902.1e'); // Identification
    requiredTemplates.push('902.4e'); // Risk Profile

    // Conditional based on client type
    if (formData.clientType.includes('llc') || formData.clientType.includes('assoc')) {
      requiredTemplates.push('902.5e'); // Customer Profile
      requiredTemplates.push('902.9e'); // Form-A (Establishing Persons)
    }

    // Conditional based on business activity
    if (formData.businessActivity.professionActivity) {
      requiredTemplates.push('902.11e'); // Form-K (Financial Info)
    }

    // Generate required documents
    for (const templateId of requiredTemplates) {
      try {
        const result = await this.generateDocument({
          templateId,
          formData,
          metadata: {
            language: 'en',
            customFields: {
              documentType: templateId,
              clientType: formData.clientType,
              generatedAt: new Date().toISOString()
            }
          }
        });

        documents[templateId] = result;

        if (!result.success) {
          errors.push(`${templateId}: ${result.error}`);
        }

      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : 'Unknown error';
        documents[templateId] = {
          success: false,
          error: errorMsg
        };
        errors.push(`${templateId}: ${errorMsg}`);
      }
    }

    return {
      success: errors.length === 0,
      documents,
      errors
    };
  }

  /**
   * Validate form data before document generation
   */
  public static validateFormData(formData: RootState['form']): {
    isValid: boolean;
    errors: string[];
    warnings: string[];
  } {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Basic validation
    if (!formData.clientType) {
      errors.push('Client type is required');
    }

    if (!formData.companyInfo.name && !formData.soleProprietorInfo.ownerName) {
      errors.push('Company name or owner name is required');
    }

    if (!formData.companyInfo.address && !formData.soleProprietorInfo.ownerAddress) {
      errors.push('Address is required');
    }

    // Business logic validation
    if (formData.sanctionsInfo.isPep && !formData.sanctionsInfo.pepType) {
      errors.push('PEP type must be specified when PEP status is true');
    }

    if (formData.establishingPersons.length === 0) {
      errors.push('At least one establishing person is required');
    }

    // Warnings for optional fields
    if (!formData.entityInfo.uid && formData.clientType.includes('llc')) {
      warnings.push('UID is recommended for Swiss entities');
    }

    if (!formData.financialInfo.annualRevenue) {
      warnings.push('Annual revenue information is recommended');
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }

  /**
   * Get document generation status
   */
  public static getDocumentStatus(documents: Record<string, DocumentGenerationResponse>): {
    total: number;
    successful: number;
    failed: number;
    pending: number;
  } {
    const total = Object.keys(documents).length;
    const successful = Object.values(documents).filter(doc => doc.success).length;
    const failed = Object.values(documents).filter(doc => !doc.success).length;
    const pending = total - successful - failed;

    return {
      total,
      successful,
      failed,
      pending
    };
  }
} 