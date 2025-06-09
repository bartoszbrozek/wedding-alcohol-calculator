import { createApp } from 'vue'
import App from './App.vue'
import './style.css'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

// i18n
// import i18n from './i18n' // Commented out

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light'
  }
})

// Create the app instance
const app = createApp(App)

// Use plugins
app.use(vuetify)
// app.use(i18n) // Commented out

// Mount the app
app.mount('#app')
