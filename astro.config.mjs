// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss(), react()],
    server: {
      proxy: {
        '/api': 'http://api.podo-trenner.de', // 👈 Proxy a tu backend
      },
    },
  },

  integrations: [react()],
  i18n: {
    defaultLocale: 'de',
    locales: ['de', 'en', 'es', 'it'],
    routing: {
      prefixDefaultLocale: true,
    },
  },
});
