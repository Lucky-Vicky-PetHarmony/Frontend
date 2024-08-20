import React, { useState, useEffect } from "react";
import useModalStore from "../../store/useModalStore";
import axios from "axios";
import "../styles/JoinModal.css";
import logo from "../../common/logo/assets/logo.png";
import join_success from "../assets/join_success.png";
import JoinInput from "./JoinInput";
import LoginJoinButton from "../../common/button/components/LoginJoinButton";
import CancleButton from "../../common/button/components/CancelButton";

const JoinModal = () => {
    // Zustand의 useModalStore 훅을 사용하여 가져옴
    const { closeModal, openLoginModal } = useModalStore();
    // 이름
    const [name, setName] = useState("");
    // 이메일
    const [email, setEmail] = useState("");
    // 비밀번호
    const [password, setPassword] = useState("");
    // 비밀번호 확인
    const [passwordCheck, setPasswordCheck] = useState("");
    // 전화번호
    const [phone, setPhone] = useState("");
    // 회원가입 성공 여부
    const [joinSuccess, setJoinSuccess] = useState(false);
    // 회원 가입 성공 후 타이머
    const [count, setCount] = useState(3);
    // 이메일 정규식 패턴
    const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
    // 비밀번호 정규식 패턴
    const passwordRegEx = /^[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]{8,20}$/;

    // 회원가입 성공 시 3초 후에 로그인 모달을 열기 위한 useEffect
    useEffect(() => {
        let timer;
        if (joinSuccess && count > 0) {
            timer = setTimeout(() => {
                setCount(count - 1);
            }, 1000);
        } else if (joinSuccess && count === 0) {
            closeModal();       // 모달 닫기
            openLoginModal();   // 로그인 모달 열기
        }
        return () => clearTimeout(timer);
    }, [joinSuccess, count, closeModal, openLoginModal]);

    // 회원가입
    const handleSubmitJoin = async (e) => {
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

        const signUpData = {
            userName: name,
            email: email,
            password: password,
            phone: phone.replace(/-/g, '')
        };

        try {
            const response = await axios.post('http://localhost:8080/api/public/signUp', signUpData);

            if (response.status === 200) {
                alert(response.data);
                setJoinSuccess(true);
                setCount(3);
            } else {
                alert("회원가입 실패");
            }
        } catch (error) {
            if (error.response) {
                alert("회원가입 실패");
            } else if (error.requset) {
                alert("서버와의 통신 중 오류가 발생했습니다.");
            }
            console.error("Error: ", error);
        }
    };

    return (
        <div className="join_modal">
            {!joinSuccess ? (
                <>
                    <div className="join_exit" onClick={closeModal}>
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
            ) : (
                <>
                    <img className="jm_success_logo" src={join_success} alt="" />
                    <p className="jm_success_text">
                        {count}초 후 로그인 페이지로 이동합니다
                    </p>
                </>
            )}
        </div>
    );
};

export default JoinModal;