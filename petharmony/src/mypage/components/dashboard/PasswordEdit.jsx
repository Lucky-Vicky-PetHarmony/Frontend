import React, { useState } from "react";
import "../../styles/dashboard/MyEdit.css";
import prePasswordIcon from "../../assets/prePasswordIcon.png";
import newPasswordIcon from "../../assets/newPasswordIcon.png";
import InputField from "../../../common/form/components/InputField";
import axios from "axios";

const PasswordEdit = ({ token }) => {
    const [prePassword, setPrePassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");

    const handlePrePasswordChange = (e) => {
        setPrePassword(e.target.value)
    };

    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value);
    };

    const handleCheckPasswordChange = (e) => {
        setPasswordCheck(e.target.value);
    };

    const handlePasswordEditSubmit = async () => {
        const passwordEditData = {
            prePassword: prePassword,
            newPassword: newPassword
        };

        try {
            const response = await axios.put('http://localhost:8080/api/user/password',
                passwordEditData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

            if (response.status === 200) {
                alert('비밀번호 변경이 완료되었습니다.');
                setPrePassword("");
                setNewPassword("");
                setPasswordCheck("");
            }
        } catch (error) {
            console.error('비밀번호 수정을 실패했습니다.');
        }
    };

    return (
        <div className="my_edit">
            <p className="me_title">비밀번호 변경</p>
            <div className="me_content">
                <InputField
                    icon={prePasswordIcon}
                    type="text"
                    placeholder="기존 비밀번호"
                    value={prePassword}
                    onChange={handlePrePasswordChange}
                />
                <InputField
                    icon={newPasswordIcon}
                    type="email"
                    placeholder="새로운 비밀번호"
                    value={newPassword}
                    onChange={handleNewPasswordChange}
                />
                <InputField
                    icon={newPasswordIcon}
                    type="text"
                    placeholder="새로운 비밀번호 확인"
                    value={passwordCheck}
                    onChange={handleCheckPasswordChange}
                />
            </div>
            <button className="me_btn" onClick={handlePasswordEditSubmit}>비밀번호 변경</button>
        </div>
    )
}

export default PasswordEdit;