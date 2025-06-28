import type { RootState } from '../store';

export interface VQFMappingData {
  // Form 902.1e (Identification)
  identification: {
    customerName: string;
    customerType: string;
    uid: string;
    address: string;
    postalCode: string;
    city: string;
    country: string;
    establishmentDate: string;
    purpose: string;
    isListed: string;
    exchangeName?: string;
    ownerName?: string;
    ownerDob?: string;
    ownerNationality?: string;
    ownerAddress?: string;
  };

  // Form 902.4e (Risk Profile)
  riskProfile: {
    foreignPEP: boolean;
    domesticPEP: boolean;
    highRiskCountry: boolean;
    seniorExecutiveDecision: string;
    decisionDate: string;
  };

  // Form 902.5e (Customer Profile)
  customerProfile: {
    businessActivity: string;
    industry: string;
    expectedTransactions: string;
    expectedVolume: string;
    sourceOfFunds: string;
    riskLevel: string;
  };

  // Form 902.9e (Form-A)
  formA: {
    establishingPersons: Array<{
      name: string;
      address: string;
      postal: string;
      city: string;
      country: string;
      dob: string;
      nationality: string;
      authorization: string;
    }>;
    controllingPersons: Array<{
      name: string;
      address: string;
      postal: string;
      city: string;
      country: string;
      dob: string;
      nationality: string;
      ownership: string;
    }>;
    beneficialOwners: Array<{
      name: string;
      address: string;
      postal: string;
      city: string;
      country: string;
      dob: string;
      nationality: string;
      ownership: string;
    }>;
  };

  // Form 902.11e (Form-K)
  formK: {
    financialInformation: {
      annualRevenue: string;
      assets: string;
      liabilities: string;
      netWorth: string;
    };
    transactionProfile: {
      typicalTransactionSize: string;
      frequency: string;
      purpose: string;
      counterparties: string;
    };
  };

  // Additional metadata
  metadata: {
    submissionDate: string;
    vqfMemberNumber: string;
    amlaFileNumber: string;
    completedBy: string;
    language: string;
  };
}

