import React, { useState } from "react";
import "../styles/JoinModal.css";
import logo from "../../common/logo/assets/logo.png";
import JoinInput from "./JoinInput";
import LoginJoinButton from "../../common/button/components/LoginJoinButton";

const JoinModal = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");
    const [phone, setPhone] = useState("");

    const handleJoin = (e) => {
        e.preventDefault();
        console.log(
            "Name: ", name,
            "Email: ", email,
            "Password: ", password,
            "PasswordCheck", passwordCheck,
            "Phone", phone
        );
    };

    return (
        <>
            <div className="join_modal">
                <img className="jm_logo" src={logo} alt="로고" />
                <p className="jm_msg">
                    PetHarmony에 오신걸 환영합니다
                </p>
                <JoinInput
                    setName={setName}
                    setEmail={setEmail}
                    setPassword={setPassword}
                    setPasswordCheck={setPasswordCheck}
                    setPhone={setPhone}
                />
                <div className="jm_button">
                    <LoginJoinButton
                        mode="join"
                        onClick={handleJoin}
                    />
                </div>
            </div>
        </>
    );
};

export default JoinModal;