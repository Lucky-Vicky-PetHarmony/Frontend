import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0); // pathname이 변경될 때마다 스크롤 위치를 맨 위로 설정
    }, [pathname]);

    return null;
};

export default ScrollToTop;