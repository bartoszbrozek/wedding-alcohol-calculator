import { createI18n } from 'vue-i18n'
import en from './en'
import pl from './pl'

const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('preferredLanguage') || 'en',
  fallbackLocale: 'en',
  messages: {
    en: en,
    pl: pl
  },
  globalInjection: true,
  silentTranslationWarn: true,
  silentFallbackWarn: true,
  missingWarn: false,
  fallbackWarn: false
})

export default i18n 3