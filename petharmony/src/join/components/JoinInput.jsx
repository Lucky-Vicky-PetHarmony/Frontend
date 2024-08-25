import React, { useState, useEffect } from "react";
import "../styles/JoinInput.css";
import nameIcon from "../assets/join_name.png";
import emailIcon from "../assets/join_email.png";
import passwordIcon from "../assets/join_password.png";
import phoneIcon from "../assets/join_phone.png";

const JoinInput = ({ setName, setEmail, setPassword, setPasswordCheck, setPhone }) => {
    // 비밀번호 입력 필드
    const [localPassword, setLocalPassword] = useState("");
    // 비밀번호 확인 입력 필드
    const [localPasswordCheck, setLocalPasswordCheck] = useState("");
    // 비밀번호와 비밀번호 확인 필드의 값이 일치하지 않을 때 상태 : 일치하면 true
    const [passwordMismatch, setPasswordMismatch] = useState(false);
    // 전화번호 입력 필드
    const [localPhone, setLocalPhone] = useState("");

    // 이름 필드에 값 입력
    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    // 이메일 필드에 값 입력
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    // 비밀번호 필드에 값 입력
    const handlePasswordChange = (e) => {
        const passwordValue = e.target.value;
        setLocalPassword(passwordValue);
        setPassword(passwordValue);
    };

    // 비밀번호 확인 필드에 값 입력
    const handlePasswordCheckChange = (e) => {
        const passwordCheckValue = e.target.value;
        setLocalPasswordCheck(passwordCheckValue);
        setPasswordCheck(passwordCheckValue);
    };

    // 비밀번호 확인 필드에서 포커스를 잃었을 때 일치 여부 확인
    const handlePasswordCheckBlur = () => {
        if (localPasswordCheck !== "" && localPasswordCheck !== localPassword) {
            setPasswordMismatch(true);
        } else {
            setPasswordMismatch(false);
        }
    };

    // 전화번호 필드에 값 입력
    const handlePhoneChange = (e) => {
        const phoneValue = e.target.value.replace(/[^0-9]/g, '');
        setLocalPhone(phoneValue);
    };

    // 전화번호를 포맷팅하여 부모 컴포넌트로 전달
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