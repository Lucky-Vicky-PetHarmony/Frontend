import React, { useState } from "react";
import "../../../common.css";
import "../../styles/dashboard/MyEdit.css";
import prePasswordIcon from "../../assets/prePasswordIcon.png";
import newPasswordIcon from "../../assets/newPasswordIcon.png";
import InputField from "../../../common/form/components/InputField";

const PasswordEdit = () => {
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

    const handlePasswordEditSubmit = () => {

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
            <button className="me_btn" onSubmit={handlePasswordEditSubmit}>비밀번호 변경</button>
        </div>
    )
}

export default PasswordEdit;