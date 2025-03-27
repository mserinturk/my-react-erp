import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import translationTR from '../locales/en.json'
import translationEN from '../locales/tr.json'

i18n
  .use(initReactI18next)
  .init({
    resources: {
      tr: { translation: translationTR },
      en: { translation: translationEN }
    },
    lng: 'tr', // varsayılan dil
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  })

export default i18n