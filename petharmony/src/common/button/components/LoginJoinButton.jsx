import React from "react";
import "../styles/LoginJoinButton.css";
import kakao from "../assets/kakao_login_large_wide.png";

const LoginJoinButton = ({ mode, onClick }) => {
    // env에서 REST API 키 가져오기
    const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
    // 인가 코드 인증 후 리다리엑트될 URI 설정
    const REDIRECT_URI = `http://localhost:3000/oauth`;
    // 카카오 로그인 URL 생성
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    // 현재 모드에 따라 상태 확인
    const isLoginMode = mode === "login";         // 로그인
    const isJoinFormMode = mode === "joinForm";   // 간편 회원가입 하러가기
    const isKakaoMode = mode === "kakao";         // 카카오 로그인
    const isJoinMode = mode === "join";           // 회원가입

    // 버튼 클래스 이름을 동적으로 생성
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
                <div onClick={() => window.location.href = kakaoURL}>
                    <img className="kakaoBtn" src={kakao} alt="카카오싱크 로그인 버튼" />
                </div>
            ) : isJoinMode ? (
                <p>회 원 가 입</p>
            ) : <></>
            }
        </button>
    );
};

export default LoginJoinButton;