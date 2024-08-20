import React, { useState } from "react";
import { Link } from 'react-router-dom';
import useAuthStore from "../../../store/useAuthStore";
import "../styles/Header.css";
import logo from "../assets/headerLogo.png";
import arrow from "../assets/arrow.png";

const Header = () => {
    // Zustand의 useAuthStore 훅을 사용하여 가져옴
    const { isLogin, name, role, logout } = useAuthStore((state) => ({
        isLogin: state.isLogin,
        name: state.name,
        role: state.role,
        logout: state.logout
    }));
    // 드롭다운 메뉴
    const [showDropDownMenu, setShowDropDownMenu] = useState(false);

    // 로그인을 했을 때 드롭다운 메뉴 : USER(마에페이지, 로그아웃) || ADMIN(신고목록, 로그아웃)
    const handleShowDropDownMenu = () => {
        setShowDropDownMenu(!showDropDownMenu);
    };

    // 로그아웃
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        localStorage.removeItem('name');
        localStorage.removeItem('role');
        logout();
    };

    return (
        <div className="header">
            <div className="header_container">
                <Link to="/">
                    <img className="header_logo" src={logo} alt="" />
                </Link>
                <ul className="header_nav">
                    <li><Link to="/matching">매칭</Link></li>
                    <li><Link to="/adoption">입양공고</Link></li>
                    <li><Link to="/board/list">게시판</Link></li>
                </ul>
                <div className="header_my">
                    {!isLogin ? (
                        <Link to="/login" className="header_login_btn">
                            로그인
                        </Link>
                    ) : (
                        <div className="header_user" onClick={handleShowDropDownMenu}>
                            <span>{name}님</span>
                            <img className="header_arrow" src={arrow} alt="" />
                            {showDropDownMenu && (
                                <div className="header_dropdown_menu">
                                    {role === '[ROLE_USER]' ? (
                                        <Link to="/mypage">마이페이지</Link>
                                    ) : (
                                        /*
                                            임시로 메인페이지로 이동(수정 예정)
                                            role이 '[ROLE_USER]'여도 URL로 접근 가능
                                            --> 접근 제어 하는 라우트 보호 적용 예정
                                        */
                                        <Link to="/">신고목록</Link>
                                    )}
                                    <Link to="/" onClick={handleLogout}>로그아웃</Link>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Header;