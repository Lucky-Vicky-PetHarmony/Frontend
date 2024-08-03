import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LoginModal.css";
import logo from "../../common/logo/assets/logo.png";
import LoginInput from "./LoginInput";
import LoginButton from "../../common/button/components/LoginJoinButton";

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
                        <LoginButton
                            mode="login"
                            type="submit"
                            onClick={handleLogin}
                        />
                        <LoginButton
                            mode="goJoin"
                        />
                    </div>
                    <div className="lm_social">
                        <LoginButton
                            mode="kakao"
                        />
                        <LoginButton
                            mode="google"
                        />
                    </div>
                </div>
            </div>
        </>
    )
};

export default LoginModal;