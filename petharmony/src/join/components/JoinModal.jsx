import React, { useState, useEffect } from "react";
import useModalStore from "../../store/useModalStore";
import axiosInstance from "../../api/axiosConfig";
import "../styles/JoinModal.css";
import logo from "../../common/logo/assets/logo.png";
import join_success from "../assets/join_success.png";
import JoinInput from "./JoinInput";
import LoginJoinButton from "../../common/button/components/LoginJoinButton";
import CancleButton from "../../common/button/components/CancelButton";

const JoinModal = () => {
    const { closeModal, openLoginModal } = useModalStore();
    
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");
    const [phone, setPhone] = useState("");
    const [joinSuccess, setJoinSuccess] = useState(false);
    const [count, setCount] = useState(3);
    // 이메일 정규식 패턴 : 첫문자는 영문 대소문자 또는 숫자로 시작, @ 문자 이후 영문 대소문자 또는 숫자가 오고, 이후에는 2~3자리의 영문 대소문자가 와야함
    const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
    // 비밀번호 정규식 패턴 : 8자 ~ 20자 사의 영문 대소문자, 숫자 또는 특정 특수문자로 구성됨
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
        e.preventDefault(); // 리로드 방지(비동기적으로 폼 데이터 서버에 전송)

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
            const response = await axiosInstance.post('/api/public/signUp', signUpData);

            if (response.status === 200) {
                alert(response.data);
                setJoinSuccess(true);
                setCount(3);
            } else {
                alert(response.data);
            }
        } catch (error) {
            if (error.response) {
                alert(error.response.data);
                console.clear(); // 임시방편으로 콘솔 지우기 (배포할 때 라이브러리로 지워야됨)
            } else if (error.request) {
                alert("서버와의 통신 중 오류가 발생했습니다.");
            } else {
                alert("예기치 못한 오류가 발생했습니다: " + error.message);
            }
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