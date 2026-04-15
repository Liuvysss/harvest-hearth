import { resolve } from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        home: resolve(__dirname, 'index.html'),
        menu: resolve(__dirname, 'menu.html'),
        events: resolve(__dirname, 'events.html'),
        eventOpenMic: resolve(__dirname, 'event-open-mic.html'),
        about: resolve(__dirname, 'about.html'),
        contact: resolve(__dirname, 'contact.html'),
      },
    },
  },
})
