import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import { resolve, dirname } from 'node:path' // Commented out
// import { fileURLToPath } from 'url' // Commented out
// import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite' // Commented out

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue()
        // VueI18nPlugin({
        //   include: resolve(dirname(fileURLToPath(import.meta.url)), './src/i18n/**'),
        //   runtimeOnly: false
        // })
    ],
    base: process.env.NODE_ENV === 'production' ? '/wedding-alcohol-calculator/' : '/',
    build: {
        assetsDir: 'assets',
        rollupOptions: {
            output: {
                assetFileNames: 'assets/[name].[hash][extname]'
            }
        }
    },
    // optimizeDeps: { // Commented out
    //   include: ['vue-i18n']
    // },
    resolve: {
        dedupe: ['vue'],
        // alias: { // Commented out
        //   'vue-i18n': 'vue-i18n/dist/vue-i18n.runtime.esm-bundler.js'
        // }
    },
    define: {
        __VUE_I18N_FULL_INSTALL__: false,
        __VUE_I18N_LEGACY_API__: false,
        __VUE_I18N_PROD_DEVTOOLS__: false,
        __INTLIFY_LEGACY_API__: false,
        __INTLIFY_PROD_DEVTOOLS__: false,
        // 'process.env': { // Commented out
        //   NODE_ENV: JSON.stringify(process.env.NODE_ENV)
        // }
    }
})
