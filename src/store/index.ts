import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import formReducer from './slices/formSlice';
import languageReducer from './slices/languageSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['language', 'form'],
};

const persistedReducer = persistReducer(persistConfig, formReducer);
const persistedLanguageReducer = persistReducer(persistConfig, languageReducer);

export const store = configureStore({
  reducer: {
    form: persistedReducer,
    language: persistedLanguageReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;