import tailwindcss from '@tailwindcss/vite'

const baseURL = process.env.NUXT_APP_BASE_URL || '/'

export default defineNuxtConfig({
  // GitHub Pages project site (subpath) pakai SPA agar prerender tidak bentrok dengan baseURL.
  ssr: baseURL === '/',
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()]
  },
  nitro: {
    prerender: {
      concurrency: 1
    }
  },
  app: {
    baseURL,
    head: {
      link: [{ rel: 'icon', type: 'image/png', href: `${baseURL}webkecilstudio.png` }],
      meta: [{ name: 'theme-color', content: '#ff6b00' }]
    }
  }
})
