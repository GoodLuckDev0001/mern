import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store';
import { setLanguage } from '../store/slices/languageSlice';

export const Header: React.FC = () => {
  const dispatch = useDispatch();
  const { current } = useSelector((state: RootState) => state.language);

  return (
    <header className="bg-white shadow-sm py-4 px-6 flex justify-between items-center">
      <h1 className="text-xl font-bold tracking-tight"
      >
        Centi Client Onboarding
      </h1>
      <select
        id="lang-switcher"
        className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none"
        onChange={(e) => dispatch(setLanguage(e.target.value))}
        value={current}
      >
        <option value="en">EN</option>
        <option value="de">DE</option>
        <option value="fr">FR</option>
        <option value="it">IT</option>
      </select>
    </header >
  )
}