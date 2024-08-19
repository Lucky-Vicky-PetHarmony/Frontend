import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";
import axios from "axios";
import "../styles/LoginModal.css";
import logo from "../../common/logo/assets/logo.png";
import LoginInput from "./LoginInput";
import LoginJoinButton from "../../common/button/components/LoginJoinButton";
import CancleButton from "../../common/button/components/CancelButton";

const LoginModal = () => {
    const navigate = useNavigate();
    // store에서 login 함수 가져옴
    const login = useAuthStore((state) => state.login);
    // 모달 우측상단에 X 버튼
    const [isOpen, setIsOpen] = useState(true);
    // 이메일
    const [email, setEmail] = useState("");
    // 비밀번호
    const [password, setPassword] = useState("");

    // X 버튼
    const handleClose = () => {
        setIsOpen(false);
    };

    // 로그인
    const handleSubmitLogin = async (e) => {
        e.preventDefault();

        const loginData = {
            email: email,
            password: password
        };
    
        try {
            const response = await axios.post('http://localhost:8080/api/public/login', loginData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            if (response.status === 200) {
                const token = response.data.jwtToken;  // JWT 토큰
                const email = response.data.email;     // 이메일
                const name = response.data.userName;   // 회원 이름
                const role = response.data.role;       // 권한
                // localStorage에 저장 후 로그인
                localStorage.setItem('token', token);
                localStorage.setItem('email', email);
                localStorage.setItem('name', name);
                localStorage.setItem('role', role);
                login(token, email, name, role);
                alert("로그인 성공");
            } else {
                alert("로그인 실패");
            }
        } catch (error) {
            if (error.response) {
                alert("로그인 실패: " + error.response.data);
            } else if (error.request) {
                alert("서버와의 통신 중 오류가 발생했습니다.");
            }
            console.error("Error: ", error);
        }
    };

    // 간편 회원가입으로 이동
    const handleMoveJoin = (e) => {
        e.preventDefault();
        navigate('/join');
    };

    // 아이디 찾기로 이동
    const handleMoveFindId = (e) => {
        e.preventDefault();
        navigate('/find-account', { state: { mode: 'id' } });
    };

    // 비밀번호 찾기로 이동
    const handleMoveFindPassword = (e) => {
        e.preventDefault();
        navigate('/find-account', { state: { mode: 'password' } });
    };

    return (
        <>
            {isOpen && (
                <div className="login_modal">
                    <div className="login_exit" onClick={handleClose}>
                        <CancleButton />
                    </div>
                    <img className="lm_logo" src={logo} alt="로고" />
                    <div className="lm_login">
                        <LoginInput
                            setEmail={setEmail}
                            setPassword={setPassword}
                        />
                        <div className="lm_self">
                            <LoginJoinButton
                                mode="login"
                                type="submit"
                                onClick={handleSubmitLogin}
                            />
                            <LoginJoinButton
                                mode="joinForm"
                                onClick={handleMoveJoin}
                            />
                            <div className="lm_find">
                                <button className="lm_find_btn" onClick={handleMoveFindId}>이메일 찾기</button>
                                <span className="lm_find_line">|</span>
                                <button className="lm_find_btn" onClick={handleMoveFindPassword}>비밀번호 찾기</button>
                            </div>
                        </div>
                    </div>
                    <div className="lm_social">
                        <LoginJoinButton
                            mode="kakao"
                        />
                        <LoginJoinButton
                            mode="google"
                        />
                    </div>
                </div>
            )}
        </>
    )
};

export default LoginModal;