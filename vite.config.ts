// vite.config.js
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path"; // Node.js 내장 path 모듈

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // '@'를 src 폴더로 매핑
      "~": path.resolve(__dirname, "./"), // 루트 디렉토리로 매핑 (선택)
    },
  },
});
