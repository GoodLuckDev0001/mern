import React from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store';
import { addControllingPerson, deleteControllingPerson, setControllingInfoField, setManagingDirectorInfo, updateControllingPerson } from '../../store/slices/formSlice';

export const Step5Controlling: React.FC = () => {
  const { t } = useTranslation();
  const { controllingInfo } = useSelector((state: RootState) => state.form);
  const dispatch = useDispatch();
  return (
    <section className="step" data-step="5">
      <h2 className="text-xl font-semibold mb-4" data-i18n="step5_title">5. Controlling Persons (Form K)</h2>

      <label className="block mb-2 font-medium" data-i18n="q1_25percent">
        {t('q1_25percent')}
      </label>
      <div className="mb-4">
        <label className="mr-4">
          <input
            onChange={() => dispatch(setControllingInfoField({ field: 'is25Percent', value: true }))}
            type="radio"
            name="has_25"
            value="yes"
            required
            checked={controllingInfo.is25Percent} /> Yes
        </label>
        <label>
          <input
            onChange={() => dispatch(setControllingInfoField({ field: 'is25Percent', value: false }))}
            type="radio"
            name="has_25"
            value="no"
            checked={!controllingInfo.is25Percent} /> No
        </label>
      </div>

      <div id="controlAltQuestion" className={!controllingInfo.is25Percent ? "hidden mb-4" : "mb-4"}>
        <label className="block mb-2 font-medium" data-i18n="q2_control">{t('q2_control')}</label>
        <label className="mr-4">
          <input
            onChange={() => dispatch(setControllingInfoField({ field: 'inOtherWay', value: true }))}
            type="radio"
            name="has_alt_control"
            value="yes"
            checked={controllingInfo.inOtherWay} /> Yes
        </label>
        <label>
          <input
            onChange={() => dispatch(setControllingInfoField({ field: 'inOtherWay', value: false }))}
            type="radio"
            name="has_alt_control"
            value="no"
            checked={!controllingInfo.inOtherWay} /> No
        </label>
      </div>

      <div id="controllingPersonsBlock" className={controllingInfo.inOtherWay ? "space-y-6" : "hidden space-y-6"}>
        <div id="controllingPersons" className="space-y-4"></div>
        <button
          type="button"
          id="addControllingPerson"
          className="text-sm text-blue-600 hover:underline font-medium"
          onClick={() => dispatch(addControllingPerson())}>
          +
          <span data-i18n="add_control_person">
            Add another controlling person
          </span>
        </button>
      </div>

      {controllingInfo.inOtherWay && controllingInfo.controllingPersons.map(person => (
        <div id="managingDirectorBlock" className="mt-6 border-t pt-6 space-y-4 relative">
          <button
            type="button"
            className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-lg"
            aria-label="Remove"
            onClick={() => dispatch(deleteControllingPerson(person.id))}
          >
            ×
          </button>
          <label
            className="block font-medium" data-i18n="managing_director_info">{t('managing_director_info')}</label>
          <input
            type="text"
            name="md_last_name"
            placeholder="Last Name"
            className="w-full border px-3 py-2 rounded"
            value={person.lastName}
            onChange={(e) => dispatch(updateControllingPerson({ index: person.id, person: { lastName: e.target.value } }))}
          />
          <input
            type="text"
            name="md_first_name"
            placeholder="First Name"
            className="w-full border px-3 py-2 rounded"
            value={person.firstName}
            onChange={(e) => dispatch(updateControllingPerson({ index: person.id, person: { firstName: e.target.value } }))}
          />
          <input
            type="text"
            name="md_address"
            placeholder="Address"
            className="w-full border px-3 py-2 rounded"
            value={person.address}
            onChange={(e) => dispatch(updateControllingPerson({ index: person.id, person: { address: e.target.value } }))}
          />
          <input
            type="date"
            name="md_dob"
            placeholder="Date of Birth"
            className="w-full border px-3 py-2 rounded"
            value={person.dob}
            onChange={(e) => dispatch(updateControllingPerson({ index: person.id, person: { dob: e.target.value } }))}
          />
          <input
            type="text"
            name="md_nationality"
            placeholder="Nationality"
            className="w-full border px-3 py-2 rounded"
            value={person.nationality}
            onChange={(e) => dispatch(updateControllingPerson({ index: person.id, person: { nationality: e.target.value } }))}
          />
        </div>
      ))}

      {!controllingInfo.inOtherWay && controllingInfo.is25Percent && (
        <div id="managingDirectorBlock" className="mt-6 border-t pt-6 space-y-4 relative">
          <label
            className="block font-medium" data-i18n="managing_director_info">{t('managing_director_info')}</label>
          <input
            type="text"
            name="md_last_name"
            placeholder="Last Name"
            className="w-full border px-3 py-2 rounded"
            value={controllingInfo.managingDirector.lastName}
            onChange={(e) => dispatch(setManagingDirectorInfo({ field: 'lastName', value: e.target.value }))}
          />
          <input
            type="text"
            name="md_first_name"
            placeholder="First Name"
            className="w-full border px-3 py-2 rounded"
            value={controllingInfo.managingDirector.firstName}
            onChange={(e) => dispatch(setManagingDirectorInfo({ field: 'firstName', value: e.target.value }))}
          />
          <input
            type="text"
            name="md_address"
            placeholder="Address"
            className="w-full border px-3 py-2 rounded"
            value={controllingInfo.managingDirector.address}
            onChange={(e) => dispatch(setManagingDirectorInfo({ field: 'address', value: e.target.value }))}
          />
          <input
            type="date"
            name="md_dob"
            placeholder="Date of Birth"
            className="w-full border px-3 py-2 rounded"
            value={controllingInfo.managingDirector.dob}
            onChange={(e) => dispatch(setManagingDirectorInfo({ field: 'dob', value: e.target.value }))}
          />
          <input
            type="text"
            name="md_nationality"
            placeholder="Nationality"
            className="w-full border px-3 py-2 rounded"
            value={controllingInfo.managingDirector.nationality}
            onChange={(e) => dispatch(setManagingDirectorInfo({ field: 'nationality', value: e.target.value }))}
          />
        </div>
      )}


    </section >
  )
}