// Comprehensive validation utilities for the Centi onboarding form

// Email validation using appropriate regex
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

// Swiss phone format validation
export const validateSwissPhone = (phone: string): boolean => {
  // Swiss phone numbers: +41 XX XXX XX XX or 0XX XXX XX XX
  const swissPhoneRegex = /^(\+41|0)[1-9]\d{8}$/;
  return swissPhoneRegex.test(phone.replace(/\s/g, ''));
};

// Swiss postal code validation
export const validateSwissPostalCode = (postalCode: string): boolean => {
  // Swiss postal codes: 4 digits (1000-9999)
  const swissPostalRegex = /^[1-9]\d{3}$/;
  return swissPostalRegex.test(postalCode);
};

// Date format validation
export const validateDate = (date: string): boolean => {
  if (!date) return false;
  
  const dateObj = new Date(date);
  const today = new Date();
  
  // Check if it's a valid date
  if (isNaN(dateObj.getTime())) return false;
  
  // Check if date is not in the future (for birth dates)
  if (dateObj > today) return false;
  
  // Check if date is not too far in the past (reasonable birth date)
  const minDate = new Date();
  minDate.setFullYear(today.getFullYear() - 120); // 120 years ago
  if (dateObj < minDate) return false;
  
  return true;
};

// Enhanced UID number validation (Swiss Commercial Registry Number)
export const validateUID = (uid: string): boolean => {
  if (!uid) return true; // UID is optional for some entity types
  
  // Swiss UID format: CHE-XXX.XXX.XXX (where X are digits)
  const uidRegex = /^CHE-\d{3}\.\d{3}\.\d{3}$/;
  return uidRegex.test(uid);
};

// Required field validation
export const validateRequired = (value: string | undefined | null): boolean => {
  return Boolean(value && value.trim().length > 0);
};

// Minimum length validation
export const validateMinimumLength = (value: string | undefined | null, minLength: number): boolean => {
  return Boolean(value && value.trim().length >= minLength);
};

// Maximum length validation
export const validateMaximumLength = (value: string | undefined | null, maxLength: number): boolean => {
  return Boolean(value && value.trim().length <= maxLength);
};

// Number validation
export const validateNumber = (value: string | number): boolean => {
  if (typeof value === 'number') return !isNaN(value) && isFinite(value);
  return !isNaN(Number(value)) && isFinite(Number(value));
};

// Positive number validation
export const validatePositiveNumber = (value: string | number): boolean => {
  const num = typeof value === 'number' ? value : Number(value);
  return !isNaN(num) && isFinite(num) && num > 0;
};

// Enhanced file validation for compliance requirements
export const validateFile = (file: File | null, maxSize: number = 10 * 1024 * 1024): string | null => {
  if (!file) return null; // File is optional unless required
  
  // Check file size (default 10MB)
  if (file.size > maxSize) {
    return `File size must be less than ${Math.round(maxSize / (1024 * 1024))}MB`;
  }
  
  // Check file type
  const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
  if (!allowedTypes.includes(file.type)) {
    return 'Only PDF, JPG, and PNG files are allowed';
  }
  
  return null;
};

// Enhanced commercial register extract validation
export const validateCommercialRegisterExtract = (file: File | null): string | null => {
  const basicValidation = validateFile(file);
  if (basicValidation) return basicValidation;
  
  if (!file) return 'Commercial register extract is required';
  
  // Additional validation for commercial register extracts
  // Note: In a real implementation, you might want to check the content
  // or metadata of the PDF to verify it's actually a commercial register extract
  
  return null;
};

// Enhanced articles of association validation
export const validateArticlesOfAssociation = (file: File | null): string | null => {
  const basicValidation = validateFile(file);
  if (basicValidation) return basicValidation;
  
  if (!file) return 'Articles of association are required';
  
  return null;
};

// Enhanced ID document validation
export const validateIDDocument = (file: File | null): string | null => {
  const basicValidation = validateFile(file);
  if (basicValidation) return basicValidation;
  
  if (!file) return 'ID document is required';
  
  // Additional validation for ID documents
  // Note: In a real implementation, you might want to check image quality
  // or verify that both sides are uploaded
  
  return null;
};

// Enhanced industry validation
export const validateIndustry = (industry: string): string | null => {
  if (!validateRequired(industry)) return 'Industry/Sector is required';
  
  const allowedIndustries = [
    'payment_service_provider',
    'commercial_acquirer', 
    'event_organizer',
    'media_house',
    'online_publisher',
    'other'
  ];
  
  if (!allowedIndustries.includes(industry)) {
    return 'Please select a valid industry from the list';
  }
  
  return null;
};

