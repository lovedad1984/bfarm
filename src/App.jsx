import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "@/components/ui/provider";
import { Toaster } from "@/components/ui/toaster";
import { useAuthStore } from "@/store/authStore";

// 컴포넌트 임포트
import LoadingSpinner from "@/components/LoadingSpinner";
import ProtectedRoute from "@/components/ProtectedRoute";
import NavigationOverlay from "@/components/NavigationOverlay";
import Header from "@/layouts/Header";
import Footer from "@/layouts/Footer";

// 페이지 임포트
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import Profile from "@/pages/Profile";
import ForgotPassword from "@/pages/ForgotPassword";
import NotFound from "@/pages/NotFound";

function App() {
  const { initialize, loading } = useAuthStore();

  // 앱 시작 시 인증 상태 초기화
  useEffect(() => {
    const unsubscribe = initialize();
    return () => unsubscribe?.();
  }, [initialize]);

  // 전체 앱 로딩 중
  if (loading) {
    return (
      <Provider>
        <LoadingSpinner fullScreen />
      </Provider>
    );
  }

  return (
    <Provider>
      <Router>
        <div className="App">
          {/* 네비게이션 오버레이 */}
          <NavigationOverlay />

          {/* 헤더 */}
          <Header />

          {/* 메인 컨텐츠 */}
          <main>
            <Routes>
              {/* 공개 페이지 */}
              <Route path="/" element={<Home />} />

              {/* 인증 관련 페이지 (로그인한 사용자는 접근 불가) */}
              <Route
                path="/login"
                element={
                  <ProtectedRoute requireAuth={false}>
                    <Login />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/signup"
                element={
                  <ProtectedRoute requireAuth={false}>
                    <Signup />
                  </ProtectedRoute>
                }
              />
              <Route path="/forgot-password" element={<ForgotPassword />} />

              {/* 보호된 페이지 (로그인 필요) */}
              <Route
                path="/profile"
                element={
                  <ProtectedRoute requireAuth={true}>
                    <Profile />
                  </ProtectedRoute>
                }
              />

              {/* 향후 추가될 보호된 페이지들 */}
              <Route
                path="/farms"
                element={
                  <ProtectedRoute requireAuth={true}>
                    <div>농장 관리 페이지 (준비 중)</div>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/products"
                element={
                  <ProtectedRoute requireAuth={true}>
                    <div>상품 관리 페이지 (준비 중)</div>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/orders"
                element={
                  <ProtectedRoute requireAuth={true}>
                    <div>주문 관리 페이지 (준비 중)</div>
                  </ProtectedRoute>
                }
              />

              {/* 관리자 전용 페이지 */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute requireAuth={true} adminOnly={true}>
                    <div>관리자 페이지 (준비 중)</div>
                  </ProtectedRoute>
                }
              />

              {/* 404 페이지 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          {/* 푸터 */}
          <Footer />

          {/* 토스터 */}
          <Toaster />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
