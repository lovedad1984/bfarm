import { useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useNavigationStore } from "@/store/navigationStore";
import { useAuthStore } from "@/store/authStore";

export const useRouterGuard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading } = useAuthStore();
  const { isNavigating, startNavigation, completeNavigation, resetNavigation } =
    useNavigationStore();

  // 안전한 네비게이션 함수
  const safeNavigate = useCallback(
    (path, options = {}) => {
      // 이미 네비게이션 중이면 무시
      if (isNavigating) {
        console.warn("네비게이션이 진행 중입니다. 잠시 후 다시 시도해주세요.");
        return;
      }

      // 현재 경로와 같으면 무시
      if (location.pathname === path) {
        return;
      }

      // 네비게이션 시작
      startNavigation(location.pathname, path);

      // 약간의 지연 후 실제 네비게이션 실행 (사용자 경험 향상)
      setTimeout(() => {
        navigate(path, options);

        // 네비게이션 완료
        setTimeout(() => {
          completeNavigation();
        }, 500); // 페이지 로딩 시간 고려
      }, 200);
    },
    [
      navigate,
      location.pathname,
      isNavigating,
      startNavigation,
      completeNavigation,
    ]
  );

  // 페이지 변경 시 네비게이션 상태 리셋
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isNavigating) {
        completeNavigation();
      }
    }, 3000); // 3초 후 강제 완료

    return () => clearTimeout(timer);
  }, [location.pathname, isNavigating, completeNavigation]);

  // 페이지 언마운트 시 상태 리셋
  useEffect(() => {
    return () => {
      resetNavigation();
    };
  }, [resetNavigation]);

  return {
    safeNavigate,
    isNavigating,
    canNavigate: !isNavigating && !loading,
    user,
    loading,
  };
};
