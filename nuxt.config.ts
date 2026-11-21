import tailwindcss from '@tailwindcss/vite'

const baseURL = '/'

export default defineNuxtConfig({
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
