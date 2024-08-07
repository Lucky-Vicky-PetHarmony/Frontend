import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "../../../common.css";
import "../../styles/find/FindAccount.css";
import logo from "../../../common/logo/assets/logo.png";
import findId from "../../assets/find/find_id.png";
import findPassword from "../../assets/find/find_password.png";

const FindAccount = () => {
    const location = useLocation();
    const mode = location.state?.mode;

    const isFindIdMode = mode === 'id';
    const isFindPasswordMode = mode === 'password';

    // 아이디 찾기
    const [phone, setPhone] = useState("");
    const [verificationMsg, setVerifivationMsg] = useState("");
    const [verificationInput, setVerifivationInput] = useState("");
    const [isFinishId, setIsFinishId] = useState(false);

    // 비밀번호 찾기
    const [email, setEmail] = useState("");
    const [failMsg, setFailMsg] = useState("");
    const [isFinishPassword, setIsFinishPassword] = useState(false);

    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
    };

    const handleRequestNumber = () => {
        // TODO: 인증번호 전송 로직 추가 예정
        const success = true; // 하드코딩
        const isExistPhone = true; // 하드코딩

        if (success) {
            if (isExistPhone) {
                setVerifivationMsg("인증번호가 전송되었습니다.");
                setVerifivationInput(true);
            } else {
                setVerifivationMsg("가입되지 않은 번호입니다.");
            }
        } else {
            setVerifivationMsg("인증번호 전송에 실패하였습니다.");
        }
    };

    const messageStyle = {
        color: verificationMsg === "인증번호가 전송되었습니다." ? "var(--color-blue)" : "var(--color-red)",
    };
    

    const handleCommitNumber = () => {
        // TODO: 인증번호 확인 로직 추가 예정
        const success = true; // 하드 코딩

        if (success) {
            setIsFinishId(true);
        }
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    ;}

    const hanldeSendEmail = () => {
        // TODO: 이메일 보내는 로직 추가 예정
        const success = true; // 하드코딩
        const isExistEmail = true; // 하드코딩

        if (success) {
            if (isExistEmail) {
                setIsFinishPassword(true);
            } else {
                setFailMsg("가입되지 않은 이메일입니다.");
            }
        } else {
            setFailMsg("이메일 전송에 실패하였습니다.")
        }
    };

    const title = isFindIdMode
        ? (
            <>
                <p>아이디를 잊어버리셨나요?</p>
                <p className="fa_title_margin">회원가입 시 작성하셨던 핸드폰 번호로 인증해주세요.</p>
            </>
        )
        : (
            <>
                <p>비밀번호를 잊어버리셨나요?</p>
                <p className="fa_title_margin">회원가입 시 작성하셨던 이메일로 인증해주세요.</p>
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
                        onChange={handlePhoneChange}
                        value={phone}
                    />
                    <button className="fa_id_content_req_btn" onClick={handleRequestNumber}>
                        인증번호 요청
                    </button>
                </div>
                {verificationMsg && <p className="fa_content_msg" style={messageStyle}>{verificationMsg}</p>}
                {verificationInput && (
                    <div className="fa_id_content_verify">
                        <input
                            className="fa_id_content_verify_input"
                            type="text"
                            placeholder="인증번호"
                        />
                        <button className="fa_id_content_verify_btn" onClick={handleCommitNumber}>
                            인증
                        </button>
                    </div>
                )}
            </div>
        ) : (
            <div className="fa_finish">
                <img className="fa_finish_img" src={findId} alt="아이디 찾기 완료" />
                <p className="fa_finish_text">회원님의 휴대전화 정보와 일치하는 아이디입니다.</p>
                <div className="fa_finish_box">
                    <p className="fa_finish_box_text">
                        아이디 :
                    </p>
                    <p className="fa_finish_box_text margin">
                        가입일 :
                    </p>
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
                <p className="fa_finish_password_text">#초후 로그인 페이지로 이동합니다</p>
            </div>
        )
    );

    return (
        <>
            <div className="find_account">
                <img className="fa_logo" src={logo} alt="로고" />
                {!isFinishId && !isFinishPassword &&
                    <div className="fa_title">{title}</div>
                }
                {isFindIdMode && idContent}
                {isFindPasswordMode && passwordContent}
            </div>
        </>
    );
};

export default FindAccount;
