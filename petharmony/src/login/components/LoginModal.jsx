import React from "react";
import "../styles/LoginModal.css";
import logo from "../../common/logo/assets/logo.png";
import LoginInput from "./LoginInput";
import LoginButton from "./LoginButton";

const LoginModal = () => {
    return (
        <>
            <div className="login_modal">
                <img className="lm_logo" src={logo} alt="로고" />
                <form className="lm_form">
                    <LoginInput />
                    <div className="lm_self">
                        <LoginButton
                            mode="login"
                        />
                        <LoginButton
                            mode="join"
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
                </form>
            </div>
        </>
    )
};

export default LoginModal;