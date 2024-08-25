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
        e.preventDefault(); // 리로드 방지(비동기적으로 폼 데이터 서버에 전송)

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
            const response = await axios.post('http://localhost:8080/api/public/login', loginData);

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
                alert(response.data);
                closeModal();
            } else {
                alert(response.data);
            }
        } catch (error) {
            if (error.response) {
                alert(error.response.data);
                console.clear(); // 임시방편으로 콘솔 지우기 (배포할 때 라이브러리로 지워야됨)
            } else if (error.request) {
                alert("서버와의 통신 중 오류가 발생했습니다.");
            } else {
                alert("예기치 못한 오류가 발생했습니다: " + error.message);
            }
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
                <div className="lm_button">
                    <LoginJoinButton
                        mode="login"
                        type="submit"
                        onClick={handleSubmitLogin}
                    />
                    <LoginJoinButton
                        mode="joinForm"
                        onClick={openJoinModal}
                    />
                    <LoginJoinButton
                        mode="kakao"
                    />
                </div>
                <div className="lm_find">
                    <button className="lm_find_btn" onClick={() => openFindAccountModal('id')}>이메일 찾기</button>
                    <span className="lm_find_line">|</span>
                    <button className="lm_find_btn" onClick={() => openFindAccountModal('password')}>비밀번호 찾기</button>
                </div>
            </div>
        </div>
    )
};

export default LoginModal;