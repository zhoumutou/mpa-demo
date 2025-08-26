import path from 'node:path'
import { URL, fileURLToPath } from 'node:url'
import { defineConfig, loadEnv } from 'rolldown-vite'
import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import Tailwindcss from '@tailwindcss/vite'
// import Markdown from 'unplugin-vue-markdown/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import Remove from 'unplugin-remove/vite'
import VueDevTools from 'vite-plugin-vue-devtools'
import { analyzer } from 'vite-bundle-analyzer'
import Mpa from '@zhoumutou/vite-plugin-mpa'
import Inline from '@zhoumutou/vite-plugin-inline'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const __dirname = fileURLToPath(new URL('.', import.meta.url))
  const env = loadEnv(mode, __dirname, '')

  const isDebug = env.VITE_APP_DEBUG === 'true'
  const isReport = env.VITE_APP_REPORT === 'true'
  const isProduction = env.NODE_ENV === 'production'
  const isHtmlInline = env.VITE_HTML_INLINE === 'true'

  console.log(`mode: ${mode}, NODE_ENV: ${env.NODE_ENV}${isProduction ? '' : `, PORT: ${env.PORT}`}`)

  const customIconNamespace = 'my'

  return {
    server: {
      host: '0.0.0.0',
      strictPort: true,
      port: Number.parseInt(env.PORT || '') || undefined,
      cors: true,
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: [
            `@use '@/assets/styles/layer.css';`,
            `@use '@/assets/styles/theme/element-plus.scss' as *;`,
          ].join(''),
        },
      },
    },
    plugins: [
      // Vue({ include: [/\.vue$/, /\.md$/] }),
      Vue(),
      VueJsx(),
      Tailwindcss(),
      // Markdown({}),
      AutoImport({
        imports: ['vue'],
        dts: path.resolve(__dirname, './src/types/auto-imports.d.ts'),
        eslintrc: {
          enabled: true,
          filepath: path.resolve(__dirname, './src/types/auto-imports.json'),
        },
        resolvers: [
          ElementPlusResolver({
            importStyle: 'sass',
          }),
        ],
      }),
      Components({
        dts: './src/types/components.d.ts',
        dirs: [],
        resolvers: [
          IconsResolver({
            customCollections: [customIconNamespace],
          }),
          ElementPlusResolver({
            importStyle: 'sass',
          }),
        ],
      }),
      Icons({
        compiler: 'vue3',
        customCollections: {
          [customIconNamespace]: FileSystemIconLoader(path.resolve(__dirname, './src/assets/icons')),
        },
      }),
      Mpa(),
      isProduction && isHtmlInline && Inline({ cdataJs: true }),

      isProduction && !isDebug && Remove({ consoleType: ['debug', 'info', 'log'] }),
      !isProduction && VueDevTools(),
      isReport && analyzer(),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    base: isProduction ? './' : '/',
    build: {
      emptyOutDir: true,
      minify: true,
      modulePreload: false,
    },
  }
})
