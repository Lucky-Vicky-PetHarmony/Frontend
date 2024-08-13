import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "../../../common.css";
import "../../styles/find/FindAccount.css";
import logo from "../../../common/logo/assets/logo.png";
import findId from "../../assets/find/find_id.png";
import findPassword from "../../assets/find/find_password.png";
import CancleButton from "../../../common/button/components/CancelButton";

const FindAccount = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const mode = location.state?.mode;

    const [isOpen, setIsOpen] = useState(true);

    const isFindIdMode = mode === 'id';
    const isFindPasswordMode = mode === 'password';

    // 아이디 찾기
    const [phone, setPhone] = useState("");
    const [localPhone, setLocalPhone] = useState("");
    const [isClick, setIsClick] = useState(false);
    const [verificationMsg, setVerifivationMsg] = useState("");
    const [certificationNumber, setCertificationNumber] = useState("");
    const [checkMsg, setCheckMsg] = useState("");
    const [isFinishId, setIsFinishId] = useState(false);

    // API 응답 데이터 저장을 위한 상태
    const [userEmail, setUserEmail] = useState("");
    const [userCreateDate, setUserCreateDate] = useState("");
    const [responseMessage, setResponseMessage] = useState("");
    const [formattedDate, setFormattedDate] = useState("");

    // 비밀번호 찾기
    const [email, setEmail] = useState("");
    const [failMsg, setFailMsg] = useState("");
    const [isFinishPassword, setIsFinishPassword] = useState(false);
    const [count, setCount] = useState(3);

    const handleClose = () => {
        setIsOpen(false);
    };

    useEffect(() => {
        let timer;
        if (isFinishPassword && count > 0) {
            timer = setTimeout(() => {
                setCount(count - 1);
            }, 1000);
        } else if (isFinishPassword && count === 0) {
            navigate('/login');
        }
        return () => clearTimeout(timer);
    }, [isFinishPassword, count, navigate]);

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
    }, [localPhone]);

    const handleRequestNumber = async () => {
        const phoneData = {
            phone: phone.replace(/-/g, '')
        };

        setIsClick(true);

        try {
            const response = await axios.post('http://localhost:8080/api/public/send-certification', phoneData);

            const message = response.data;

            if (response.status === 200) {
                setVerifivationMsg(message);
                if (message === "인증번호가 전송되었습니다.") {
                    setCertificationNumber("");
                } else {
                    setIsClick(false);
                }
            } else {
                setVerifivationMsg(message);
                setIsClick(false);
            }
        } catch (error) {
            setVerifivationMsg("서버와의 통신에 실패했습니다.");
            setIsClick(false);
            console.error(error);
        }
    };

    const messageStyle = {
        color: verificationMsg === "인증번호가 전송되었습니다." ? "var(--color-blue)" : "var(--color-red)",
    };

    const handleCertificationNumberChange = (e) => {
        const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 4);
        setCertificationNumber(value);
    };

    const handleCommitNumber = async () => {
        const certificationData = {
            phone: phone.replace(/-/g, ''),
            certificationNumber: certificationNumber
        };

        try {
            const response = await axios.post('http://localhost:8080/api/public/check-certification', certificationData);

            if (response.status === 200) {
                const responseData = response.data;

                setUserEmail(responseData.email || "");
                setUserCreateDate(responseData.createDate || "");
                setResponseMessage(responseData.responseMsg || "");

                if (responseData.createDate) {
                    const date = new Date(responseData.createDate);
                    setFormattedDate(date.toISOString().slice(0, 10).replace(/-/g, '.'));
                }

                if (responseData.email) {
                    setIsFinishId(true);
                } else {
                    setCheckMsg(responseMessage);
                }
            } else {
                setCheckMsg("인증에 실패했습니다.");
            }
        } catch (error) {
            setCheckMsg("서버와의 통신에 실패했습니다.");
            console.error(error);
        }
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const hanldeSendEmail = async () => {
        const emailData = {
            email: email
        };

        try {
            const response = await axios.post('http://localhost:8080/api/public/send-email', emailData);

            if (response.status === 200) {
                if (response.data === "임시 비밀번호가 이메일로 발송되었습니다.") {
                    setIsFinishPassword(true);
                } else {
                    setFailMsg(response.data);
                }
            } else {
                setFailMsg(response.data);
            }
        } catch {
            setFailMsg("이메일 전송에 실패하였습니다.")
        }
    };

    const handleMoveLogin = () => {
        navigate("/login");
    };

    const handleMoveFindPassword = () => {
        setIsFinishId(false);
        setIsFinishPassword(false);
        navigate("/find-account", { state: { mode: 'password' } });
    };

    const title = isFindIdMode
        ? (
            <>
                <p>아이디를 잊어버리셨나요?</p>
                <p className="fa_title_margin">회원가입 시 작성하셨던 핸드폰 번호로 인증해주세요</p>
            </>
        )
        : (
            <>
                <p>비밀번호를 잊어버리셨나요?</p>
                <p className="fa_title_margin">회원가입 시 작성하셨던 이메일로 인증해주세요</p>
            </>
        );

    const idContent = (
        !isFinishId ? (
            <div className="fa_id_content">
                <div className="fa_id_content_req">
                    <input
                        className="fa_id_contnet_req_tel"
                        type="text"
                        placeholder="전화번호 입력"
                        maxLength={13}
                        value={localPhone.replace(/(\d{3})(\d{3,4})(\d{4})/, '$1-$2-$3')}
                        onChange={handlePhoneChange}
                    />
                    <button className="fa_id_content_req_btn" onClick={handleRequestNumber} disabled={isClick}>
                        인증번호 요청
                    </button>
                </div>
                {verificationMsg && <p className="fa_content_msg" style={messageStyle}>{verificationMsg}</p>}
                {verificationMsg === "인증번호가 전송되었습니다." && (
                    <div>
                        <div className="fa_id_content_verify">
                            <input
                                className="fa_id_content_verify_input"
                                type="text"
                                placeholder="인증번호"
                                value={certificationNumber}
                                onChange={handleCertificationNumberChange}
                                maxLength={4}
                            />
                            <button className="fa_id_content_verify_btn" onClick={handleCommitNumber}>
                                인증
                            </button>
                        </div>
                        {checkMsg && <p className="fa_id_content_verify_msg">{checkMsg}</p>}
                    </div>
                )}
            </div>
        ) : (
            <div className="fa_finish">
                <img className="fa_finish_img" src={findId} alt="아이디 찾기 완료" />
                <p className="fa_finish_text">회원님의 휴대전화 정보와 일치하는 아이디입니다</p>
                <div className="fa_finish_box">
                    <p className="fa_finish_box_text">
                        아이디: {userEmail}
                    </p>
                    <p className="fa_finish_box_text margin">
                        가입일: {formattedDate}
                    </p>
                </div>
                <div className="fa_finish_move">
                    <button className="fa_finish_move_btn" onClick={handleMoveLogin}>로그인</button>
                    <span>|</span>
                    <button className="fa_finish_move_btn" onClick={handleMoveFindPassword}>비밀번호 찾기</button>
                </div>
            </div>
        )
    );

    const passwordContent = (
        !isFinishPassword ? (
            <div className="fa_password_content">
                <input
                    className="fa_password_content_email"
                    type="email"
                    placeholder="Email"
                    onChange={handleEmailChange}
                    value={email}
                />
                <button className="fa_password_content_btn" onClick={hanldeSendEmail}>
                    이메일 보내기
                </button>
                {failMsg && <p className="fa_content_msg">{failMsg}</p>}
            </div>
        ) : (
            <div className="fa_finish_password">
                <img className="fa_finish_password_img" src={findPassword} alt="비밀번호 찾기 완료" />
                <div className="fa_finish_password_box">
                    <p>회원님의 이메일로</p>
                    <p className="fa_finish_margin">새로운 비밀번호를 보내드렸어요!</p>
                    <p className="fa_finish_margin">로그인 후에 마이페이지에서</p>
                    <p className="fa_finish_margin">꼭 비밀번호 변경을 진행해주세요!</p>
                </div>
                <p className="fa_finish_password_text">{count}초후 로그인 페이지로 이동합니다</p>
            </div>
        )
    );

    return (
        <>
            {isOpen && (
                <div className="find_account">
                    <div className="find_account_exit" onClick={handleClose}>
                        <CancleButton />
                    </div>
                    <img className="fa_logo" src={logo} alt="로고" />
                    {!isFinishId && !isFinishPassword &&
                        <div className="fa_title">{title}</div>
                    }
                    {isFindIdMode && idContent}
                    {isFindPasswordMode && passwordContent}
                </div>
            )}
        </>
    );
};

export default FindAccount;
