import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTranslations } from "../store/slices/languageSlice";
import type { RootState } from "../store";
import en from '../utils/lang/en.json';
import de from '../utils/lang/de.json';
import fr from '../utils/lang/fr.json';
import it from '../utils/lang/it.json';

const translationsMap = {
  en,
  de,
  fr,
  it
}

export const useTranslation = () => {
  const dispatch = useDispatch();
  const { current, translations } = useSelector((state: RootState) => state.language);

  useEffect(() => {
    const load = async () => {
      try {
        const translationData = translationsMap[current as keyof typeof translationsMap];
        dispatch(setTranslations(translationData));
      } catch (err) {
        console.error('Error loading translations:', err);
      }
    }

    load();
  }, [current, dispatch]);

  const t = (key: string): string => {
    return translations[key] || key;
  }

  return { t };
}