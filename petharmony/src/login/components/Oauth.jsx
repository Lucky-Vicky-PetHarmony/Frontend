/*
    Kakao 로그인 페이지에서 인증을 완료하고 돌아올 때, 
    엑세스 토큰을 받아서 서버에 전달하고 JWT 토큰을 생성한 후
    사용자 정보를 localStorage에 저장하며 로그인 처리
*/
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";
import axios from "axios";

export function Oauth() {
    const navigate = useNavigate();
    // store에서 login 함수 가져옴
    const login = useAuthStore((state) => state.login);
    // REST API KEY
    const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
    // Redirect URI
    const REDIRECT_URI = `http://localhost:3000/oauth`;
    // Kakao에서 제공하는 인가 코드
    const code = new URL(window.location.href).searchParams.get("code");

    // Kakao로부터 액세스 토큰을 받기 위한 함수
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

    // 인가코드(code)가 존재하는 경우 Kakao에서 엑세스 토큰을 가져오는 작업
    useEffect(() => {
        if (code) {
            getCode()    // 액세스 토큰 받기
                .then(response => {
                    if (response && response.data.access_token) {
                        // 액세스 토큰을 얻으면 이를 서버에 전달하여 JWT 토큰을 받는다.
                        return axios.post("http://localhost:8080/api/public/kakao", {
                            accessToken: response.data.access_token
                        });
                    } else {
                        throw new Error("액세스 토큰이 없습니다.");
                    }
                })
                .then(res => {
                    if (res.status === 200) {
                        const token = res.data.jwtToken;   // JWT 토큰
                        const email = res.data.email;      // 이메일
                        const name = res.data.userName;    // 이름
                        const role = res.data.role;        // 역할
                        // localStorage에 저장 후 로그인
                        localStorage.setItem('token', token);
                        localStorage.setItem('email', email);
                        localStorage.setItem('name', name);
                        localStorage.setItem('role', role);
                        login(token, email, name, role);
                        alert("로그인 성공");
                        navigate("/");
                    } else {
                        throw new Error("카카오 로그인에 오류가 발생했습니다.");
                    }
                })
                .catch(err => console.error("Error:", err));
        }
    }, [code]);

    // UI를 렌더링하지 않음
    return <></>;
}

export default Oauth;