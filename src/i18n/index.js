import { createI18n } from 'vue-i18n'
import en from './en'
import pl from './pl'

const messages = {
  en,
  pl
}

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages,
  runtimeOnly: false,
  globalInjection: true,
  silentTranslationWarn: true,
  silentFallbackWarn: true,
  missingWarn: false,
  fallbackWarn: false
})

export default i18n 