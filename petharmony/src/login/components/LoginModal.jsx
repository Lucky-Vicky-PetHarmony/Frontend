import React, { useState } from "react";
import useAuthStore from "../../store/useAuthStore";
import useModalStore from "../../store/useModalStore";
import axios from "axios";
import "../styles/LoginModal.css";
import logo from "../../common/logo/assets/logo.png";
import LoginInput from "./LoginInput";
import LoginJoinButton from "../../common/button/components/LoginJoinButton";
import CancleButton from "../../common/button/components/CancelButton";


const LoginModal = () => {
    // store에서 login 함수 가져옴
    const login = useAuthStore((state) => state.login);
    // Zustand의 useModalStore 훅을 사용하여 가져옴
    const { closeModal, openJoinModal, openFindAccountModal } = useModalStore();
    // 이메일
    const [email, setEmail] = useState("");
    // 비밀번호
    const [password, setPassword] = useState("");

    // 로그인
    const handleSubmitLogin = async (e) => {
        e.preventDefault();

        if (!email) {
            alert("이메일을 입력해주세요.");
            return;
        }

        if (!password) {
            alert("비밀번호를 입력해주세요.");
            return;
        }

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
                const userId = response.data.userId    // 회원 번호

                // localStorage에 저장 후 로그인
                localStorage.setItem('token', token);
                localStorage.setItem('email', email);
                localStorage.setItem('name', name);
                localStorage.setItem('role', role);
                localStorage.setItem('userId', userId);
                login(token, email, name, role, userId);
                alert("로그인 성공");
                closeModal();
            } else {
                alert("로그인 실패");
            }
        } catch (error) {
            if (error.response) {
                console.log(error.response);
                alert("존재하지 않는 계정입니다.");
            } else if (error.request) {
                alert("서버와의 통신 중 오류가 발생했습니다.");
            }
            console.error("Error: ", error);
        }
    };

    return (
        <div className="login_modal">
            <div className="login_exit" onClick={closeModal}>
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
                        onClick={openJoinModal}
                    />
                    <div className="lm_find">
                        <button className="lm_find_btn" onClick={() => openFindAccountModal('id')}>이메일 찾기</button>
                        <span className="lm_find_line">|</span>
                        <button className="lm_find_btn" onClick={() => openFindAccountModal('password')}>비밀번호 찾기</button>
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
    )
};

export default LoginModal;