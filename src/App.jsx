import { useEffect, useState } from "react";
// import "./App.css";
import { useAuthStore } from "@store/authStore";
import Header from "@layouts/Header";
import Footer from "@layouts/Footer";
import Home from "@pages/Home";
import Signup from "@pages/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "@/components/ui/provider";
import { Toaster } from "@/components/ui/toaster";

const Login = () => <div>로그인 페이지</div>;
const NotFound = () => <div>페이지를 찾을 수 없습니다</div>;

function App() {
  const { initialize } = useAuthStore();

  useEffect(() => {
    // 인증 초기화
    const unsubscribe = initialize();
    return () => {
      unsubscribe && unsubscribe();
    };
  }, [initialize]);

  return (
    <Provider>
      <BrowserRouter>
        <Header />
        <Routes>
          {/* 메인 페이지 */}
          <Route path="/" element={<Home />} />
          {/* 인증 */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
      <Toaster />
    </Provider>
  );
}

export default App;
