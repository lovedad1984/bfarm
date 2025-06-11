import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const location = useLocation();
  console.log(location);
  useEffect(() => {
    // 페이지 이동시 스크롤 맨 위로 초기화
    window.scrollTo(0, 0);
  }, [pathname]);
  // 이 컴포넌트는 아무것도 렌더링 하지 않는다
  return null;
};

export default ScrollToTop;
