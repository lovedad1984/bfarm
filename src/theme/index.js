import { createSystem, defaultConfig } from "@chakra-ui/react";

const fruitBasketColors = {
  // Light Mode Palette
  ivoryLight: "#FFF8E1",
  brownDarkText: "#5D4037",
  orangePrimary: "#FF9800",
  orangeHover: "#FB8C00",
  whiteText: "#FFFFFF",
  greenPrimary: "#AED581",
  greenDarkText: "#33691E",
  greenHover: "#9CCC65",
  grayNeutralLight: "#BDBDBD",
  grayDarkTextLight: "#424242",
  grayHoverLight: "#A0A0A0",

  // Dark Mode Palette
  brownDeepDarkBg: "#2D2419",
  ivoryDarkText: "#F7F1E3",
  orangeDark: "#FFA726",
  orangeDarkHover: "#FFB74D",
  brownDarkButtonTextDark: "#4E342E",
  greenDark: "#689F38",
  greenDarkHover: "#7CB342",
  grayNeutralDark: "#4A4A4A",
  grayLightTextDark: "#E0E0E0",
  grayHoverDark: "#5A5A5A",
};

const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors: {
        ...fruitBasketColors,
      },
      fonts: {
        heading: { value: '"Noto Sans KR", sans-serif' },
        body: { value: '"Noto Sans KR", sans-serif' },
      },
    },
    semanticTokens: {
      colors: {
        // === 본문 색상 ===
        bg: {
          value: {
            base: "{colors.ivoryLight}",
            _dark: "{colors.brownDeepDarkBg}",
          },
        },
        fg: {
          value: {
            base: "{colors.brownDarkText}",
            _dark: "{colors.ivoryDarkText}",
          },
        },

        // === 카드/폼 배경 ===
        "card.bg": {
          value: {
            base: "white",
            _dark: "#3A2B1E", // 다크모드에서 약간 밝은 브라운
          },
        },

        // === 보더 색상 ===
        border: {
          value: {
            base: "{colors.grayNeutralLight}",
            _dark: "#5A4A3D", // 다크모드 보더
          },
        },

        // === Input 색상 ===
        "input.bg": {
          value: {
            base: "white",
            _dark: "#2D2419",
          },
        },
        "input.border": {
          value: {
            base: "{colors.grayNeutralLight}",
            _dark: "#5A4A3D",
          },
        },

        // === 버튼 색상 ===
        "button.ghost.bg": {
          value: {
            base: "transparent",
            _dark: "transparent",
          },
        },
        "button.ghost.hover": {
          value: {
            base: "gray.100",
            _dark: "whiteAlpha.200",
          },
        },
        "button.outline.bg": {
          value: {
            base: "white",
            _dark: "#2D2419",
          },
        },
        "button.outline.border": {
          value: {
            base: "{colors.grayNeutralLight}",
            _dark: "#5A4A3D",
          },
        },

        // === 체크박스 색상 ===
        "checkbox.bg": {
          value: {
            base: "white",
            _dark: "#2D2419",
          },
        },
        "checkbox.border": {
          value: {
            base: "{colors.grayNeutralLight}",
            _dark: "#5A4A3D",
          },
        },
        "checkbox.checked.bg": {
          value: {
            base: "{colors.orangePrimary}",
            _dark: "{colors.orangeDark}",
          },
        },
        "checkbox.checked.border": {
          value: {
            base: "{colors.orangePrimary}",
            _dark: "{colors.orangeDark}",
          },
        },

        // === 긍정적 버튼 (예: 저장) ===
        positiveButtonBackground: {
          value: {
            base: "{colors.orangePrimary}",
            _dark: "{colors.orangeDark}",
          },
        },
        positiveButtonText: {
          value: {
            base: "{colors.whiteText}",
            _dark: "{colors.brownDarkButtonTextDark}",
          },
        },
        positiveButtonHoverBackground: {
          value: {
            base: "{colors.orangeHover}",
            _dark: "{colors.orangeDarkHover}",
          },
        },

        // === 취소 버튼 (연두색 계열) ===
        cancelButtonBackgroundGreen: {
          value: { base: "{colors.greenPrimary}", _dark: "{colors.greenDark}" },
        },
        cancelButtonTextGreen: {
          value: {
            base: "{colors.greenDarkText}",
            _dark: "{colors.ivoryDarkText}",
          },
        },
        cancelButtonHoverBackgroundGreen: {
          value: {
            base: "{colors.greenHover}",
            _dark: "{colors.greenDarkHover}",
          },
        },

        // === 취소 버튼 (회색 계열 - 대안) ===
        cancelButtonBackgroundGray: {
          value: {
            base: "{colors.grayNeutralLight}",
            _dark: "{colors.grayNeutralDark}",
          },
        },
        cancelButtonTextGray: {
          value: {
            base: "{colors.grayDarkTextLight}",
            _dark: "{colors.grayLightTextDark}",
          },
        },
        cancelButtonHoverBackgroundGray: {
          value: {
            base: "{colors.grayHoverLight}",
            _dark: "{colors.grayHoverDark}",
          },
        },
      },
    },
  },
  // 글로벌 CSS 활성화
  globalCss: {
    body: {
      bg: "bg", // semantic token 사용
      color: "fg",
      transition: "background-color 0.2s, color 0.2s",
    },
    // HTML 요소에도 배경 적용
    html: {
      bg: "bg",
    },
  },
});

export default system;