// Enhanced comprehensive form validation
export const validateFormField = (fieldName: string, value: any, additionalData?: any): string | null => {
  switch (fieldName) {
    case 'email':
      if (!validateRequired(value)) return 'Email is required';
      if (!validateEmail(value)) return 'Please enter a valid email address';
      break;
      
    case 'phone':
      if (value && !validateSwissPhone(value)) {
        return 'Please enter a valid Swiss phone number (e.g., +41 44 123 45 67 or 044 123 45 67)';
      }
      break;
      
    case 'postal':
      if (!validateRequired(value)) return 'Postal code is required';
      if (!validateSwissPostalCode(value)) {
        return 'Please enter a valid Swiss postal code (4 digits, 1000-9999)';
      }
      break;
      
    case 'canton':
      if (!validateRequired(value)) return 'Canton is required';
      if (!validateSwissCanton(value)) return 'Please select a valid Swiss canton';
      break;
      
    case 'uid':
      if (value && !validateUID(value)) {
        return 'Please enter a valid UID number (format: CHE-XXX.XXX.XXX)';
      }
      break;
      
    case 'industry':
      return validateIndustry(value);
      
    case 'dob':
    case 'ownerDob':
    case 'incorporationDate':
    case 'establishmentDate':
      if (!validateRequired(value)) return 'Date is required';
      if (!validateDate(value)) return 'Please enter a valid date';
      break;
      
    case 'monthlyVolume':
      if (!validateRequired(value)) return 'Monthly volume is required';
      if (!validatePositiveNumber(value)) return 'Please enter a valid positive number';
      if (!validateBusinessVolume(Number(value))) {
        return 'Monthly volume must be between 0 and 1,000,000,000 CHF';
      }
      break;
      
    case 'nationality':
      if (!validateRequired(value)) return 'Nationality is required';
      if (!validateNationality(value)) return 'Please enter a valid nationality';
      break;
      
    case 'name':
    case 'companyName':
    case 'ownerName':
      if (!validateRequired(value)) return 'Name is required';
      if (!validateMinimumLength(value, 2)) return 'Name must be at least 2 characters long';
      if (!validateMaximumLength(value, 100)) return 'Name must be less than 100 characters';
      break;
      
    case 'address':
      if (!validateRequired(value)) return 'Address is required';
      if (!validateMinimumLength(value, 5)) return 'Address must be at least 5 characters long';
      break;
      
    case 'registerFile':
      return validateCommercialRegisterExtract(value);
      
    case 'articlesFile':
      return validateArticlesOfAssociation(value);
      
    case 'iddoc':
      return validateIDDocument(value);
      
    case 'purpose':
      if (!validateRequired(value)) return 'Company purpose is required';
      if (!validateMinimumLength(value, 10)) return 'Company purpose must be at least 10 characters long';
      break;
      
    case 'isListed':
      if (!validateRequired(value)) return 'Please indicate if the company is listed';
      if (!['yes', 'no'].includes(value)) return 'Please select Yes or No';
      break;
      
    case 'exchangeName':
      if (additionalData?.isListed === 'yes' && !validateRequired(value)) {
        return 'Exchange name is required when company is listed';
      }
      break;
      
    default:
      // For any other field, just check if it's required
      if (additionalData?.required && !validateRequired(value)) {
        return 'This field is required';
      }
      break;
  }
  
  return null;
};

// Validate entire form data
export const validateFormData = (formData: any): Record<string, string> => {
  const errors: Record<string, string> = {};
  
  // Company information validation
  if (formData.companyInfo) {
    const companyFields = ['name', 'address', 'postal', 'city', 'canton', 'email', 'industry'];
    companyFields.forEach(field => {
      const error = validateFormField(field, formData.companyInfo[field]);
      if (error) errors[`companyInfo.${field}`] = error;
    });
  }
  
  // Entity information validation
  if (formData.entityInfo && ['swiss_llc', 'swiss_assoc', 'foreign_llc'].includes(formData.clientType)) {
    const entityFields = ['uid', 'incorporationDate', 'purpose'];
    entityFields.forEach(field => {
      const error = validateFormField(field, formData.entityInfo[field]);
      if (error) errors[`entityInfo.${field}`] = error;
    });
  }
  
  // Sole proprietor information validation
  if (formData.soleProprietorInfo && ['swiss_sole', 'foreign_sole'].includes(formData.clientType)) {
    const soleFields = ['ownerName', 'ownerDob', 'ownerNationality', 'ownerAddress'];
    soleFields.forEach(field => {
      const error = validateFormField(field, formData.soleProprietorInfo[field]);
      if (error) errors[`soleProprietorInfo.${field}`] = error;
    });
  }
  
  // Establishing persons validation
  const establishingError = validateFormField('establishingPersons', formData.establishingPersons);
  if (establishingError) errors.establishingPersons = establishingError;
  
  // Beneficial owners validation
  const beneficialError = validateFormField('beneficialOwners', formData.beneficialInfo?.beneficialOwners, {
    isSoleOwner: formData.beneficialInfo?.isSoleOwner
  });
  if (beneficialError) errors.beneficialOwners = beneficialError;
  
  // Business activity validation
  if (formData.businessActivity) {
    const businessFields = ['professionActivity', 'businessDescription', 'targetClients', 'mainCountries'];
    businessFields.forEach(field => {
      const error = validateFormField(field, formData.businessActivity[field]);
      if (error) errors[`businessActivity.${field}`] = error;
    });
  }
  
  // Financial information validation
  if (formData.financialInfo) {
    const financialFields = ['annualRevenue', 'totalAssets'];
    financialFields.forEach(field => {
      const error = validateFormField(field, formData.financialInfo[field]);
      if (error) errors[`financialInfo.${field}`] = error;
    });
  }
  
  // Transaction information validation
  if (formData.transactionInfo) {
    const transactionError = validateFormField('monthlyVolume', formData.transactionInfo.monthlyVolume);
    if (transactionError) errors[`transactionInfo.monthlyVolume`] = transactionError;
  }
  
  // Terms validation
  const termsError = validateFormField('termsInfo', formData.termsInfo);
  if (termsError) errors.termsInfo = termsError;
  
  // Verification method validation
  if (formData.verificationInfo) {
    const verificationError = validateFormField('verificationMethod', formData.verificationInfo.verificationMethod);
    if (verificationError) errors[`verificationInfo.verificationMethod`] = verificationError;
    
    const videoDateError = validateFormField('videoDate', formData.verificationInfo.videoDate, {
      verificationMethod: formData.verificationInfo.verificationMethod
    });
    if (videoDateError) errors[`verificationInfo.videoDate`] = videoDateError;
  }
  
  return errors;
};

