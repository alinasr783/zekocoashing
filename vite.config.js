import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: 'Zeko Coaching',
        short_name: 'ZC',
        description: 'Zeko Coaching',
        theme_color: '#ffffff',
        icons: [
          {
            src: './src/assets/logo.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: './src/assets/logo.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
  base : "/",
  server: {
    allowedHosts: [
      '92b23946-b306-4aa3-9c77-a30b60f3152a-00-3fitgp55wmt51.kirk.replit.dev'
    ]
  },
});