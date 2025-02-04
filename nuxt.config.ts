// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  //...
  build: {
    transpile: ['vuetify'],
  },
  buildModules: [
    '@nuxtjs/pwa',
  ],
  pwa: {
    icon: false, // disables the icon module
    manifest: {
      name: 'My Awesome App',
      lang: 'fa',
      useWebmanifestExtension: false
    }
  

  },
  vite: {
    optimizeDeps: {
      include: ['@supabase/gotrue-js']
    }
  },
  modules: ["@nuxtjs/supabase"],
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
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
    },
  },
  
})
