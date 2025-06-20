import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface LanguageState {
  current: string;
  translations: Record<string, any>;
}

const initialState: LanguageState = {
  current: 'en',
  translations: {}
}

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
      state.current = action.payload;
    },
    setTranslations: (state, action: PayloadAction<Record<string, any>>) => {
      state.translations = action.payload;
    },
  },
});

export const {
  setLanguage,
  setTranslations
} = languageSlice.actions;

export default languageSlice.reducer;