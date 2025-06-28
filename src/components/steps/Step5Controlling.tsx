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
      <h2 className="text-xl font-semibold mb-6">5. Controlling Persons (Form K data)</h2>
      <p className="text-gray-600 mb-6">
        This section collects information about controlling persons according to Form K requirements. 
        Please answer the questions to determine which information is required.
      </p>

      {/* Question 1: 25% or more shares/voting rights */}
      <div className="mb-6">
        <label className="block mb-3 font-medium text-gray-900">
          Are there persons directly or indirectly holding 25% or more of the capital shares or voting rights?
        </label>
        <div className="space-y-2">
          <label className="flex items-center space-x-3">
            <input
              type="radio"
              name="has_25_percent"
              value="yes"
              checked={controllingInfo.is25Percent === true}
              onChange={() => dispatch(setControllingInfoField({ field: 'is25Percent', value: true }))}
              className="accent-blue-600"
            />
            <span>Yes</span>
          </label>
          <label className="flex items-center space-x-3">
            <input
              type="radio"
              name="has_25_percent"
              value="no"
              checked={controllingInfo.is25Percent === false}
              onChange={() => dispatch(setControllingInfoField({ field: 'is25Percent', value: false }))}
              className="accent-blue-600"
            />
            <span>No</span>
          </label>
        </div>
      </div>

      {/* Question 2: Control in other ways (only shown if Question 1 is No) */}
      {controllingInfo.is25Percent === false && (
        <div className="mb-6">
          <label className="block mb-3 font-medium text-gray-900">
            Are there persons controlling the company in other ways?
          </label>
          <div className="space-y-2">
            <label className="flex items-center space-x-3">
              <input
                type="radio"
                name="has_other_control"
                value="yes"
                checked={controllingInfo.inOtherWay === true}
                onChange={() => dispatch(setControllingInfoField({ field: 'inOtherWay', value: true }))}
                className="accent-blue-600"
              />
              <span>Yes</span>
            </label>
            <label className="flex items-center space-x-3">
              <input
                type="radio"
                name="has_other_control"
                value="no"
                checked={controllingInfo.inOtherWay === false}
                onChange={() => dispatch(setControllingInfoField({ field: 'inOtherWay', value: false }))}
                className="accent-blue-600"
              />
              <span>No</span>
            </label>
          </div>
        </div>
      )}

      {/* Controlling Persons Section (shown if Question 1 is Yes OR Question 2 is Yes) */}
      {(controllingInfo.is25Percent === true || controllingInfo.inOtherWay === true) && (
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-4">Controlling Persons Information</h3>
          <p className="text-sm text-gray-600 mb-4">
            Please provide information for each controlling person (up to 4 persons).
          </p>
          
          {controllingInfo.controllingPersons.map((person, index) => (
            <div key={person.id} className="mb-6 p-4 border rounded-lg relative">
              <button
                type="button"
                className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-lg"
                onClick={() => dispatch(deleteControllingPerson(person.id))}
                aria-label="Remove person"
              >
                ×
              </button>
              
              <h4 className="font-medium mb-3">Controlling Person {index + 1}</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                  <input
                    type="text"
                    value={person.lastName}
                    onChange={(e) => dispatch(updateControllingPerson({ index: person.id, person: { lastName: e.target.value } }))}
                    className="w-full border px-3 py-2 rounded focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                  <input
                    type="text"
                    value={person.firstName}
                    onChange={(e) => dispatch(updateControllingPerson({ index: person.id, person: { firstName: e.target.value } }))}
                    className="w-full border px-3 py-2 rounded focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth *</label>
                  <input
                    type="date"
                    value={person.dob}
                    onChange={(e) => dispatch(updateControllingPerson({ index: person.id, person: { dob: e.target.value } }))}
                    className="w-full border px-3 py-2 rounded focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nationality *</label>
                  <input
                    type="text"
                    value={person.nationality}
                    onChange={(e) => dispatch(updateControllingPerson({ index: person.id, person: { nationality: e.target.value } }))}
                    className="w-full border px-3 py-2 rounded focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
                <input
                  type="text"
                  value={person.address}
                  onChange={(e) => dispatch(updateControllingPerson({ index: person.id, person: { address: e.target.value } }))}
                  className="w-full border px-3 py-2 rounded focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Street and number"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code *</label>
                  <input
                    type="text"
                    value={person.postal}
                    onChange={(e) => dispatch(updateControllingPerson({ index: person.id, person: { postal: e.target.value } }))}
                    className="w-full border px-3 py-2 rounded focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                  <input
                    type="text"
                    value={person.city}
                    onChange={(e) => dispatch(updateControllingPerson({ index: person.id, person: { city: e.target.value } }))}
                    className="w-full border px-3 py-2 rounded focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country *</label>
                  <input
                    type="text"
                    value={person.country}
                    onChange={(e) => dispatch(updateControllingPerson({ index: person.id, person: { country: e.target.value } }))}
                    className="w-full border px-3 py-2 rounded focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>
            </div>
          ))}
          
          {controllingInfo.controllingPersons.length < 4 && (
            <button
              type="button"
              onClick={() => dispatch(addControllingPerson())}
              className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              + Add Another Controlling Person
            </button>
          )}
        </div>
      )}

      {/* Managing Director Section (shown if both questions are No) */}
      {controllingInfo.is25Percent === false && controllingInfo.inOtherWay === false && (
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-4">Managing Director Information</h3>
          <p className="text-sm text-gray-600 mb-4">
            Since no controlling persons were identified, please provide information about the managing director(s).
          </p>
          
          <div className="p-4 border rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                <input
                  type="text"
                  value={controllingInfo.managingDirector.lastName}
                  onChange={(e) => dispatch(setManagingDirectorInfo({ field: 'lastName', value: e.target.value }))}
                  className="w-full border px-3 py-2 rounded focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                <input
                  type="text"
                  value={controllingInfo.managingDirector.firstName}
                  onChange={(e) => dispatch(setManagingDirectorInfo({ field: 'firstName', value: e.target.value }))}
                  className="w-full border px-3 py-2 rounded focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth *</label>
                <input
                  type="date"
                  value={controllingInfo.managingDirector.dob}
                  onChange={(e) => dispatch(setManagingDirectorInfo({ field: 'dob', value: e.target.value }))}
                  className="w-full border px-3 py-2 rounded focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nationality *</label>
                <input
                  type="text"
                  value={controllingInfo.managingDirector.nationality}
                  onChange={(e) => dispatch(setManagingDirectorInfo({ field: 'nationality', value: e.target.value }))}
                  className="w-full border px-3 py-2 rounded focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>
            
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
              <input
                type="text"
                value={controllingInfo.managingDirector.address}
                onChange={(e) => dispatch(setManagingDirectorInfo({ field: 'address', value: e.target.value }))}
                className="w-full border px-3 py-2 rounded focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};