import { createSystem, defaultConfig } from "@chakra-ui/react";

// 테마 설정
const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors: {
        brand: {
          50: { value: "#f0f9eb" },
          100: { value: "#d8eeca" },
          200: { value: "#bde3a7" },
          300: { value: "#9ed57f" },
          400: { value: "#7ec957" },
          500: { value: "#64b92f" },
          600: { value: "#4d9324" },
          700: { value: "#376c1b" },
          800: { value: "#23470f" },
          900: { value: "#0f2205" },
        },
      },
      fonts: {
        heading: { value: '"Noto Sans KR", sans-serif' },
        body: { value: '"Noto Sans KR", sans-serif' },
      },
    },
  },
});

export default system;
