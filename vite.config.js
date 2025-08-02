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
  //base: '/we-do-chart/',
  base:'./',
  publicDir: './public',
  appType: 'mpa',
  build: {
    "outDir": 'docs',
    emptyOutDir: true,
    //cssCodeSplit: false, bad view
    rollupOptions: {
      experimentalMinChunkSize: Infinity,
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
        hashCharacters: "hex",
        sanitizeFileName: "false",
        assetFileNames: ({ name }) => {
          //console.log(name)
          return "assets/[name]-[hash][extname]"
        },
        chunkFileNames: ({ name }) => {
          //console.log(name);
          let nm ="a"+[name];
          return `assets/[name]-[hash].js`
        },
        manualChunks(id) {
          const match = /_plugin-vue_export-helper/.exec(id);
        
          if (id.includes('@vue') ) {
            return 'oa';
          } else if (id.includes('vue.runtime')) {
            return 'oa';
          } else if (id.includes('vue-plugin')) {
            return 'oaa';
           } else if (id.includes('export')) {
            return 'oa';
          }
        },

      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      
    },
  },
})