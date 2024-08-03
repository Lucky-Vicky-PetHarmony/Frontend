import React from "react";
import "../styles/LoginButton.css";
import kakao from "../assets/kakaoLogo.png";
import google from "../assets/googleLogo.png";

const LoginButton = ({ mode }) => {
    const isLoginMode = mode === "login";
    const isJoinMode = mode === "join";
    const isKakaoMode = mode === "kakao";
    const isGoogleMode = mode === "google";

    const getButtonClass = () => {
        let classes = "login_button";
        if (isLoginMode) classes += " login_mode";
        if (isJoinMode) classes += " join_mode";
        if (isKakaoMode || isGoogleMode) classes = "social_button";
        return classes;
    };

    return (
        <button className={getButtonClass()}>
            {isLoginMode ? (
                <p>로그인</p>
            ) : isJoinMode ? (
                <p>간편 회원가입</p>
            ) : isKakaoMode ? (
                <img src={kakao} alt="카카오톡 로그인" />
            ) : isGoogleMode ? (
                <img src={google} alt="구글 로그인" />
            ) : <></>
            }
        </button>
    );
};

export default LoginButton;