import { defineConfig } from 'vite'

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: 'index.html',
        bolos: 'bolos.html',
        pedidos: 'pedidos.html',
        dashboard: 'dashboard.html',
        admin: 'admin.html',
      }
    }
  }
})