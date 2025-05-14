import { ChakraProvider } from "@chakra-ui/react";
import { useEffect, useState } from "react";
// import "./App.css";
import { useAuthStore } from "./store/authStore";
import system from "./theme";

// 레이아웃 컴포넌트

import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// 임시

const Home = () => <div>홈페이지</div>;
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
    <ChakraProvider value={system}>
      <BrowserRouter>
        <Header />
        <Routes>
          {/* 메인 페이지 */}
          <Route path="/" element={<Home />} />
          {/* 인증 */}
          <Route path="/login" element={<Login />} />
          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
