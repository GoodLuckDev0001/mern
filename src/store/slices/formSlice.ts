import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { clientType } from '../../types/index';
import { v4 as uuidv4 } from 'uuid';

export interface CompanyInfo {
  name: string;
  address: string;
  postal: string;
  city: string;
  canton: string;
  phone: string;
  email: string;
  industry: string;
}

export interface EntityInfo {
  uid: string;
  incorporationDate: string;
  purpose: string;
  registerFile: File | null;
  articlesFile: File | null;
  isListed: string;
  exchangeName: string;
}

export interface SoleProprietorInfo {
  uid: string;
  establishmentDate: string;
  ownerName: string;
  ownerDob: string;
  ownerNationality: string;
  ownerAddress: string;
}

export interface ValidationErrors {
  [key: string]: string | null;
}

export interface EstablishingPerson {
  id: string;
  name: string;
  dob: string;
  postal: string;
  city: string;
  country: string;
  nationality: string;
  address: string;
  toa: string;
  iddoc: File | null;
  poa: File | null;
}

export interface ControllingPerson {
  id: string;
  lastName: string;
  firstName: string;
  dob: string;
  nationality: string;
  address: string;
  postal: string;
  city: string;
  country: string;
}

export interface ManagingDirector {
  id: string;
  lastName: string;
  firstName: string;
  dob: string;
  nationality: string;
  address: string;
}

export interface ControllingInfo {
  is25Percent: boolean;
  controllingPersons: ControllingPerson[];
  inOtherWay: boolean;
  managingDirector: ManagingDirector;
}

export interface BeneficialOwner {
  id: string;
  lastName: string;
  firstName: string;
  dob: string;
  nationality: string;
  address: string;
  relationship: string;
}

export interface BeneficialInfo {
  isSoleOwner: boolean;
  beneficialOwners: BeneficialOwner[];
}

export interface BusinessActivity {
  professionActivity: string;
  businessDescription: string;
  targetClients: string;
  mainCountries: string[];
}

export interface FinancialInfo {
  annualRevenue: string;
  totalAssets: string;
  liabilities: string;
}

export interface TransactionInfo {
  assetNature: string;
  assetOrigin: string;
  assetCategory: string;
  monthlyVolume: number;
  isOtherCategory: boolean;
  businessPurposes: string[];
}

export interface SanctionsInfo {
  isPep: boolean;
  pepName: string;
  pepPosition: string;
  pepCountry: string;
  pepPeriod: string;
  isSanctions: boolean;
  sanctionsName: string;
  sanctionsCountry: string;
  sanctionsNature: string;
}

export interface TermsInfo {
  agreePrivacy: boolean;
  agreeTerms: boolean;
  confirmTruth: boolean;
}

export interface VerificationInfo {
  verificationMethod: string;
  videoDate: string;
}

export interface AdditionalInfo {
  financialStatements: File | null;
  businessPlan: File | null;
  licensesPermits: File | null;
  supportingDocuments: File | null;
}

interface FormState {
  currentStep: number;
  finishFlag: boolean;
  clientType: clientType;
  companyInfo: CompanyInfo;
  entityInfo: EntityInfo;
  soleProprietorInfo: SoleProprietorInfo;
  validationErrors: ValidationErrors;
  establishingPersons: EstablishingPerson[];
  controllingInfo: ControllingInfo;
  beneficialInfo: BeneficialInfo;
  businessActivity: BusinessActivity;
  financialInfo: FinancialInfo;
  transactionInfo: TransactionInfo;
  sanctionsInfo: SanctionsInfo;
  termsInfo: TermsInfo;
  verificationInfo: VerificationInfo;
  additionalInfo: AdditionalInfo;
}

