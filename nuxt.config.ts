// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  //...
  build: {
    transpile: ['vuetify', '@nuxtjs/pwa'],
  },
  pwa: {
    meta:{
      title: 'FlashCards',
      author: 'Gabriel'
    },
    manifest:{
      "name": "FlashCards",
      "lang": "pt",
      "start_url": "/",
      "display": "fullscreen",
      "background_color": "#201c1d",
      "theme_color": "#201c1d",
      "short_name": "FlashCards",
      "id": "FlashCards",
      "description": "",
      "categories": [
        "business",
        "navigation",
        "shopping"
      ]
    }
  },
  vite: {
    optimizeDeps: {
      include: ['@supabase/gotrue-js']
    }
  },

  modules: ["@nuxtjs/supabase","@kevinmarrec/nuxt-pwa"],
  supabase: {
    redirect: false,
    cookieOptions: {
      maxAge: 60 * 60 * 8,
      sameSite:false,    
      secure:false 
    },
    redirectOptions: {
      login: '/auth/login',
      callback: '/',
      include: undefined,
      exclude: [],
      cookieRedirect: true
    }
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'pt-BR',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' },
      ],
    },
  },
  
  css: ['@/assets/css/main.css'],
})
