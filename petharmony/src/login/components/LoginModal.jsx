import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../common.css";
import "../styles/LoginModal.css";
import logo from "../../common/logo/assets/logo.png";
import LoginInput from "./LoginInput";
import LoginJoinButton from "../../common/button/components/LoginJoinButton";

const LoginModal = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmitLogin = (e) => {
        e.preventDefault();
        console.log(
            "Email: ", email,
            "Password: ", password
        );
        // TODO: 서버로 전송하는 로직 추가 예정
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
            <div className="login_modal">
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
        </>
    )
};

export default LoginModal;