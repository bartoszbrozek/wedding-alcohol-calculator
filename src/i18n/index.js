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
  runtimeOnly: false,
  globalInjection: true,
  silentTranslationWarn: true,
  silentFallbackWarn: true,
  missingWarn: false,
  fallbackWarn: false,
  allowComposition: true,
  sync: true
})

export default i18n 