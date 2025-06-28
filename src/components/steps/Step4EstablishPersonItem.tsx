import React, { useRef } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import type { EstablishingPerson } from '../../store/slices/formSlice';
import { FileUpload } from '../FileUpload';

interface Props {
  person: EstablishingPerson;
  onChange: (id: string, field: string, value: string | File | null) => void;
  onDelete: () => void;
}

export const Step4EstablishPersonItem: React.FC<Props> = ({
  person,
  onChange,
  onDelete,
}) => {
  const { t } = useTranslation();

  return (
    <div className="bg-white border rounded-xl p-4 mb-4 shadow-sm relative">
      <button
        type="button"
        onClick={onDelete}
        className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-lg"
        aria-label="Remove"
      >
        ×
      </button>

      <div className="mb-3">
        <label className="block font-medium mb-1">{t('person_full_name')}</label>
        <input
          type="text"
          value={person.name}
          onChange={e => onChange(person.id, 'name', e.target.value)}
          required
          className={`w-full border px-3 py-2 rounded`}
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-3">
        <div>
          <label className="block font-medium mb-1">{t('person_street')}</label>
          <input
            type="text"
            value={person.address}
            onChange={e => onChange(person.id, 'address', e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">{t('person_postal_code')}</label>
          <input
            type="text"
            value={person.postal}
            onChange={e => onChange(person.id, 'postal', e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-3">
        <div>
          <label className="block font-medium mb-1">{t('person_city')}</label>
          <input
            type="text"
            value={person.city}
            onChange={e => onChange(person.id, 'city', e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">{t('person_country')}</label>
          <input
            type="text"
            value={person.country}
            onChange={e => onChange(person.id, 'country', e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
      </div>

      <div className="mb-3">
        <label className="block font-medium mb-1">{t('person_dob')}</label>
        <input
          type="date"
          value={person.dob}
          onChange={e => onChange(person.id, 'dob', e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div className="mb-3">
        <label className="block font-medium mb-1">{t('person_nationality')}</label>
        <input
          type="text"
          value={person.nationality}
          onChange={e => onChange(person.id, 'nationality', e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div className="mb-3">
        <label className="block font-medium mb-1">{t('authorization')}</label>
        <select
          value={person.toa}
          onChange={e => onChange(person.id, 'toa', e.target.value)}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="">-- Select --</option>
          <option value="individual">Individual Signatory</option>
          <option value="collective">Collective Signatory</option>
          <option value="poa">Power of Attorney</option>
          <option value="other">Other</option>
        </select>
      </div>

      <FileUpload
        label="Identification Document *"
        required={true}
        accept=".pdf,.jpg,.jpeg,.png"
        maxSize={10 * 1024 * 1024}
        onFileSelect={(file) => onChange(person.id, 'iddoc', file)}
        currentFile={person.iddoc}
        helpText="Upload identification document (passport/ID card). Both sides must be uploaded. Acceptable formats: PDF, JPG, PNG (max 10MB)."
      />

      <FileUpload
        label="Power of Attorney Documentation"
        required={false}
        accept=".pdf,.jpg,.jpeg,.png"
        maxSize={10 * 1024 * 1024}
        onFileSelect={(file) => onChange(person.id, 'poa', file)}
        currentFile={person.poa}
        helpText="Upload power of attorney documentation (if applicable). Acceptable formats: PDF, JPG, PNG (max 10MB)."
      />
    </div>
  );
};