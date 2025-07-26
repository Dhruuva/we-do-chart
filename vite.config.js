// import { defineConfig } from 'vite'
// import vue from '@vitejs/plugin-vue'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [vue()],
//   build: {
//     lib: {
//       entry: ['src/main.js'],
//       fileName: (format, entryName) => `my-lib-${entryName}.${format}.js`,
//       cssFileName: 'my-lib-style',
//     },
//   },

// })


import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const __dirname = dirname(fileURLToPath(import.meta.url))
//console.log(" path  ",__dirname);

export default defineConfig({
  plugins: [vue()],
  // root:resolve(__dirname, 'src'),
  //envDir: resolve(__dirname, '.'),
  base: '/we-do-chart/',
  publicDir: './public',
  appType: 'mpa',
  build: {
    "outDir": 'docs',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        home: resolve(__dirname, 'home.html'),
        props: resolve(__dirname, 'props.html'),
        format: resolve(__dirname, 'format.html'),
        respo: resolve(__dirname, 'respo.html'),
        shapes: resolve(__dirname, 'shapes.html'),
        inputData: resolve(__dirname, 'inputData.html'),

      },
      output: {
        "sanitizeFileName": "false",
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      
    },
  },
})