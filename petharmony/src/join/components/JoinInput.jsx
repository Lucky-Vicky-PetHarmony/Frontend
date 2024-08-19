import React, { useState, useEffect } from "react";
import "../styles/JoinInput.css";
import nameIcon from "../assets/join_name.png";
import emailIcon from "../assets/join_email.png";
import passwordIcon from "../assets/join_password.png";
import phoneIcon from "../assets/join_phone.png";

const JoinInput = ({ setName, setEmail, setPassword, setPasswordCheck, setPhone }) => {
    const [localPassword, setLocalPassword] = useState("");
    const [localPasswordCheck, setLocalPasswordCheck] = useState("");
    const [passwordMismatch, setPasswordMismatch] = useState(false);
    const [localPhone, setLocalPhone] = useState("");

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        const passwordValue = e.target.value;
        setLocalPassword(passwordValue);
        setPassword(passwordValue);
    };

    const handlePasswordCheckChange = (e) => {
        const passwordCheckValue = e.target.value;
        setLocalPasswordCheck(passwordCheckValue);
        setPasswordCheck(passwordCheckValue);
    };

    const handlePasswordCheckBlur = () => {
        if (localPasswordCheck !== "" && localPasswordCheck !== localPassword) {
            setPasswordMismatch(true);
        } else {
            setPasswordMismatch(false);
        }
    };

    const handlePhoneChange = (e) => {
        const phoneValue = e.target.value.replace(/[^0-9]/g, '');
        setLocalPhone(phoneValue);
    };

    useEffect(() => {
        let formattedPhone = localPhone;
        if (localPhone.length === 11) {
            formattedPhone = localPhone.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
        }
        setPhone(formattedPhone);
    }, [localPhone, setPhone]);

    return (
        <div className="join_input">
            <div className="ji_container">
                <img src={nameIcon} alt="이름 아이콘" className="ji_icon" />
                <input
                    placeholder="이름"
                    type="text"
                    maxLength={10}
                    onChange={handleNameChange}
                />
            </div>
            <div className="ji_container">
                <img src={emailIcon} alt="이메일 아이콘" className="ji_icon" />
                <input
                    placeholder="이메일"
                    type="email"
                    onChange={handleEmailChange}
                />
            </div>
            <div className="ji_container">
                <img src={passwordIcon} alt="비밀번호 아이콘" className="ji_icon" />
                <input
                    placeholder="비밀번호"
                    type="password"
                    onChange={handlePasswordChange}
                />
            </div>
            <div className="ji_container">
                <img src={passwordIcon} alt="비밀번호 아이콘" className="ji_icon" />
                <input
                    className={`ji_password ${passwordMismatch ? 'password-mismatch' : ''}`}
                    placeholder="비밀번호 확인"
                    type="password"
                    onChange={handlePasswordCheckChange}
                    onBlur={handlePasswordCheckBlur}
                />
            </div>
            <div className="ji_container">
                <img src={phoneIcon} alt="전화번호 아이콘" className="ji_icon" />
                <input
                    placeholder="전화번호"
                    type="text"
                    maxLength={13}
                    value={localPhone.replace(/(\d{3})(\d{3,4})(\d{4})/, '$1-$2-$3')}
                    onChange={handlePhoneChange}
                />
            </div>
        </div>
    );
};

export default JoinInput;