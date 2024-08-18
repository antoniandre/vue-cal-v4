import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import terser from "@rollup/plugin-terser";
import { resolve } from 'path'
import pkg from './package.json'
import autoprefixer from 'autoprefixer'

// const isProduction = process.env.NODE_ENV === 'production'

const banner = `/**
  * ${pkg.name} v${pkg.version}
  * (c) ${new Date().getFullYear()} ${pkg.author}
  * @license MIT
  */\n`

const bundlingConf = {
  lib: {
    entry: resolve(__dirname, 'src/vue-cal/index.vue'),
    name: 'vuecal' // For IIFE.
  },
  rollupOptions: {
    // Make sure to externalize deps that shouldn't be bundled into library.
    external: ['vue'],

    output: [
      // Works with dynamic import().
      {
        format: 'es',
        dir: 'dist',
        entryFileNames: 'vue-cal.[format].js',
        chunkFileNames: '[name].js',
        banner,
        plugins: [terser()], // Minify.
        manualChunks(id) {
          const match = /i18n\/(.{2,5})\.json/.exec(id)
          if (match) return 'i18n/' + match[1] + '.es'
          else if (id.includes('drag-and-drop')) return 'drag-and-drop.es'
        }
      },

      // Works with dynamic import().
      {
        format: 'cjs',
        dir: 'dist',
        entryFileNames: 'vue-cal.[format].js',
        chunkFileNames: '[name].js',
        banner,
        manualChunks(id) {
          const match = /i18n\/(.{2,5})\.json/.exec(id)
          if (match) return 'i18n/' + match[1] + '.cjs'
          else if (id.includes('drag-and-drop')) return 'drag-and-drop.cjs'
        }
      },

      // Works with dynamic import().
      {
        format: 'amd',
        name: 'vuecal',
        dir: 'dist',
        entryFileNames: 'vue-cal.[format].js',
        chunkFileNames: '[name].js',
        // Provide global variables to use in the UMD build for externalized deps.
        globals: { vue: 'Vue' },
        banner,
        manualChunks(id) {
          const match = /i18n\/(.{2,5})\.json/.exec(id)
          if (match) return 'i18n/' + match[1] + '.amd'
          else if (id.includes('drag-and-drop')) return 'drag-and-drop.amd'
        }
      },

      // IIFE & UMD don't work with dynamic import().
      {
        format: 'iife',
        name: 'vuecal',
        inlineDynamicImports: true, // Everything contained in a single file.
        dir: 'dist',
        entryFileNames: 'vue-cal.[format].js',
        chunkFileNames: '[name].js',
        // Provide global variables to use in the UMD build for externalized deps.
        globals: { vue: 'Vue' }
      }
    ]
  }
}

const build = process.env.BUNDLE ? bundlingConf : { outDir: 'docs' }

export default defineConfig({
  define: {
    'process.env': {
      ...process.env,
      VITE_APP_VERSION: process.env.npm_package_version
    }
  },
  plugins: [
    vue({
      template: {
        compilerOptions: {
          whitespace: 'preserve'
        }
      }
    })
  ], // https://vitejs.dev/config/
  resolve: {
    alias: {
      '@': resolve(__dirname, '/src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/scss/_variables.scss";'
      }
    },
    postcss: {
      plugins: [autoprefixer]
    }
  },
  build
})
