import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
    // useLocation 훅으르 사용하여 현재 라우트 경로 가져옴
    const { pathname } = useLocation();

    // pathname이 변경될 때마다 스크롤 위치 (0, 0) 설정하여 맨 위로 이동
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

export default ScrollToTop;