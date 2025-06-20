import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store';
import { Step1ClientType } from './steps/Step1ClientType';
import { Step2GeneralInformation } from './steps/Step2GeneralInfo';
import { Step3Propreitor } from './steps/Step3Propreitor';
import { setCurrentStep, setValidationError, clearValidationErrors } from '../store/slices/formSlice';
import { Step4EstablishPerson } from './steps/Step4EstablishPerson';
import { Step5Controlling } from './steps/Step5Controlling';
import { Step6Benifical } from './steps/Step6Benifical';
import { Step7BusinessActivity } from './steps/Step7BusinessActivity';
import { Step8Finalcial } from './steps/Step8Finalcial';
import { Step9Transaction } from './steps/Step9Transaction';
import { Step10Sanctions } from './steps/Step10Sanctions';
import { Step11Terms } from './steps/Step11Terms';
import { Step12Verification } from './steps/Step12Verification';
import { Step13Additional } from './steps/Step13Additional';
import { Step14Review } from './steps/Step14Review';

export const Steps: React.FC = () => {
  const dispatch = useDispatch();
  const { currentStep, companyInfo, entityInfo, soleProprietorInfo, clientType, establishingPersons, finishFlag } = useSelector((state: RootState) => state.form);

  const validateStep2 = () => {
    const requiredFields = ['name', 'address', 'postal', 'city', 'canton', 'email', 'industry'];
    let isValid = true;

    requiredFields.forEach(field => {
      if (!companyInfo[field as keyof typeof companyInfo]?.trim()) {
        dispatch(setValidationError({
          field,
          error: 'This field is required'
        }));
        isValid = false;
      }
    });

    return isValid;
  };

  const validateStep3 = () => {
    let isValid = true;

    if (clientType === 'foreign_llc' || clientType === 'swiss_llc' || clientType === 'swiss_assoc') {
      const requiredFields = ['uid', 'incorporationDate', 'purpose', 'isListed'];
      requiredFields.forEach(field => {
        if (!entityInfo[field as keyof typeof entityInfo]?.toString().trim()) {
          dispatch(setValidationError({
            field,
            error: 'This field is required'
          }));
          isValid = false;
        }
      });

      if (!entityInfo.registerFile) {
        dispatch(setValidationError({
          field: 'registerFile',
          error: 'Please upload the register file'
        }));
        isValid = false;
      }

      if (!entityInfo.articlesFile) {
        dispatch(setValidationError({
          field: 'articlesFile',
          error: 'Please upload the articles file'
        }));
        isValid = false;
      }

      if (entityInfo.isListed === 'yes' && !entityInfo.exchangeName?.trim()) {
        dispatch(setValidationError({
          field: 'exchangeName',
          error: 'Exchange name is required when listed'
        }));
        isValid = false;
      }
    } else if (clientType === 'foreign_sole' || clientType === 'swiss_sole') {
      const requiredFields = ['establishmentDate', 'ownerName', 'ownerDob', 'ownerNationality', 'ownerAddress'];
      requiredFields.forEach(field => {
        if (!soleProprietorInfo[field as keyof typeof soleProprietorInfo]?.trim()) {
          dispatch(setValidationError({
            field,
            error: 'This field is required'
          }));
          isValid = false;
        }
      });
    }
    return isValid;
  };

  const validateStep4 = () => {
    let isValid = true;

    if (!establishingPersons.length) {
      dispatch(setValidationError({
        field: 'establishingPersons',
        error: 'Please add at least one person'
      }));
      isValid = false;
    }

    return isValid;
  };

  const validateStep5 = () => {
    return true;
  };

  const handleNext = () => {
    if (!finishFlag) {
      dispatch(clearValidationErrors());

      let canProceed = true;
      if (currentStep === 2) {
        canProceed = validateStep2();
      } else if (currentStep === 3) {
        canProceed = validateStep3();
      } else if (currentStep === 4) {
        canProceed = validateStep4();
      } else if (currentStep === 5) {
        canProceed = validateStep5();
      }

      if (canProceed) {
        dispatch(setCurrentStep(currentStep + 1));
      } else {
      }
    } else {
      dispatch(setCurrentStep(14));
    }
  };

  return (
    <>
      <form id="onboardingForm" className="space-y-8">
        {currentStep === 1 && <Step1ClientType />}
        {currentStep === 2 && <Step2GeneralInformation />}
        {currentStep === 3 && <Step3Propreitor />}
        {currentStep === 4 && <Step4EstablishPerson />}
        {currentStep === 5 && <Step5Controlling />}
        {currentStep === 6 && <Step6Benifical />}
        {currentStep === 7 && <Step7BusinessActivity />}
        {currentStep === 8 && <Step8Finalcial />}
        {currentStep === 9 && <Step9Transaction />}
        {currentStep === 10 && <Step10Sanctions />}
        {currentStep === 11 && <Step11Terms />}
        {currentStep === 12 && <Step12Verification />}
        {currentStep === 13 && <Step13Additional />}
        {currentStep === 14 && <Step14Review />}

        <div className="flex justify-between pt-4 border-t border-gray-200">
          <button
            type="button"
            id="prevBtn"
            onClick={() => {
              dispatch(setCurrentStep(currentStep - 1));
            }}
            style={{
              cursor: 'pointer'
            }}
            className={currentStep > 1 ? "bg-gray-300 px-4 py-2 rounded" : "bg-gray-300 px-4 py-2 rounded hidden"}
          >
            Back
          </button>
          <button
            type="button"
            id="nextBtn"
            onClick={handleNext}
            style={{
              cursor: 'pointer'
            }}
            className={currentStep !== 14 ? "bg-green-600 text-white px-4 py-2 rounded" : "hidden bg-blue-600 text-white px-4 py-2 rounded"}
          >
            {finishFlag ? 'Back to Review' : 'Next'}
          </button>
        </div>
      </form>
    </>
  );
};