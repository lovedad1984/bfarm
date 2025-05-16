import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "url";
/*
vite는 ES모듈 형식을 사용하므로 fileUrlToPath 방식을 사용하는것이 좋다.
*/

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@assets": fileURLToPath(new URL("./src/assets", import.meta.url)),
      "@images": fileURLToPath(new URL("./src/assets/images", import.meta.url)),
      "@components": fileURLToPath(
        new URL("./src/components", import.meta.url)
      ),
      "@pages": fileURLToPath(new URL("./src/pages", import.meta.url)),
      "@layouts": fileURLToPath(new URL("./src/layouts", import.meta.url)),
      "@services": fileURLToPath(new URL("./src/services", import.meta.url)),
      "@theme": fileURLToPath(new URL("./src/theme", import.meta.url)),
      "@store": fileURLToPath(new URL("./src/store", import.meta.url)),
    },
  },
});
