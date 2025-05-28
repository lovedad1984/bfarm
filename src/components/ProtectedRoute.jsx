import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import LoadingSpinner from "@/components/LoadingSpinner";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuthStore();

  // 로딩 중일 때
  if (loading) {
    return <LoadingSpinner />;
  }

  // 인증되지 않은 사용자는 로그인 페이지로 리다이렉트
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 인증된 사용자는 자식 컴포넌트 렌더링
  return children;
};

export default ProtectedRoute;