const initialState: FormState = {
  currentStep: 1,
  finishFlag: false,
  clientType: 'swiss_llc',
  companyInfo: {
    name: '',
    address: '',
    postal: '',
    city: '',
    canton: '',
    phone: '',
    email: '',
    industry: '',
  },
  entityInfo: {
    uid: '',
    incorporationDate: '',
    purpose: '',
    registerFile: null,
    articlesFile: null,
    isListed: '',
    exchangeName: '',
  },
  soleProprietorInfo: {
    uid: '',
    establishmentDate: '',
    ownerName: '',
    ownerDob: '',
    ownerNationality: '',
    ownerAddress: '',
  },
  establishingPersons: [],
  validationErrors: {},
  controllingInfo: {
    is25Percent: false,
    controllingPersons: [],
    inOtherWay: false,
    managingDirector: {
      id: '',
      lastName: '',
      firstName: '',
      dob: '',
      nationality: '',
      address: '',
    },
  },
  beneficialInfo: {
    isSoleOwner: false,
    beneficialOwners: [],
  },
  businessActivity: {
    professionActivity: '',
    businessDescription: '',
    targetClients: '',
    mainCountries: [],
  },
  financialInfo: {
    annualRevenue: '',
    totalAssets: '',
    liabilities: '',
  },
  transactionInfo: {
    assetNature: '',
    assetOrigin: '',
    isOtherCategory: false,
    assetCategory: '',
    monthlyVolume: 0,
    businessPurposes: [],
  },
  sanctionsInfo: {
    isPep: false,
    pepName: '',
    pepPosition: '',
    pepCountry: '',
    pepPeriod: '',
    isSanctions: false,
    sanctionsName: '',
    sanctionsCountry: '',
    sanctionsNature: '',
  },
  termsInfo: {
    agreePrivacy: false,
    agreeTerms: false,
    confirmTruth: false,
  },
  verificationInfo: {
    verificationMethod: '',
    videoDate: '',
  },
  additionalInfo: {
    financialStatements: null,
    businessPlan: null,
    licensesPermits: null,
    supportingDocuments: null,
  },
}

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
      if (action.payload === 14) {
        state.finishFlag = true;
      }
    },
    setClientType: (state, action: PayloadAction<clientType>) => {
      state.clientType = action.payload;
    },
    setCompanyInfoField: (state, action: PayloadAction<{ field: keyof CompanyInfo, value: string }>) => {
      state.companyInfo[action.payload.field] = action.payload.value;
      // Clear validation error when field is updated
      if (state.validationErrors[action.payload.field]) {
        delete state.validationErrors[action.payload.field];
      }
    },
    setEntityInfoField: (state, action: PayloadAction<{ field: keyof EntityInfo, value: any }>) => {
      state.entityInfo[action.payload.field] = action.payload.value;
      if (state.validationErrors[action.payload.field]) {
        delete state.validationErrors[action.payload.field];
      }
    },
    setSoleProprietorInfoField: (state, action: PayloadAction<{ field: keyof SoleProprietorInfo, value: string }>) => {
      state.soleProprietorInfo[action.payload.field] = action.payload.value;
      if (state.validationErrors[action.payload.field]) {
        delete state.validationErrors[action.payload.field];
      }
    },
    setValidationError: (state, action: PayloadAction<{ field: string; error: string | null }>) => {
      state.validationErrors[action.payload.field] = action.payload.error;
    },
    clearValidationErrors: (state) => {
      state.validationErrors = {};
    },
    addEstablishingPerson: (state, action: PayloadAction<EstablishingPerson>) => {
      state.establishingPersons.push(action.payload);
    },
    updateEstablishingPerson: (state, action: PayloadAction<{ index: string, person: Partial<EstablishingPerson> }>) => {
      const index = state.establishingPersons.findIndex(person => person.id === action.payload.index);
      if (index !== -1) {
        state.establishingPersons[index] = {
          ...state.establishingPersons[index],
          ...action.payload.person
        };
      }
    },
    deleteEstablishingPerson: (state, action: PayloadAction<string>) => {
      state.establishingPersons = state.establishingPersons.filter(person => person.id !== action.payload);
    },
    setControllingInfoField: (state, action: PayloadAction<{ field: keyof ControllingInfo, value: any }>) => {
      state.controllingInfo[action.payload.field] = action.payload.value;
    },
    addControllingPerson: (state) => {
      state.controllingInfo.controllingPersons.push({
        id: uuidv4(),
        lastName: '',
        firstName: '',
        dob: '',
        nationality: '',
        address: '',
        postal: '',
        city: '',
        country: '',
      });
    },
    updateControllingPerson: (state, action: PayloadAction<{ index: string, person: Partial<ControllingPerson> }>) => {
      const index = state.controllingInfo.controllingPersons.findIndex(person => person.id === action.payload.index);
      if (index !== -1) {
        state.controllingInfo.controllingPersons[index] = {
          ...state.controllingInfo.controllingPersons[index],
          ...action.payload.person
        };
      }
    },
    deleteControllingPerson: (state, action: PayloadAction<string>) => {
      state.controllingInfo.controllingPersons = state.controllingInfo.controllingPersons.filter(person => person.id !== action.payload);
    },
    setManagingDirectorInfo: (state, action: PayloadAction<{ field: keyof ManagingDirector, value: any }>) => {
      state.controllingInfo.managingDirector[action.payload.field] = action.payload.value;
    },
    setBeneficialInfoField: (state, action: PayloadAction<{ field: keyof BeneficialInfo, value: any }>) => {
      state.beneficialInfo[action.payload.field] = action.payload.value;
    },
    addBeneficialOwner: (state) => {
      state.beneficialInfo.beneficialOwners.push({
        id: uuidv4(),
        lastName: '',
        firstName: '',
        dob: '',
        nationality: '',
        address: '',
        relationship: '',
      });
    },
    updateBeneficialOwner: (state, action: PayloadAction<{ index: string, owner: Partial<BeneficialOwner> }>) => {
      const index = state.beneficialInfo.beneficialOwners.findIndex(owner => owner.id === action.payload.index);
      if (index !== -1) {
        state.beneficialInfo.beneficialOwners[index] = {
          ...state.beneficialInfo.beneficialOwners[index],
          ...action.payload.owner
        };
      }
    },
    deleteBeneficialOwner: (state, action: PayloadAction<string>) => {
      state.beneficialInfo.beneficialOwners = state.beneficialInfo.beneficialOwners.filter(owner => owner.id !== action.payload);
    },
    setBusinessActivityField: (state, action: PayloadAction<{ field: keyof BusinessActivity, value: any }>) => {
      state.businessActivity[action.payload.field] = action.payload.value;
    },
    setFinancialInfoField: (state, action: PayloadAction<{ field: keyof FinancialInfo, value: any }>) => {
      state.financialInfo[action.payload.field] = action.payload.value;
    },
    setTransactionNature: (state, action: PayloadAction<string>) => {
      state.transactionInfo.assetNature = action.payload;
    },
    setTransactionOrigin: (state, action: PayloadAction<string>) => {
      state.transactionInfo.assetOrigin = action.payload;
    },
    setTransactionCategory: (state, action: PayloadAction<string>) => {
      state.transactionInfo.assetCategory = action.payload;
    },
    setTransactionMonthlyVolume: (state, action: PayloadAction<number>) => {
      state.transactionInfo.monthlyVolume = action.payload;
    },
    setTransactionMonthlyVolumeCurrency: (state, action: PayloadAction<string>) => {
      state.transactionInfo.businessPurposes.push(action.payload);
    },
    deleteTransactionMonthlyVolumeCurrency: (state, action: PayloadAction<string>) => {
      state.transactionInfo.businessPurposes = state.transactionInfo.businessPurposes.filter(
        (purpose) => purpose !== action.payload
      );
    },
    addBusinessPurpose: (state, action: PayloadAction<string>) => {
      state.transactionInfo.businessPurposes.push(action.payload);
    },
    removeBusinessPurpose: (state, action: PayloadAction<string>) => {
      state.transactionInfo.businessPurposes = state.transactionInfo.businessPurposes.filter(
        (purpose) => purpose !== action.payload
      );
    },
    setIsOtherCategory: (state, action: PayloadAction<boolean>) => {
      state.transactionInfo.isOtherCategory = action.payload;
    },
    setSanctionsInfoField: (state, action: PayloadAction<{ field: keyof SanctionsInfo, value: string | boolean }>) => {
      (state.sanctionsInfo[action.payload.field] as string | boolean) = action.payload.value;
    },
    setTermsInfoField: (state, action: PayloadAction<{ field: keyof TermsInfo, value: boolean }>) => {
      state.termsInfo[action.payload.field] = action.payload.value;
    },
    setVerificationInfoField: (state, action: PayloadAction<{ field: keyof VerificationInfo, value: string }>) => {
      state.verificationInfo[action.payload.field] = action.payload.value;
    },
    setAdditionalInfoField: (state, action: PayloadAction<{ field: keyof AdditionalInfo, value: File | null }>) => {
      state.additionalInfo[action.payload.field] = action.payload.value;
    },
    setFinishFlag: (state, action: PayloadAction<boolean>) => {
      state.finishFlag = action.payload;
    },
  },
});

export const {
  setCurrentStep,
  setClientType,
  setCompanyInfoField,
  setEntityInfoField,
  setSoleProprietorInfoField,
  setValidationError,
  clearValidationErrors,
  addEstablishingPerson,
  updateEstablishingPerson,
  deleteEstablishingPerson,
  setControllingInfoField,
  addControllingPerson,
  updateControllingPerson,
  deleteControllingPerson,
  setManagingDirectorInfo,
  setBeneficialInfoField,
  addBeneficialOwner,
  updateBeneficialOwner,
  deleteBeneficialOwner,
  setBusinessActivityField,
  setFinancialInfoField,
  setTransactionNature,
  setTransactionOrigin,
  setTransactionCategory,
  setTransactionMonthlyVolume,
  setTransactionMonthlyVolumeCurrency,
  deleteTransactionMonthlyVolumeCurrency,
  addBusinessPurpose,
  removeBusinessPurpose,
  setIsOtherCategory,
  setSanctionsInfoField,
  setTermsInfoField,
  setVerificationInfoField,
  setAdditionalInfoField,
  setFinishFlag,
} = formSlice.actions;
export default formSlice.reducer;