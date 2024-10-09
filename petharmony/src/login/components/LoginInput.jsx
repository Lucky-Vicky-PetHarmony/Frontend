import React from "react";
import "../styles/LoginInput.css";

const LoginInput = ({ setEmail, setPassword }) => {
    // 이메일 필드에 값 입력
    const handleEmailChage = (e) => {
        setEmail(e.target.value);
    };
    // 비밀번호 필드에 값 입력
    const handlePasswordChage = (e) => {
        setPassword(e.target.value);
    };

    return (
        <div className="login_input">
            <input
                className="li_email"
                placeholder="Email"
                type="email"
                onChange={handleEmailChage}
            />
            <input
                className="li_password"
                placeholder="Password"
                type="password"
                onChange={handlePasswordChage}
            />
        </div>
    );
};

export default LoginInput;