export class VQFDataMapper {
  private static formatDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB'); // DD/MM/YYYY format
  }

  private static formatCurrency(amount: string): string {
    if (!amount) return '';
    const num = parseFloat(amount);
    if (isNaN(num)) return amount;
    return new Intl.NumberFormat('de-CH', {
      style: 'currency',
      currency: 'CHF',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(num);
  }

  private static mapClientType(clientType: string): string {
    const typeMap: Record<string, string> = {
      'swiss_llc': 'Swiss Limited Liability Company',
      'foreign_llc': 'Foreign Limited Liability Company',
      'swiss_assoc': 'Swiss Association',
      'swiss_sole': 'Swiss Sole Proprietorship',
      'foreign_sole': 'Foreign Sole Proprietorship'
    };
    return typeMap[clientType] || clientType;
  }

  private static mapAuthorization(auth: string): string {
    const authMap: Record<string, string> = {
      'individual': 'Individual Signatory',
      'collective': 'Collective Signatory',
      'poa': 'Power of Attorney',
      'other': 'Other'
    };
    return authMap[auth] || auth;
  }

  private static mapRiskLevel(riskFactors: string[]): string {
    if (riskFactors.includes('foreign_pep') || riskFactors.includes('high_risk_country')) {
      return 'High Risk';
    } else if (riskFactors.includes('domestic_pep')) {
      return 'Medium Risk';
    }
    return 'Standard Risk';
  }

  public static mapFormDataToVQF(formData: RootState['form']): VQFMappingData {
    const { 
      clientType, 
      companyInfo, 
      entityInfo, 
      soleProprietorInfo,
      establishingPersons,
      controllingInfo,
      beneficialInfo,
      businessActivity,
      financialInfo,
      transactionInfo,
      sanctionsInfo,
      additionalInfo
    } = formData;

    // Determine customer name based on client type
    const customerName = clientType.includes('sole') 
      ? soleProprietorInfo.ownerName 
      : companyInfo.name;

    // Determine address based on client type
    const address = clientType.includes('sole')
      ? soleProprietorInfo.ownerAddress
      : companyInfo.address;

    return {
      identification: {
        customerName: customerName || '',
        customerType: this.mapClientType(clientType),
        uid: entityInfo.uid || soleProprietorInfo.uid || '',
        address: address || '',
        postalCode: companyInfo.postal || '',
        city: companyInfo.city || '',
        country: companyInfo.canton || '',
        establishmentDate: this.formatDate(
          clientType.includes('sole') 
            ? soleProprietorInfo.establishmentDate 
            : entityInfo.incorporationDate
        ),
        purpose: entityInfo.purpose || '',
        isListed: entityInfo.isListed || 'no',
        exchangeName: entityInfo.exchangeName || '',
        ownerName: soleProprietorInfo.ownerName || '',
        ownerDob: this.formatDate(soleProprietorInfo.ownerDob),
        ownerNationality: soleProprietorInfo.ownerNationality || '',
        ownerAddress: soleProprietorInfo.ownerAddress || ''
      },

      riskProfile: {
        foreignPEP: sanctionsInfo.pepType === 'foreign',
        domesticPEP: sanctionsInfo.pepType === 'domestic',
        highRiskCountry: sanctionsInfo.sanctionedCountries.length > 0,
        seniorExecutiveDecision: sanctionsInfo.isPep ? 'Approved' : 'n.a.- not needed',
        decisionDate: this.formatDate(new Date().toISOString())
      },

      customerProfile: {
        businessActivity: businessActivity.professionActivity || '',
        industry: businessActivity.businessDescription || '',
        expectedTransactions: transactionInfo.assetNature || '',
        expectedVolume: this.formatCurrency(transactionInfo.monthlyVolume.toString()),
        sourceOfFunds: transactionInfo.assetOrigin || '',
        riskLevel: this.mapRiskLevel([
          sanctionsInfo.isPep ? 'foreign_pep' : '',
          sanctionsInfo.sanctionedCountries.length > 0 ? 'high_risk_country' : ''
        ].filter(Boolean))
      },

      formA: {
        establishingPersons: establishingPersons.map(person => ({
          name: person.name || '',
          address: person.address || '',
          postal: person.postal || '',
          city: person.city || '',
          country: person.country || '',
          dob: this.formatDate(person.dob),
          nationality: person.nationality || '',
          authorization: this.mapAuthorization(person.toa)
        })),
        controllingPersons: controllingInfo.controllingPersons.map(person => ({
          name: `${person.firstName} ${person.lastName}`.trim(),
          address: person.address || '',
          postal: person.postal || '',
          city: person.city || '',
          country: person.country || '',
          dob: this.formatDate(person.dob),
          nationality: person.nationality || '',
          ownership: controllingInfo.is25Percent ? '25% or more' : 'Less than 25%'
        })),
        beneficialOwners: beneficialInfo.beneficialOwners.map(person => ({
          name: `${person.firstName} ${person.lastName}`.trim(),
          address: person.address || '',
          postal: '',
          city: '',
          country: '',
          dob: this.formatDate(person.dob),
          nationality: person.nationality || '',
          ownership: beneficialInfo.isSoleOwner ? '100%' : person.relationship
        }))
      },

      formK: {
        financialInformation: {
          annualRevenue: this.formatCurrency(financialInfo.annualRevenue),
          assets: this.formatCurrency(financialInfo.totalAssets),
          liabilities: this.formatCurrency(financialInfo.liabilities),
          netWorth: this.formatCurrency(
            (parseFloat(financialInfo.totalAssets) - parseFloat(financialInfo.liabilities)).toString()
          )
        },
        transactionProfile: {
          typicalTransactionSize: this.formatCurrency(transactionInfo.monthlyVolume.toString()),
          frequency: transactionInfo.assetCategory || '',
          purpose: transactionInfo.businessPurposes.join(', ') || '',
          counterparties: businessActivity.targetClients || ''
        }
      },

      metadata: {
        submissionDate: this.formatDate(new Date().toISOString()),
        vqfMemberNumber: '100809', // Centi's VQF member number
        amlaFileNumber: '', // Will be assigned by compliance
        completedBy: 'Bernhard Frank Müller Hug', // Compliance officer
        language: 'en'
      }
    };
  }

  public static generateDocumentData(formData: RootState['form']): Record<string, any> {
    const vqfData = this.mapFormDataToVQF(formData);
    
    // Flatten the data structure for docxtemplater
    return {
      // Identification form fields
      customerName: vqfData.identification.customerName,
      customerType: vqfData.identification.customerType,
      uid: vqfData.identification.uid,
      address: vqfData.identification.address,
      postalCode: vqfData.identification.postalCode,
      city: vqfData.identification.city,
      country: vqfData.identification.country,
      establishmentDate: vqfData.identification.establishmentDate,
      purpose: vqfData.identification.purpose,
      isListed: vqfData.identification.isListed,
      exchangeName: vqfData.identification.exchangeName,
      ownerName: vqfData.identification.ownerName,
      ownerDob: vqfData.identification.ownerDob,
      ownerNationality: vqfData.identification.ownerNationality,
      ownerAddress: vqfData.identification.ownerAddress,

      // Risk profile fields
      foreignPEP: vqfData.riskProfile.foreignPEP ? 'Yes' : 'No',
      domesticPEP: vqfData.riskProfile.domesticPEP ? 'Yes' : 'No',
      highRiskCountry: vqfData.riskProfile.highRiskCountry ? 'Yes' : 'No',
      seniorExecutiveDecision: vqfData.riskProfile.seniorExecutiveDecision,
      decisionDate: vqfData.riskProfile.decisionDate,

      // Customer profile fields
      businessActivity: vqfData.customerProfile.businessActivity,
      industry: vqfData.customerProfile.industry,
      expectedTransactions: vqfData.customerProfile.expectedTransactions,
      expectedVolume: vqfData.customerProfile.expectedVolume,
      sourceOfFunds: vqfData.customerProfile.sourceOfFunds,
      riskLevel: vqfData.customerProfile.riskLevel,

      // Arrays for loops in templates
      establishingPersons: vqfData.formA.establishingPersons,
      controllingPersons: vqfData.formA.controllingPersons,
      beneficialOwners: vqfData.formA.beneficialOwners,

      // Metadata
      submissionDate: vqfData.metadata.submissionDate,
      vqfMemberNumber: vqfData.metadata.vqfMemberNumber,
      amlaFileNumber: vqfData.metadata.amlaFileNumber,
      completedBy: vqfData.metadata.completedBy,
      language: vqfData.metadata.language
    };
  }

  public static validateVQFData(vqfData: VQFMappingData): string[] {
    const errors: string[] = [];

    // Required fields validation
    if (!vqfData.identification.customerName) {
      errors.push('Customer name is required');
    }

    if (!vqfData.identification.address) {
      errors.push('Customer address is required');
    }

    if (!vqfData.identification.establishmentDate) {
      errors.push('Establishment date is required');
    }

    if (vqfData.formA.establishingPersons.length === 0) {
      errors.push('At least one establishing person is required');
    }

    // Business logic validation
    if (vqfData.riskProfile.foreignPEP && !vqfData.riskProfile.seniorExecutiveDecision) {
      errors.push('Senior executive decision is required for foreign PEP relationships');
    }

    if (vqfData.riskProfile.highRiskCountry && !vqfData.riskProfile.seniorExecutiveDecision) {
      errors.push('Senior executive decision is required for high-risk country relationships');
    }

    return errors;
  }
} 