import React, { useState } from "react";
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import useAuthStore from "../../../store/useAuthStore";
import useModalStore from "../../../store/useModalStore";
import "../styles/Header.css";
import layoutLogo from "../../logo/layoutLogo.png";
import arrow from "../assets/arrow.png";

const Header = () => {
    const openLoginModal = useModalStore((state) => state.openLoginModal);

    const { isLogin, name, role, logout } = useAuthStore((state) => ({
        isLogin: state.isLogin,
        name: state.name,
        role: state.role,
        logout: state.logout
    }));

     const location = useLocation();

     const navigate = useNavigate();

    const [showDropDownMenu, setShowDropDownMenu] = useState(false);

    // 로그인을 했을 때 드롭다운 메뉴 : USER(마에페이지, 로그아웃) || ADMIN(신고목록, 로그아웃)
    const handleShowDropDownMenu = () => {
        setShowDropDownMenu(!showDropDownMenu);
    };

    // 로그아웃
    const handleLogout = () => {
        logout();
    };

     // 매칭 페이지로 이동하기 전에 로그인 여부 확인
    const handleMoveMatching = (e) => {
        if (!isLogin) {
            e.preventDefault();  // 페이지 이동 차단
            alert('🐶 로그인이 필요한 서비스입니다.');
        } else {
            navigate('/matching-list');
        }
    };

    return (
        <div className="header">
            <div className="header_container">
                {/* 로고를 클릭하면 메인 페이지(/)로 이동 */}
                <NavLink to="/">
                    <img className="header_logo" src={layoutLogo} alt="" />
                </NavLink>
                <ul className="header_nav">
                    <li>
                        <NavLink
                            to="/matching-list"
                            style={{
                                color: location.pathname.startsWith('/matching-list') ? 'var(--color-blue)' : 'var(--color-black)',
                                fontWeight: location.pathname.startsWith('/matching-list') ? 'bold' : '500'
                            }}
                            onClick={handleMoveMatching}
                        >
                            매칭
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/adoption"
                            style={{
                                color: location.pathname.startsWith('/adoption') ? 'var(--color-blue)' : 'var(--color-black)',
                                fontWeight: location.pathname.startsWith('/adoption') ? 'bold' : '500'
                            }}
                        >
                            입양공고
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/board/list"
                            style={{
                                color: location.pathname.startsWith('/board') ? 'var(--color-blue)' : 'var(--color-black)',
                                fontWeight: location.pathname.startsWith('/board') ? 'bold' : '500'
                            }}
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