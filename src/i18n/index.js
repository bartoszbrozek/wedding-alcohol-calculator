import { createI18n } from 'vue-i18n'
import en from './en'
import pl from './pl'

// Create i18n instance with runtime-only mode
const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('preferredLanguage') || 'en',
  fallbackLocale: 'en',
  messages: {
    en,
    pl
  },
  // Force runtime-only mode for all environments
  runtimeOnly: false,
  // Enable global injection
  globalInjection: true,
  // Disable warnings
  silentTranslationWarn: false,
  silentFallbackWarn: false,
  missingWarn: true,
  fallbackWarn: true,
  // Enable composition API
  allowComposition: true,
  // Enable sync mode
  sync: true
})

export default i18n
