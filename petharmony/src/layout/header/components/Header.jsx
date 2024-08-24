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
        logout();
    };

    return (
        <div className="header">
            <div className="header_container">
                {/* 로고를 클릭하면 메인 페이지(/)로 이동 */}
                <NavLink to="/">
                    <img className="header_logo" src={layoutLogo} alt="" />
                </NavLink>
                {/* 각 네비게이션 링크: 활성화된 페이지일 경우 텍스트 굵기(fontWeight)를 700으로 설정 */}
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
                     {/* 로그인 여부에 따른 조건부 렌더링 */}
                    {!isLogin ? (
                        <button className="header_login_btn" onClick={openLoginModal}>
                            로그인
                        </button>
                    ) : (
                        // 로그인한 상태일 때 사용자 이름과 드롭다운 메뉴 표시
                        <div className="header_user" onClick={handleShowDropDownMenu}>
                            <span>{name}님</span>
                            <img className="header_arrow" src={arrow} alt="" />
                            {/* 드롭다운 메뉴 표시: role에 따라 조건부 렌더링 */}
                            {showDropDownMenu && (
                                <div className="header_dropdown_menu">
                                    {role !== '[ROLE_ADMIN]' ? (
                                        <NavLink to="/mypage">마이페이지</NavLink>
                                    ) : (
                                        /*
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