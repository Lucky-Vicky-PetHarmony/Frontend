import React from "react";
import "../styles/LoginInput.css";

const LoginInput = ({ setEmail, setPassword }) => {

    const handleEmailChage = (e) => {
        setEmail(e.target.value);
    };

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