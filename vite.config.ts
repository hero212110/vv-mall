import path from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import svgLoader from "vite-svg-loader";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), svgLoader()],
  base: "./",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "~": path.resolve(__dirname, "src"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/assets/scss/variables.scss";`, //你的scss文件路径
      },
    },
  },
  server: {
    host: "localhost",
    port: 3000,
    open: true,
    strictPort: false, //如果端口占用，是退出，还是尝试其他端口
    https: false, // 是否开启 https
    // proxy: {
    //   "/api": {
    //     target: "",
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, ""),
    //   },
    // },
  },
});
