import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../common.css";
import "../styles/LoginModal.css";
import logo from "../../common/logo/assets/logo.png";
import LoginInput from "./LoginInput";
import LoginJoinButton from "../../common/button/components/LoginJoinButton";
import CancleButton from "../../common/button/components/CancelButton";

const LoginModal = () => {
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(true);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleClose = () => {
        setIsOpen(false);
    };

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

    const handleMoveJoin = (e) => {
        e.preventDefault();
        navigate('/join');
    };

    const handleMoveFindId = (e) => {
        e.preventDefault();
        navigate('/find-account', { state: { mode: 'id' } });
    };

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