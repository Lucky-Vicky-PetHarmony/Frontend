import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LoginModal.css";
import logo from "../../common/logo/assets/logo.png";
import LoginInput from "./LoginInput";
import LoginJoinButton from "../../common/button/components/LoginJoinButton";

const LoginModal = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        console.log(
            "Email: ", email,
            "Password: ", password
        );
    };

    const handleGoJoin = (e) => {
        e.preventDefault();
        navigate('/join');
    };

    const handleFindId = (e) => {
        e.preventDefault();
        navigate('/find-account', { state: { mode: 'id' } });
    };

    const handleFindPassword = (e) => {
        e.preventDefault();
        navigate('/find-account', { state: { mode: 'password' } });
    };

    return (
        <>
            <div className="login_modal">
                <img className="lm_logo" src={logo} alt="로고" />
                <div className="lm_form">
                    <LoginInput
                        setEmail={setEmail}
                        setPassword={setPassword}
                    />
                    <div className="lm_self">
                        <LoginJoinButton
                            mode="login"
                            type="submit"
                            onClick={handleLogin}
                        />
                        <LoginJoinButton
                            mode="goJoin"
                            onClick={handleGoJoin}
                        />
                        <div className="lm_find">
                            <button className="lm_find_btn" onClick={handleFindId}>이메일 찾기</button>
                            <span className="lm_find_line">|</span>
                            <button className="lm_find_btn" onClick={handleFindPassword}>비밀번호 찾기</button>
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
        </>
    )
};

export default LoginModal;