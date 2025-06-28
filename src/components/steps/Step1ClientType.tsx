import React from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { useDispatch, useSelector } from 'react-redux';
import { setClientType } from '../../store/slices/formSlice';
import type { RootState } from '../../store';

export const Step1ClientType: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { clientType } = useSelector((state: RootState) => state.form);
  
  return (
    <section className="step" data-step="1">
      <h2 className="text-xl font-semibold mb-6">1. Client Type Determination</h2>
      <p className="text-gray-600 mb-6">
        Please select the type of client that best describes your business structure. This information is required for Swiss AML/KYC compliance.
      </p>
      
      <div className="space-y-4">
        <label className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
          <input
            type="radio"
            name="client_type"
            value="swiss_llc"
            onChange={() => dispatch(setClientType('swiss_llc'))}
            checked={clientType === 'swiss_llc'}
            required
            className="mt-1 accent-blue-600" />
          <div className="flex-1">
            <span className="font-medium text-gray-900">Swiss non-publicly traded limited liability company (AG/GmbH)</span>
            <p className="text-sm text-gray-600 mt-1">Swiss registered company with limited liability</p>
          </div>
        </label>
        
        <label className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
          <input
            type="radio"
            name="client_type"
            value="swiss_sole"
            onChange={() => dispatch(setClientType('swiss_sole'))}
            checked={clientType === 'swiss_sole'}
            className="mt-1 accent-blue-600" />
          <div className="flex-1">
            <span className="font-medium text-gray-900">Swiss registered sole proprietorship or private individual</span>
            <p className="text-sm text-gray-600 mt-1">Individual business owner or private person in Switzerland</p>
          </div>
        </label>
        
        <label className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
          <input
            type="radio"
            name="client_type"
            value="swiss_assoc"
            onChange={() => dispatch(setClientType('swiss_assoc'))}
            checked={clientType === 'swiss_assoc'}
            className="mt-1 accent-blue-600" />
          <div className="flex-1">
            <span className="font-medium text-gray-900">Swiss Verein (Association)</span>
            <p className="text-sm text-gray-600 mt-1">Swiss registered association or non-profit organization</p>
          </div>
        </label>
        
        <label className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
          <input
            type="radio"
            name="client_type"
            value="foreign_llc"
            onChange={() => dispatch(setClientType('foreign_llc'))}
            checked={clientType === 'foreign_llc'}
            className="mt-1 accent-blue-600" />
          <div className="flex-1">
            <span className="font-medium text-gray-900">Foreign non-publicly traded limited liability company (Ltd./AG/GmbH)</span>
            <p className="text-sm text-gray-600 mt-1">Foreign registered company with limited liability</p>
          </div>
        </label>
        
        <label className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
          <input
            type="radio"
            name="client_type"
            value="foreign_sole"
            onChange={() => dispatch(setClientType('foreign_sole'))}
            checked={clientType === 'foreign_sole'}
            className="mt-1 accent-blue-600" />
          <div className="flex-1">
            <span className="font-medium text-gray-900">Foreign registered sole proprietorship or private individual</span>
            <p className="text-sm text-gray-600 mt-1">Individual business owner or private person outside Switzerland</p>
          </div>
        </label>
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="font-medium text-blue-900 mb-2">Important Information</h3>
        <p className="text-sm text-blue-800">
          The client type you select will determine which forms and documentation are required for your onboarding process. 
          This information is used to ensure compliance with Swiss Anti-Money Laundering (AML) regulations.
        </p>
      </div>
    </section>
  )
}