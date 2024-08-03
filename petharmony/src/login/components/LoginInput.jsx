import React from "react";
import "../styles/LoginInput.css";

const LoginInput = () => {

    return (
        <>
            <div className="login_input">
                <input
                    className="li_email"
                    placeholder="Email"
                    type="email"
                />
                 <input
                    className="li_password"
                    placeholder="Password"
                    type="password"
                />
            </div>
        </>
    );
};

export default LoginInput;