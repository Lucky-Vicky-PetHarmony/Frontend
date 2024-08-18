import React, { useState } from "react";
import { Link } from 'react-router-dom';
import "../../../common.css";
import "../styles/Header.css";
import logo from "../assets/headerLogo.png";
import arrow from "../assets/arrow.png";

const Header = () => {
    // 하드코딩
    const [isLogin, setIsLogin] = useState(true);
    const [showMenu, setShowMenu] = useState(false);

    const handleShowMenu = () => {
        setShowMenu(!showMenu);
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
                        <div className="header_user" onClick={handleShowMenu}>
                            <span>이백억님</span>
                            <img className="header_arrow" src={arrow} alt="" />
                            {showMenu && (
                                <div className="header_menu">
                                    <Link to="/mypage">마이페이지</Link>
                                    <Link to="/logout">로그아웃</Link>
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