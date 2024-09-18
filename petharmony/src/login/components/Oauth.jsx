/*
    Kakao 로그인 페이지에서 인증을 완료하고 돌아올 때, 
    엑세스 토큰을 받아서 서버에 전달하고 JWT 토큰을 생성한 후
    사용자 정보를 localStorage에 저장하며 로그인 처리
*/
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";
import axios from "axios";
import axiosInstance from "../../api/axiosConfig";

export function Oauth() {
    const navigate = useNavigate();

    const login = useAuthStore((state) => state.login);

    const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
    const REDIRECT_URI = `http://localhost:3000/oauth`;
    const code = new URL(window.location.href).searchParams.get("code");

    // 인가 코드를 사용하여 엑세스 토큰을 요청
    const getCode = async () => {
        try {
            // Kakao의 토큰 발급 API에 POST 요청
            const response = await axios.post('https://kauth.kakao.com/oauth/token', {
                grant_type: "authorization_code",
                client_id: REST_API_KEY,
                redirect_uri: REDIRECT_URI,
                code: code    // 인가코드
            }, {
                headers: {
                    "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
                },
            });
            return response;
        } catch (error) {
            console.error("요청을 실패하였습니다.", error);
            throw error;
        }
    };

    /*
      인가 코드가 존재하면, getCode()를 호출하여 kakao 서버로부터 엑세스 토큰 받아옴
      응답 받은 엑세스 토큰을 서버로 전달
      (서버에서는 kakao 인증 정보를 바탕으로 추가적인 사용자 정보를 얻음)
      서버의 응답(토큰, 이름, 이메일, 역할)을 추출하여 localStorage에 저장 (이 정보를 통해 로그인 유지)
      useAuthStore 흑의 login 메소드 호출하여 로그인 처리 -> 메인 페이지 리다이렉트
    */
    useEffect(() => {
        if (code) {
            getCode()    // 액세스 토큰 받기
                .then(response => {
                    if (response && response.data.access_token) {
                        // 액세스 토큰을 얻으면 이를 서버에 전달
                        return axiosInstance.post("/api/auth/kakao", {
                            accessToken: response.data.access_token
                        });
                    } else {
                        throw new Error("액세스 토큰이 없습니다.");
                    }
                })
                .then(res => {
                    if (res.status === 200) {
                        const token = res.data.jwtToken;  // JWT 토큰
                        const email = res.data.email;     // 이메일
                        const name = res.data.userName;   // 회원 이름
                        const role = res.data.role;       // 권한
                        const userId = res.data.userId    // 회원 번호
        
                        login(token, email, name, role, userId);
                        navigate("/");
                    } else {
                        throw new Error("🐶 카카오 로그인에 오류가 발생했습니다.");
                    }
                })
                .catch(err => console.error("Error:", err));
        }
    }, [code]);

    // UI를 렌더링하지 않음
    return <></>;
}

export default Oauth;