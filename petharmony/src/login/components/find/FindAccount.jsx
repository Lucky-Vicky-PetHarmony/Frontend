import React, { useState, useEffect } from "react";
import axios from "axios";
import useModalStore from "../../../store/useModalStore";
import "../../styles/find/FindAccount.css";
import logo from "../../../common/logo/assets/logo.png";
import findId from "../../assets/find/find_id.png";
import findPassword from "../../assets/find/find_password.png";
import CancleButton from "../../../common/button/components/CancelButton";

const FindAccount = () => {
    // Zustand의 useModalStore 훅을 사용하여 가져옴
    const { closeModal, openLoginModal, findAccountMode } = useModalStore();
    // 현재 모달이 아이디 찾기 모달인지 확인
    const isFindIdMode = findAccountMode === 'id';
    // 현재 모달이 비밀번호 찾기 모달인지 확인
    const isFindPasswordMode = findAccountMode === 'password';
    /* 아이디 찾기 관련 상태 */
    // 사용자가 입력한 전화번호
    const [phone, setPhone] = useState("");
    // 포맷되지 않은 원본 전화번호
    const [localPhone, setLocalPhone] = useState("");
    // 인증번호 요청 버튼 클릭
    const [isClick, setIsClick] = useState(false);
    // 서버로 부터 받은 인증 메시지
    const [verificationMsg, setVerifivationMsg] = useState("");
    // 사용자가 입력한 인증번호
    const [certificationNumber, setCertificationNumber] = useState("");
    // 인증 확인 메시지
    const [checkMsg, setCheckMsg] = useState("");
    // 아이디 찾기 성공 여부
    const [isFinishId, setIsFinishId] = useState(false);
    // 찾은 사용자 아이디
    const [userEmail, setUserEmail] = useState("");
    // 사용자 가입 날짜
    const [userCreateDate, setUserCreateDate] = useState("");
    // 서버 응답 메시지
    const [responseMessage, setResponseMessage] = useState("");
    // 포맷된 가입 날짜
    const [formattedDate, setFormattedDate] = useState("");
    // 인증 메시지 스타일 설정
    const messageStyle = {
        color: verificationMsg === "인증번호가 전송되었습니다." ? "var(--color-blue)" : "var(--color-red)",
    };
    /* 비밀번호 찾기 관련 상태 */
    // 사용자가 입력한 이메일
    const [email, setEmail] = useState("");
    // 이메일 전송 실패 메시지
    const [failMsg, setFailMsg] = useState("");
    // 비밀번호 찾기 성공 여부
    const [isFinishPassword, setIsFinishPassword] = useState(false);
    // 모달 닫기 전 카운트
    const [count, setCount] = useState(3);
    // 모달 제목
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


    // 전화번호 입력 시 숫자만 허용
    const handlePhoneChange = (e) => {
        const phoneValue = e.target.value.replace(/[^0-9]/g, '');
        setLocalPhone(phoneValue);
    };

    // 입력된 전화번호를 포맷
    useEffect(() => {
        let formattedPhone = localPhone;
        if (localPhone.length === 11) {
            formattedPhone = localPhone.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
        }
        setPhone(formattedPhone);
    }, [localPhone]);

    // 인증번호 요청
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
        }
    };

    // 인증번호 입력시 숫자만 허용
    const handleCertificationNumberChange = (e) => {
        const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 4);
        setCertificationNumber(value);
    };

    // 인증번호 확인
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
                    const userCreateDate = new Date(responseData.createDate);
                    setFormattedDate(userCreateDate.toISOString().slice(0, 10).replace(/-/g, '.'));
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
        }
    };

    // 비밀번호 찾기 완료 후 3초 후 로그인 모달로 전환
    useEffect(() => {
        let timer;
        if ((isFinishPassword) && count > 0) {
            timer = setTimeout(() => {
                setCount(count - 1);
            }, 1000);
        } else if (isFinishPassword && count === 0) {
            closeModal();      // 모달 닫기
            openLoginModal();  // 로그인창 열기
        }
        return () => clearTimeout(timer);
    }, [isFinishPassword, count, closeModal, openLoginModal]);

    // 비밀번호 찾기를 위한 이메일 입력
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    // 임시 비밀번호 이메일 전송
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

    // 비밀번호 찾기 모드로 전환
    const handleMoveFindPassword = () => {
        setIsFinishId(false);
        setIsFinishPassword(false);
        useModalStore.getState().openFindAccountModal('password');
    };

    // 아이디 찾기 모달 내용    
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
                    <button className="fa_finish_move_btn" onClick={openLoginModal}>로그인</button>
                    <span>|</span>
                    <button className="fa_finish_move_btn" onClick={handleMoveFindPassword}>비밀번호 찾기</button>
                </div>
            </div>
        )
    );

    // 비밀번호 찾기 모달 내용
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
        <div className="find_account_overlay">
            <div className="find_account">
                <div className="find_account_exit" onClick={closeModal}>
                    <CancleButton />
                </div>
                <img className="fa_logo" src={logo} alt="로고" />
                {!isFinishId && !isFinishPassword &&
                    <div className="fa_title">{title}</div>
                }
                {isFindIdMode && idContent}
                {isFindPasswordMode && passwordContent}
            </div>
        </div>
    );
};

export default FindAccount;