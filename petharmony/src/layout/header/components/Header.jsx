import React, { useState } from "react";
import { NavLink } from 'react-router-dom';
import useAuthStore from "../../../store/useAuthStore";
import useModalStore from "../../../store/useModalStore";
import "../styles/Header.css";
import layoutLogo from "../../logo/layoutLogo.png";
import arrow from "../assets/arrow.png";

const Header = () => {
    // Zustand의 useModalStore 훅을 사용하여 가져옴
    const openLoginModal = useModalStore((state) => state.openLoginModal);
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
        localStorage.clear();
        logout();
    };

    return (
        <div className="header">
            <div className="header_container">
                <NavLink to="/" isLogin={isLogin}>
                    <img className="header_logo" src={layoutLogo} alt="" />
                </NavLink>
                <ul className="header_nav">
                <li>
                        <NavLink 
                            to="/matching" 
                            style={({ isActive }) => ({
                                fontWeight: isActive ? '700' : 'normal'
                            })}
                        >
                            매칭
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/adoption" 
                            style={({ isActive }) => ({
                                fontWeight: isActive ? '700' : 'normal'
                            })}
                        >
                            입양공고
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/board/list" 
                            style={({ isActive }) => ({
                                fontWeight: isActive ? '700' : 'normal'
                            })}
                        >
                            게시판
                        </NavLink>
                    </li>
                </ul>
                <div className="header_my">
                    {!isLogin ? (
                        <button className="header_login_btn" onClick={openLoginModal}>
                            로그인
                        </button>
                    ) : (
                        <div className="header_user" onClick={handleShowDropDownMenu}>
                            <span>{name}님</span>
                            <img className="header_arrow" src={arrow} alt="" />
                            {showDropDownMenu && (
                                <div className="header_dropdown_menu">
                                    {role !== '[ROLE_ADMIN]' ? (
                                        <NavLink to="/mypage">마이페이지</NavLink>
                                    ) : (
                                        /*
                                            임시로 메인페이지로 이동(수정 예정)
                                            role이 '[ROLE_USER]'여도 URL로 접근 가능
                                            --> 접근 제어 하는 라우트 보호 적용 예정
                                        */
                                        <NavLink to="/admin/report">신고목록</NavLink>
                                    )}
                                    <NavLink to="/" onClick={handleLogout}>로그아웃</NavLink>
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