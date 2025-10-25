// src/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import JSON files
import enTranslation from './locales/en/translation.json';
import idTranslation from './locales/id/translation.json';

console.log('EN translations loaded:', Object.keys(enTranslation));
console.log('ID translations loaded:', Object.keys(idTranslation));

const resources = {
  en: {
    translation: enTranslation
  },
  id: {
    translation: idTranslation
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'id', // default language
    fallbackLng: 'en',
    debug: true, // enable debug mode
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;