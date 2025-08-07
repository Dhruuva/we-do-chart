
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [vue()],
  build: {
    emptyOutDir:true,
    copyPublicDir:false,
    target: 'es2015',
    lib: {
      entry: resolve(__dirname, 'src/components/WeDoChart.vue'),
      name: WeDoChart,
      // the proper extensions will be added
      fileName: (format) => `we-do-chart.${format}.js`,
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue',
        },
        assetFileNames:(chunk)=> {
          console.log(chunk.name);
          if (chunk.name === 'wechart.css') {
            return 'we-do-chart.css'
          }
          return chunk.name || ''
        },
      },
    },
  },
})