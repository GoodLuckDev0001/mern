import React from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store';
import { setEntityInfoField, setSoleProprietorInfoField } from '../../store/slices/formSlice';

export const Step3Propreitor: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { clientType, entityInfo, soleProprietorInfo, validationErrors } = useSelector((state: RootState) => state.form);

  const getErrorClass = (fieldName: string) => {
    return validationErrors[fieldName] ? 'border-red-500' : '';
  };

  return (
    <section className="step" data-step="3">
      <h2 className="text-xl font-semibold mb-4" data-i18n="step3_title">3. Entity or Sole Proprietor Details</h2>
      {(clientType === 'foreign_llc' || clientType === 'swiss_llc' || clientType === 'swiss_assoc') && (
        <div id="entityFields" className="space-y-4">
          <label>
            <span data-i18n="uid">{t('uid')}</span>
            <input
              type="text"
              name="uid"
              required
              className={`w-full mt-1 border px-3 py-2 rounded ${getErrorClass('uid')}`}
              value={entityInfo.uid}
              onChange={(e) => dispatch(setEntityInfoField({ field: 'uid', value: e.target.value }))}
            />
            {validationErrors.uid && (
              <span className="text-red-500 text-sm mt-1">{validationErrors.uid}</span>
            )}
          </label>

          <label>
            <span data-i18n="incorporation_date">{t('incorporation_date')}</span>
            <input
              type="date"
              name="incorporation_date"
              required
              className={`w-full mt-1 border px-3 py-2 rounded ${getErrorClass('incorporationDate')}`}
              value={entityInfo.incorporationDate}
              onChange={(e) => dispatch(setEntityInfoField({ field: 'incorporationDate', value: e.target.value }))}
            />
            {validationErrors.incorporationDate && (
              <span className="text-red-500 text-sm mt-1">{validationErrors.incorporationDate}</span>
            )}
          </label>

          <label>
            <span data-i18n="purpose">{t('purpose')}</span>
            <textarea
              name="company_purpose"
              required
              className={`w-full mt-1 border px-3 py-2 rounded ${getErrorClass('purpose')}`}
              value={entityInfo.purpose}
              onChange={(e) => dispatch(setEntityInfoField({ field: 'purpose', value: e.target.value }))}
            />
            {validationErrors.purpose && (
              <span className="text-red-500 text-sm mt-1">{validationErrors.purpose}</span>
            )}
          </label>

          <label>
            <span data-i18n="upload_register">{t('upload_register')}</span>
            <input
              type="file"
              name="register_file"
              accept=".pdf"
              required
              className={`block mt-1 ${getErrorClass('registerFile')}`}
              onChange={(e) => dispatch(setEntityInfoField({ field: 'registerFile', value: e.target.files?.[0] || null }))}
            />
            {validationErrors.registerFile && (
              <span className="text-red-500 text-sm mt-1">{validationErrors.registerFile}</span>
            )}
          </label>

          <label>
            <span data-i18n="upload_articles">{t('upload_articles')}</span>
            <input
              type="file"
              name="articles_file"
              accept=".pdf"
              required
              className={`block mt-1 ${getErrorClass('articlesFile')}`}
              onChange={(e) => dispatch(setEntityInfoField({ field: 'articlesFile', value: e.target.files?.[0] || null }))}
            />
            {validationErrors.articlesFile && (
              <span className="text-red-500 text-sm mt-1">{validationErrors.articlesFile}</span>
            )}
          </label>

          <label>
            <span data-i18n="listed">{t('listed')}</span>
            <select
              name="is_listed"
              required
              className={`w-full mt-1 border px-3 py-2 rounded ${getErrorClass('isListed')}`}
              value={entityInfo.isListed}
              onChange={(e) => dispatch(setEntityInfoField({ field: 'isListed', value: e.target.value }))}
            >
              <option value="">-- Select --</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
            {validationErrors.isListed && (
              <span className="text-red-500 text-sm mt-1">{validationErrors.isListed}</span>
            )}
          </label>

          {entityInfo.isListed === 'yes' && (
            <label id="exchangeNameField">
              <span data-i18n="exchange_name">{t('exchange_name')}</span>
              <input
                type="text"
                name="exchange_name"
                required
                className={`w-full mt-1 border px-3 py-2 rounded ${getErrorClass('exchangeName')}`}
                value={entityInfo.exchangeName}
                onChange={(e) => dispatch(setEntityInfoField({ field: 'exchangeName', value: e.target.value }))}
              />
              {validationErrors.exchangeName && (
                <span className="text-red-500 text-sm mt-1">{validationErrors.exchangeName}</span>
              )}
            </label>
          )}
        </div>
      )}

      {(clientType === 'foreign_sole' || clientType === 'swiss_sole') && (
        <div id="soleFields" className="space-y-4">
          <label>
            <span data-i18n="uid">Commercial Registry Number (if registered)</span>
            <input
              type="text"
              name="uid_sole"
              className={`w-full mt-1 border px-3 py-2 rounded ${getErrorClass('uid')}`}
              value={soleProprietorInfo.uid}
              onChange={(e) => dispatch(setSoleProprietorInfoField({ field: 'uid', value: e.target.value }))}
            />
            {validationErrors.uid && (
              <span className="text-red-500 text-sm mt-1">{validationErrors.uid}</span>
            )}
          </label>

          <label>
            <span data-i18n="establishment_date">{t('establishment_date')}</span>
            <input
              type="date"
              name="establishment_date"
              required
              className={`w-full mt-1 border px-3 py-2 rounded ${getErrorClass('establishmentDate')}`}
              value={soleProprietorInfo.establishmentDate}
              onChange={(e) => dispatch(setSoleProprietorInfoField({ field: 'establishmentDate', value: e.target.value }))}
            />
            {validationErrors.establishmentDate && (
              <span className="text-red-500 text-sm mt-1">{validationErrors.establishmentDate}</span>
            )}
          </label>

          <label>
            <span data-i18n="owner_name">{t('owner_name')}</span>
            <input
              type="text"
              name="owner_name"
              required
              className={`w-full mt-1 border px-3 py-2 rounded ${getErrorClass('ownerName')}`}
              value={soleProprietorInfo.ownerName}
              onChange={(e) => dispatch(setSoleProprietorInfoField({ field: 'ownerName', value: e.target.value }))}
            />
            {validationErrors.ownerName && (
              <span className="text-red-500 text-sm mt-1">{validationErrors.ownerName}</span>
            )}
          </label>

          <label>
            <span data-i18n="owner_dob">{t('owner_dob')}</span>
            <input
              type="date"
              name="owner_dob"
              required
              className={`w-full mt-1 border px-3 py-2 rounded ${getErrorClass('ownerDob')}`}
              value={soleProprietorInfo.ownerDob}
              onChange={(e) => dispatch(setSoleProprietorInfoField({ field: 'ownerDob', value: e.target.value }))}
            />
            {validationErrors.ownerDob && (
              <span className="text-red-500 text-sm mt-1">{validationErrors.ownerDob}</span>
            )}
          </label>

          <label>
            <span data-i18n="owner_nationality">{t('owner_nationality')}</span>
            <input
              type="text"
              name="owner_nationality"
              required
              className={`w-full mt-1 border px-3 py-2 rounded ${getErrorClass('ownerNationality')}`}
              value={soleProprietorInfo.ownerNationality}
              onChange={(e) => dispatch(setSoleProprietorInfoField({ field: 'ownerNationality', value: e.target.value }))}
            />
            {validationErrors.ownerNationality && (
              <span className="text-red-500 text-sm mt-1">{validationErrors.ownerNationality}</span>
            )}
          </label>

          <label>
            <span data-i18n="owner_address">{t('owner_address')}</span>
            <input
              type="text"
              name="owner_address"
              required
              className={`w-full mt-1 border px-3 py-2 rounded ${getErrorClass('ownerAddress')}`}
              value={soleProprietorInfo.ownerAddress}
              onChange={(e) => dispatch(setSoleProprietorInfoField({ field: 'ownerAddress', value: e.target.value }))}
            />
            {validationErrors.ownerAddress && (
              <span className="text-red-500 text-sm mt-1">{validationErrors.ownerAddress}</span>
            )}
          </label>
        </div>
      )}
    </section>
  );
};