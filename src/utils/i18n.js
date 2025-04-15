import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import translationTR from '../locales/tr.json'
import translationEN from '../locales/en.json'

const storedLanguage = localStorage.getItem('settings')
  ? JSON.parse(localStorage.getItem('settings')).language
  : 'en'

i18n
  .use(initReactI18next)
  .init({
    resources: {
      tr: { translation: translationTR },
      en: { translation: translationEN }
    },
    lng: storedLanguage,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  })

export default i18n