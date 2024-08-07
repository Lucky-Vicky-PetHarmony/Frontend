import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../common.css";
import "../styles/JoinModal.css";
import logo from "../../common/logo/assets/logo.png";
import join_success from "../assets/join_success.png";
import JoinInput from "./JoinInput";
import LoginJoinButton from "../../common/button/components/LoginJoinButton";
import CancleButton from "../../common/button/components/CancelButton";

const JoinModal = ({ onClose = () => { } }) => {
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(true);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");
    const [phone, setPhone] = useState("");

    const [joinSuccess, setJoinSuccess] = useState(false);
    const [count, setCount] = useState(3);

    const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
    const passwordRegEx = /^[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]{8,20}$/;

    useEffect(() => {
        let timer;
        if (joinSuccess && count > 0) {
            timer = setTimeout(() => {
                setCount(count - 1);
            }, 1000);
        } else if (joinSuccess && count === 0) {
            onClose();
            navigate('/login');   // 메인페이지로 이동(임시로 로그인 폼으로 이동)
        }
        return () => clearTimeout(timer);
    }, [joinSuccess, count, onClose, navigate]);

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleSubmitJoin = (e) => {
        e.preventDefault();

        if (!name || !email || !password || !passwordCheck || !phone) {
            alert("모든 항목을 입력해주세요.");
            return;
        }

        if (!emailRegEx.test(email)) {
            alert("이메일 형식이 올바르지 않습니다.");
            return
        }

        if (!passwordRegEx.test(password)) {
            alert("비밀번호는 8-20자로 구성되어야 합니다.");
            return;
        }

        if (password !== passwordCheck) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        console.log(
            "Name: ", name,
            "Email: ", email,
            "Password: ", password,
            "PasswordCheck", passwordCheck,
            "Phone", phone
        );

        // TODO: 서버로 전송하는 로직 추가 예정
        setJoinSuccess(true);
        setCount(3);
    };

    return (
        <>
            {isOpen && (
                <div className="join_modal">
                    {!joinSuccess ? (
                        <>
                            <div className="join_exit" onClick={handleClose}>
                                <CancleButton />
                            </div>
                            <img className="jm_logo" src={logo} alt="로고" />
                            <p className="jm_msg">
                                PetHarmony에 오신걸 환영합니다
                            </p>
                            <div className="jm_form">
                                <JoinInput
                                    setName={setName}
                                    setEmail={setEmail}
                                    setPassword={setPassword}
                                    setPasswordCheck={setPasswordCheck}
                                    setPhone={setPhone}
                                />
                            </div>
                            <p className="jm_phone_msg">
                                * 아이디, 비밀번호 찾기에 사용됩니다. 정확히 작성해주세요.
                            </p>
                            <div className="jm_button">
                                <LoginJoinButton
                                    mode="join"
                                    onClick={handleSubmitJoin}
                                />
                            </div>
                        </>
                    ) :
                        <>
                            <img className="jm_success_logo" src={join_success} alt="" />
                            <p className="jm_success_text">
                                {count}초 후 메인페이지로 이동합니다
                            </p>
                        </>
                    }
                </div>
            )}
        </>
    );
};

export default JoinModal;