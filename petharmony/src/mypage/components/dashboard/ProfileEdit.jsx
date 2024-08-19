import React, { useState } from "react";
import "../../styles/dashboard/MyEdit.css";
import editNameIcon from "../../assets/edit_nameIcon.png";
import editEmailIcon from "../../assets/edit_emailIcon.png";
import editPhoneIcon from "../../assets/edit_phoneIcon.png";
import InputField from "../../../common/form/components/InputField";

const ProfileEdit = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
    };

    const handleProfileEditSubmit = () => {

    };

    return (
        <>
            <div className="my_edit">
                <p className="me_title">내 정보 수정</p>
                <div className="me_content">
                    <InputField
                        icon={editNameIcon}
                        type="text"
                        placeholder=""
                        value={name}
                        onChange={handleNameChange}
                    />
                    <InputField
                        icon={editEmailIcon}
                        type="email"
                        placeholder=""
                        value={email}
                        onChange={handleEmailChange}
                    />
                    <InputField
                        icon={editPhoneIcon}
                        type="text"
                        placeholder=""
                        value={phone}
                        onChange={handlePhoneChange}
                    />
                </div>
                <button className="me_btn" onSubmit={handleProfileEditSubmit}>수정 완료</button>
            </div>
        </>
    );
}

export default ProfileEdit;