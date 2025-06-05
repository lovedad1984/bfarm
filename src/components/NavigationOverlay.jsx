import React, { useEffect, useRef } from "react";
import { Portal, Box, Spinner, Text, VStack } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { useNavigationStore } from "@/store/navigationStore";

const NavigationOverlay = () => {
  const { isNavigating, toPath, resetNavigation } = useNavigationStore();
  const location = useLocation();
  const previousPathRef = useRef(location.pathname);

  // URL이 실제로 변경되면 navigation 상태 리셋
  useEffect(() => {
    if (isNavigating && previousPathRef.current !== location.pathname) {
      // URL이 변경되었으므로 navigation 완료
      resetNavigation();
      previousPathRef.current = location.pathname;
    }
  }, [location.pathname, isNavigating, resetNavigation]);

  // 안전장치: 5초 후 자동 리셋
  useEffect(() => {
    if (isNavigating) {
      const timer = setTimeout(() => {
        resetNavigation();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isNavigating, resetNavigation]);

  if (!isNavigating) return null;

  return (
    <Portal>
      <Box
        position="fixed"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bg="blackAlpha.600"
        backdropFilter="blur(4px)"
        zIndex={9999}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <VStack
          bg="card.bg"
          p={8}
          borderRadius="lg"
          boxShadow="2xl"
          border="1px"
          borderColor="border"
          gap={4}
        >
          <Spinner size="xl" color="blue.500" thickness="4px" speed="0.65s" />
          <Text fontSize="lg" fontWeight="medium" color="fg" textAlign="center">
            페이지 이동 중...
          </Text>
          {toPath && (
            <Text fontSize="sm" color="fg.muted" textAlign="center">
              {getPageName(toPath)}(으)로 이동하고 있습니다
            </Text>
          )}
        </VStack>
      </Box>
    </Portal>
  );
};

// 경로에 따른 페이지 이름 반환
const getPageName = (path) => {
  const pageNames = {
    "/": "홈",
    "/login": "로그인",
    "/signup": "회원가입",
    "/profile": "프로필",
    "/farms": "농장 관리",
    "/products": "상품 관리",
    "/orders": "주문 관리",
    "/dashboard": "대시보드",
  };

  return pageNames[path] || "페이지";
};

export default NavigationOverlay;
