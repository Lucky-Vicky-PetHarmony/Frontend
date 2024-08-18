import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../../../common.css";
import "../../styles/nav/SideBar.css";

const SideBar = () => {
    const location = useLocation();

    const menuItems = [
        { name: '내 정보 수정', path: '/mypage/profile-edit' },
        { name: '비밀번호 변경', path: '/mypage/password-edit' },
        { name: '관심있는 입양동물', path: '/mypage/interested-pets' },
        { name: 'PIN 게시물', path: '/mypage/pin-posts' },
        { name: '내가 쓴 댓글', path: '/mypage/my-comments' },
        { name: '내가 쓴 게시물', path: '/mypage/my-posts' },
        { name: '회원 탈퇴', path: '/mypage/delete-account' }
    ];

    return (
        <div className="side_bar">
            <ul>
                {menuItems.map((item, index) => (
                    <li
                        key={index}
                        className={location.pathname === item.path ? 'active' : ''}
                    >
                        <Link to={item.path}>{item.name} </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SideBar;