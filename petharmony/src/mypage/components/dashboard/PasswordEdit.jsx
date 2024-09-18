import React, { useState } from "react";
import axiosInstance from "../../../api/axiosConfig";
import "../../styles/dashboard/MyEdit.css";
import prePasswordIcon from "../../assets/prePasswordIcon.png";
import newPasswordIcon from "../../assets/newPasswordIcon.png";
import kakao from "../../assets/kakao.png";
import InputField from "../../../common/form/components/InputField";

const PasswordEdit = ({ profile }) => {
    const [prePassword, setPrePassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");
    const [kakaoUser, setKakaoUser] = useState(!!profile.kakaoId);

    const handlePrePasswordChange = (e) => {
        setPrePassword(e.target.value);
    };

    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value);
    };

    const handleCheckPasswordChange = (e) => {
        setPasswordCheck(e.target.value);
    };

    const handlePasswordEditSubmit = async () => {
        if (newPassword !== passwordCheck) {
            alert('🐶 새 비밀번호와 확인 비밀번호가 일치하지 않습니다.');
            return;
        }

        const passwordEditData = {
            prePassword: prePassword,
            newPassword: newPassword,
        };

        try {
            const response = await axiosInstance.put('/api/user/password', passwordEditData);

            if (response.status === 200) {
                setPrePassword("");
                setNewPassword("");
                setPasswordCheck("");
            }
        } catch (error) {
            alert('🐶 비밀번호 변경에 실패했습니다.');
            console.error('비밀번호 변경을 실패했습니다.');
        }
    };

    return (
        <div className="my_edit">
            <p className="me_title">비밀번호 변경</p>
            {!kakaoUser ? (
                <>
                    <div className="me_content">
                        <InputField
                            icon={prePasswordIcon}
                            type="password"
                            placeholder="기존 비밀번호"
                            value={prePassword}
                            onChange={handlePrePasswordChange}
                        />
                        <InputField
                            icon={newPasswordIcon}
                            type="password"
                            placeholder="새로운 비밀번호"
                            value={newPassword}
                            onChange={handleNewPasswordChange}
                        />
                        <InputField
                            icon={newPasswordIcon}
                            type="password"
                            placeholder="새로운 비밀번호 확인"
                            value={passwordCheck}
                            onChange={handleCheckPasswordChange}
                        />
                    </div>
                    <button className="me_btn" onClick={handlePasswordEditSubmit}>
                        비밀번호 변경
                    </button>
                </>
            ) : (
                <div className="me_kakao_user">
                    <img src={kakao} alt="" />
                    <p>카카오 로그인 사용자는 정보를 수정할 수 없습니다.</p>
                </div>
            )}
        </div>
    );
};

export default PasswordEdit;
