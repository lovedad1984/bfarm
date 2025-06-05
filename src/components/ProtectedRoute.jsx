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

  useEffect(() => {
    // 인증이 필요한데 로그인하지 않은 경우 네비게이션 상태 설정
    if (requireAuth && !loading && !user) {
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
    return <LoadingSpinner />;
  }

  // 인증이 필요한데 로그인하지 않은 경우
  if (requireAuth && !user) {
    return (
      <Navigate to={redirectTo} state={{ from: location.pathname }} replace />
    );
  }

  // 이미 로그인한 사용자가 로그인/회원가입 페이지 접근 시
  if (
    !requireAuth &&
    user &&
    (location.pathname === "/login" || location.pathname === "/signup")
  ) {
    return <Navigate to="/" replace />;
  }

  // 관리자 권한이 필요한 경우
  if (adminOnly && user && !userProfile?.isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
