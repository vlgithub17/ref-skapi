import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import { visualizer } from 'rollup-plugin-visualizer';
import compression from 'vite-plugin-compression';
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        // manualChunks(id) {
        //   if (id.includes('node_modules')) {
        //     return id.toString().split('node_modules/')[1].split('/')[0].toString();
        //   }
        // },
        manualChunks: {
          vendor: ['vue', 'vue-router'],
        },
      },
    },
  },
  define: {
    'import.meta.env.MODE': JSON.stringify(process.env.NODE_ENV || 'development'),
  },
  plugins: [
    visualizer({
      open: false, // 자동으로 브라우저를 열지 않음
      filename: 'dist/manbalboy-bundle-report.html', // 리포트 이름과 경로
      template: 'treemap', // treemap, sunburst, network, etc.
    }),
    compression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz',
    }),
    vue(),
  ],
  server: {
    allowedHosts: ['seoul.broadwayinc.computer']
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
