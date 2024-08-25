import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/dashboard/DeleteAccount.css";
import useAuthStore from "../../../store/useAuthStore";

const DeleteAccount = ({ token }) => {
    // useNavigate() 호출
    const navigate = useNavigate();
    // store에서 logout 함수 가져옴
    const logout = useAuthStore((state) => state.logout);

    // 회원 탈퇴
    const handleClick = async () => {
        try {
            const response = await axios.put('http://localhost:8080/api/user/deleteAccount', null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                // 로그아웃
                logout();
                alert("회원탈퇴 처리되었습니다.");
                navigate('/'); // 메인페이지로 이동
            }
        } catch (error) {
            console.error("회원탈퇴 처리에 실패했습니다.", error);
        }
    };

    return (
        <div className="delete_account">
            <p className="da_title">회원 탈퇴</p>
            <div className="da_content">
                <p>정말 탈퇴하시겠습니까?</p>
                <p>회원탈퇴시 작성한 게시물, 댓글, 좋아요 한 입양동물, 자신의 매칭기록 등</p>
                <p>활동기록이 사라집니다.</p>
                <p className="da_point">현재 이메일로 새로 회원가입이 불가합니다.</p>
            </div>
            <button className="da_btn" onClick={handleClick}>탈퇴하기</button>
        </div>
    )
}

export default DeleteAccount;