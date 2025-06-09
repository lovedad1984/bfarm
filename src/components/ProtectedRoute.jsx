import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { useNavigationStore } from "@/store/navigationStore";
import LoadingSpinner from "./LoadingSpinner";

const ProtectedRoute = ({
  children,
  requireAuth = true,
  redirectTo = "/login",
  adminOnly = false,
}) => {
  const { user, loading, userProfile } = useAuthStore();
  const { startNavigation } = useNavigationStore();
  const location = useLocation();

  // 로그인한 사용자가 로그인/회원가입 페이지 접근 시 - 자동 리다이렉트 비활성화
  // (Login.jsx에서 수동으로 처리)
  /*
  useEffect(() => {
    if (
      !requireAuth &&
      user &&
      (location.pathname === "/login" || location.pathname === "/signup")
    ) {
      console.log("🏠 로그인한 사용자, 500ms 후 홈으로 리다이렉트");
      // 토스터가 보일 시간을 주기 위해 짧은 delay
      setTimeout(() => {
        setShouldRedirect(true);
      }, 500);
    } else {
      setShouldRedirect(false);
    }
  }, [user, requireAuth, location.pathname]);
  */

  useEffect(() => {
    // 인증이 필요한데 로그인하지 않은 경우 네비게이션 상태 설정
    if (requireAuth && !loading && !user) {
      console.log("🔴 인증 필요, 로그인 페이지로 이동");
      startNavigation(location.pathname, redirectTo);
    }
  }, [
    user,
    loading,
    requireAuth,
    location.pathname,
    redirectTo,
    startNavigation,
  ]);

  // 로딩 중
  if (loading) {
    console.log("⏳ ProtectedRoute 로딩 중");
    return <LoadingSpinner />;
  }

  // 인증이 필요한데 로그인하지 않은 경우
  if (requireAuth && !user) {
    console.log("🚫 인증 필요, Navigate to", redirectTo);
    return (
      <Navigate to={redirectTo} state={{ from: location.pathname }} replace />
    );
  }

  // 이미 로그인한 사용자가 로그인/회원가입 페이지 접근 시 - 완전 비활성화
  // Login.jsx에서 수동으로 처리하므로 ProtectedRoute는 관여하지 않음
  if (false) {
    // 완전히 비활성화
    console.log("🚀 실제 리다이렉트 실행");
    return <Navigate to="/" replace />;
  }

  // 관리자 권한이 필요한 경우
  if (adminOnly && user && !userProfile?.isAdmin) {
    console.log("👮 관리자 권한 필요, 홈으로 리다이렉트");
    return <Navigate to="/" replace />;
  }

  console.log("✅ ProtectedRoute 통과, children 렌더링");
  return children;
};

export default ProtectedRoute;
