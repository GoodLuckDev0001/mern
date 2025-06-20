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
      <h2 className="text-xl font-semibold mb-4" data-i18n="step1_title">1. Client Type</h2>
      <div className="grid gap-4">
        <label className="flex items-center space-x-3">
          <input
            type="radio"
            name="client_type"
            value="swiss_llc"
            onChange={() => {
              dispatch(setClientType('swiss_llc'));
            }}
            checked={clientType === 'swiss_llc'}
            required
            className="accent-blue-600" />
          <span data-i18n="swiss_llc">{t('swiss_llc')}</span>
        </label>
        <label className="flex items-center space-x-3">
          <input
            type="radio"
            name="client_type"
            value="swiss_sole"
            onChange={() => {
              dispatch(setClientType('swiss_sole'));
            }}
            checked={clientType === 'swiss_sole'}
            className="accent-blue-600" />
          <span data-i18n="swiss_sole">{t('swiss_sole')}</span>
        </label>
        <label className="flex items-center space-x-3">
          <input
            type="radio"
            name="client_type"
            value="swiss_assoc"
            onChange={() => {
              dispatch(setClientType('swiss_assoc'));
            }}
            checked={clientType === 'swiss_assoc'}
            className="accent-blue-600" />
          <span data-i18n="swiss_assoc">{t('swiss_assoc')}</span>
        </label>
        <label className="flex items-center space-x-3">
          <input
            type="radio"
            name="client_type"
            value="foreign_llc"
            onChange={() => {
              dispatch(setClientType('foreign_llc'));
            }}
            checked={clientType === 'foreign_llc'}
            className="accent-blue-600" />
          <span data-i18n="foreign_llc">{t('foreign_llc')}</span>
        </label>
        <label className="flex items-center space-x-3">
          <input
            type="radio"
            name="client_type"
            value="foreign_sole"
            onChange={() => {
              dispatch(setClientType('foreign_sole'));
            }}
            checked={clientType === 'foreign_sole'}
            className="accent-blue-600" />
          <span data-i18n="foreign_sole">{t('foreign_sole')}</span>
        </label>
      </div>
    </section>
  )
}