// Format validation error messages
export const formatValidationError = (fieldName: string, error: string): string => {
  const fieldLabels: Record<string, string> = {
    'companyInfo.name': 'Company Name',
    'companyInfo.address': 'Company Address',
    'companyInfo.postal': 'Postal Code',
    'companyInfo.city': 'City',
    'companyInfo.canton': 'Canton',
    'companyInfo.email': 'Email',
    'companyInfo.industry': 'Industry',
    'entityInfo.uid': 'UID Number',
    'entityInfo.incorporationDate': 'Incorporation Date',
    'entityInfo.purpose': 'Company Purpose',
    'soleProprietorInfo.ownerName': 'Owner Name',
    'soleProprietorInfo.ownerDob': 'Owner Date of Birth',
    'soleProprietorInfo.ownerNationality': 'Owner Nationality',
    'soleProprietorInfo.ownerAddress': 'Owner Address',
    'establishingPersons': 'Establishing Persons',
    'beneficialOwners': 'Beneficial Owners',
    'businessActivity.professionActivity': 'Business Activities',
    'businessActivity.businessDescription': 'Business Description',
    'businessActivity.targetClients': 'Target Clients',
    'businessActivity.mainCountries': 'Main Countries',
    'financialInfo.annualRevenue': 'Annual Revenue',
    'financialInfo.totalAssets': 'Total Assets',
    'transactionInfo.monthlyVolume': 'Monthly Volume',
    'termsInfo': 'Terms and Conditions',
    'verificationInfo.verificationMethod': 'Verification Method',
    'verificationInfo.videoDate': 'Video Date'
  };
  
  const label = fieldLabels[fieldName] || fieldName;
  return `${label}: ${error}`;
};

// Enhanced Swiss canton validation
export const validateSwissCanton = (canton: string): boolean => {
  const swissCantons = [
    'AG', 'AI', 'AR', 'BE', 'BL', 'BS', 'FR', 'GE', 'GL', 'GR',
    'JU', 'LU', 'NE', 'NW', 'OW', 'SG', 'SH', 'SO', 'SZ', 'TG',
    'TI', 'UR', 'VD', 'VS', 'ZG', 'ZH'
  ];
  return swissCantons.includes(canton.toUpperCase());
};

// Nationality validation (basic check for common nationalities)
export const validateNationality = (nationality: string): boolean => {
  const commonNationalities = [
    'Swiss', 'German', 'French', 'Italian', 'Austrian', 'American', 'British',
    'Canadian', 'Australian', 'Chinese', 'Indian', 'Brazilian', 'Russian',
    'Japanese', 'Korean', 'Spanish', 'Portuguese', 'Dutch', 'Belgian',
    'Swedish', 'Norwegian', 'Danish', 'Finnish', 'Polish', 'Czech',
    'Hungarian', 'Slovak', 'Slovenian', 'Croatian', 'Serbian', 'Bulgarian',
    'Romanian', 'Greek', 'Turkish', 'Ukrainian', 'Belarusian', 'Moldovan',
    'Georgian', 'Armenian', 'Azerbaijani', 'Kazakh', 'Uzbek', 'Kyrgyz',
    'Tajik', 'Turkmen', 'Mongolian', 'Vietnamese', 'Thai', 'Malaysian',
    'Indonesian', 'Filipino', 'Pakistani', 'Bangladeshi', 'Sri Lankan',
    'Nepali', 'Bhutanese', 'Myanmar', 'Cambodian', 'Laotian', 'Bruneian',
    'Timorese', 'Papua New Guinean', 'Fijian', 'Vanuatuan', 'Solomon Islander',
    'Samoan', 'Tongan', 'Kiribati', 'Tuvaluan', 'Nauruan', 'Palauan',
    'Marshallese', 'Micronesian'
  ];
  return commonNationalities.some(nat => 
    nationality.toLowerCase().includes(nat.toLowerCase())
  ) || nationality.length >= 2;
};

export const validateBusinessVolume = (volume: number): boolean => {
  return volume >= 0 && volume <= 1000000000;
};
