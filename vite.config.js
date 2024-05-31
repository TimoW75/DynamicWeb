import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from "url";




export default defineConfig({
  plugins: [vue(),

  ],
  resolve: {
    alias: {
      "$": fileURLToPath(new URL("./src", import.meta.url)),
      "*": fileURLToPath(new URL("./public", import.meta.url)),

    },
  },
  build: {
    chunkSizeWarningLimit: 600,
    cssCodeSplit: false
  },
  publicDir: "/DynamicWeb/",
  base: "/DynamicWeb/",
})
