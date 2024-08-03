import React from "react";
import "../styles/JoinInput.css";
import nameIcon from "../assets/join_name.png";
import emailIcon from "../assets/join_email.png";
import passwordIcon from "../assets/join_password.png";
import phoneIcon from "../assets/join_phone.png";

const JoinInput = ({ setName, setEmail, setPassword, setPasswordCheck, setPhone }) => {

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handlePasswordCheckChange = (e) => {
        setPasswordCheck(e.target.value);
    };

    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
    };

    return (
        <>
            <div className="join_input">
                <div className="ji_container">
                    <img src={nameIcon} alt="이름 아이콘" className="ji_icon" />
                    <input
                        className="ji_name"
                        placeholder="이름"
                        type="text"
                        onChange={handleNameChange}
                    />
                </div>
                <div className="ji_container">
                    <img src={emailIcon} alt="이메일 아이콘" className="ji_icon" />
                    <input
                        className="ji_email"
                        placeholder="이메일"
                        type="email"
                        onChange={handleEmailChange}
                    />
                </div>
                <div className="ji_container">
                    <img src={passwordIcon} alt="비밀번호 아이콘" className="ji_icon" />
                    <input
                        className="ji_password"
                        placeholder="비밀번호"
                        type="password"
                        onChange={handlePasswordChange}
                    />
                </div>
                <div className="ji_container">
                    <img src={passwordIcon} alt="비밀번호 아이콘" className="ji_icon" />
                    <input
                        className="ji_password"
                        placeholder="비밀번호 확인"
                        type="password"
                        onChange={handlePasswordCheckChange}
                    />
                </div>
                <div className="ji_container">
                    <img src={phoneIcon} alt="전화번호 아이콘" className="ji_icon" />
                    <input
                        className="ji_phone"
                        placeholder="전화번호"
                        type="text"
                        onChange={handlePhoneChange}
                    />
                </div>
            </div>
        </>
    );
};

export default JoinInput;