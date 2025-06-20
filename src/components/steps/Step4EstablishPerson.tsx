import React from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store';
import { addEstablishingPerson, deleteEstablishingPerson, updateEstablishingPerson } from '../../store/slices/formSlice';
import { v4 as uuidv4 } from 'uuid';
import { Step4EstablishPersonItem } from './Step4EstablishPersonItem';

export const Step4EstablishPerson: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { establishingPersons } = useSelector((state: RootState) => state.form);

  const addPerson = () => {
    dispatch(addEstablishingPerson({
      id: uuidv4(),
      name: '',
      dob: '',
      nationality: '',
      address: '',
      toa: '',
      iddoc: null,
      poa: null,
      postal: '',
      city: '',
      country: ''
    }));
  };

  const changePerson = (id: string, field: string, value: string) => {
    dispatch(updateEstablishingPerson({ index: id, person: { [field]: value } }));
  };

  const deletePerson = (id: string) => {
    dispatch(deleteEstablishingPerson(id));
  };

  return (
    <section className="step" data-step="4">
      <h2 className="text-xl font-semibold mb-4" data-i18n="step4_title">
        4. Business Relationship Establishing Persons
      </h2>

      <div className="space-y-6">
        {establishingPersons.map((person) => (
          <Step4EstablishPersonItem
            key={person.id}
            person={person}
            onChange={changePerson}
            onDelete={() => deletePerson(person.id)} />
        ))}
      </div>

      <button
        onClick={addPerson}
        className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {t('add_person')}
      </button>
    </section >
  )
}