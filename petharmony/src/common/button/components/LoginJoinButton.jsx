import React from "react";
import "../../../common.css";
import "../styles/LoginJoinButton.css";
import kakao from "../../../login/assets/kakaoLogo.png";

const LoginJoinButton = ({ mode, onClick }) => {
    const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
    const REDIRECT_URI = `http://localhost:3000/oauth`;
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

    const isLoginMode = mode === "login";
    const isJoinFormMode = mode === "joinForm";
    const isKakaoMode = mode === "kakao";
    const isJoinMode = mode === "join";

    const getButtonClass = () => {
        let classes = "login_button";
        if (isLoginMode) classes += " login_mode";
        if (isJoinFormMode) classes += " join_form_mode";
        if (isJoinMode) classes += " join_mode";
        if (isKakaoMode) classes = "social_button";
        return classes;
    };

    return (
        <button className={getButtonClass()} onClick={onClick}>
            {isLoginMode ? (
                <p>로 그 인</p>
            ) : isJoinFormMode ? (
                <p>간 편 회 원 가 입</p>
            ) : isKakaoMode ? (
                <div className="ljb_set">
                    <div onClick={() => window.location.href = kakaoURL}>
                        <img src={kakao} alt="카카오톡 로그인" />
                    </div>
                    <span>카카오톡 로그인</span>
                </div>
            ) : isJoinMode ? (
                <p>회 원 가 입</p>
            ) : <></>
            }
        </button>
    );
};

export default LoginJoinButton;