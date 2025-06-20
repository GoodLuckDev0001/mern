import React, { useRef } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import type { EstablishingPerson } from '../../store/slices/formSlice';
interface Props {
  person: EstablishingPerson;
  onChange: (id: string, field: string, value: string) => void;
  onDelete: () => void;
}

export const Step4EstablishPersonItem: React.FC<Props> = ({
  person,
  onChange,
  onDelete,
}) => {
  // For file input refs
  const idDocRef = useRef<HTMLInputElement>(null);
  const poaRef = useRef<HTMLInputElement>(null);
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

      <div className="mb-3">
        <label className="block font-medium mb-1">{t('upload_id')}</label>
        <label className="flex items-center space-x-2 cursor-pointer">
          <span className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
            {t('choose_file')}
          </span>
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg"
            className="hidden"
            ref={idDocRef}
            onChange={e => onChange(person.id, 'iddoc', e.target.files?.[0]?.name || '')}
          />
          <span className="text-gray-700 truncate max-w-xs">
            {person.iddoc ? person.iddoc.name : 'No file chosen'}
          </span>
        </label>
      </div>

      <div>
        <label className="block font-medium mb-1">{t('upload_poa')}</label>
        <label className="flex items-center space-x-2 cursor-pointer">
          <span className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
            {t('choose_file')}
          </span>
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg"
            className="hidden"
            ref={poaRef}
            onChange={e => onChange(person.id, 'poa', e.target.files?.[0]?.name || '')}
          />
          <span className="text-gray-700 truncate max-w-xs">
            {person.poa ? person.poa.name : 'No file chosen'}
          </span>
        </label>
      </div>
    </div>
  );
};