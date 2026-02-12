// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  runtimeConfig: {
    adminUser: process.env.ADMIN_USER || 'admin',
    adminPass: process.env.ADMIN_PASS || '123456',
    supabaseUrl: process.env.SUPABASE_URL || '',
    supabaseAnonKey: process.env.SUPABASE_KEY || '',
    supabaseServiceKey: process.env.SUPABASE_SERVICE_ROLE_KEY || ''
  }
})
