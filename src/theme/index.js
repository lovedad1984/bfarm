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
  brownDarkButtonTextDark: "#4E342E", // 어두운 배경 위 밝은 버튼의 어두운 텍스트
  greenDark: "#689F38",
  greenDarkHover: "#7CB342",
  // whiteTextDark: "#FFFFFF", // 다크모드 연두 버튼 위 텍스트로 ivoryDarkText와 유사하나, 필요시 명시
  grayNeutralDark: "#4A4A4A",
  grayLightTextDark: "#E0E0E0",
  grayHoverDark: "#5A5A5A",
};

// 2. Chakra UI 시스템 생성 및 테마 확장
const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors: {
        ...fruitBasketColors, // 위에서 정의한 기본 색상들을 여기에 포함
      },
      fonts: {
        // 기존 폰트 설정 유지
        heading: { value: '"Noto Sans KR", sans-serif' },
        body: { value: '"Noto Sans KR", sans-serif' },
      },
    },
    semanticTokens: {
      colors: {
        // === 본문 색상 ===
        bodyBackground: {
          value: {
            base: "{colors.ivoryLight}",
            _dark: "{colors.brownDeepDarkBg}",
          },
        },
        bodyTextColor: {
          value: {
            base: "{colors.brownDarkText}",
            _dark: "{colors.ivoryDarkText}",
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
        // 호버 시 텍스트 색상이 변경되지 않는다면, 별도 정의 필요 X

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

        // 기존 primary, secondary, brand, myColor는 필요에 따라 정리
        // primary: { value: "{colors.ivoryLight}" }, // 예시: fruitBasketColors의 값으로 대체
        // secondary: { value: "{colors.greenPrimary}" }, // 예시: fruitBasketColors의 값으로 대체
      },
    },
    // (선택 사항) 컴포넌트 스타일 직접 정의
    // Panda CSS에서는 components 스타일을 여기에 정의할 수 있습니다.
    // 예를 들어 Button 컴포넌트의 기본 스타일과 variant를 정의할 수 있습니다.
    // components: {
    //   Button: {
    //     baseStyle: {
    //       // 모든 버튼에 적용될 기본 스타일
    //     },
    //     variants: {
    //       positive: { // "positive"라는 variant를 만듦
    //         bg: "positiveButtonBackground", // semantic token 사용
    //         color: "positiveButtonText",
    //         _hover: {
    //           bg: "positiveButtonHoverBackground",
    //         }
    //       },
    //       cancelGreen: {
    //         bg: "cancelButtonBackgroundGreen",
    //         color: "cancelButtonTextGreen",
    //         _hover: {
    //           bg: "cancelButtonHoverBackgroundGreen",
    //         }
    //       },
    //       cancelGray: {
    //         bg: "cancelButtonBackgroundGray",
    //         color: "cancelButtonTextGray",
    //         _hover: {
    //           bg: "cancelButtonHoverBackgroundGray",
    //         }
    //       }
    //     }
    //   }
    // }
  },
  // 전역 스타일 (필요한 경우)
  // globalCss: {
  //   body: {
  //     bg: "bodyBackground", // semantic token 사용
  //     color: "bodyTextColor",
  //   },
  // },
});

export default system;
