import React, { useState, useEffect } from "react";
import useAuthStore from "../../../store/useAuthStore";
import axios from "axios";
import "../../styles/dashboard/MyEdit.css";
import editNameIcon from "../../assets/edit_nameIcon.png";
import editEmailIcon from "../../assets/edit_emailIcon.png";
import editPhoneIcon from "../../assets/edit_phoneIcon.png";
import InputField from "../../../common/form/components/InputField";

const ProfileEdit = ({ token, profile, setProfile }) => {
    // Zustand의 setName 함수를 통해 전역 상태의 이름 업데이트하는 함수 가져옴
    const { setName: updateGlobalName } = useAuthStore();
    // profile에서 초기 상태 설정
    const [name, setName] = useState(profile.userName);
    const [email, setEmail] = useState(profile.email);
    const [phone, setPhone] = useState(profile.phone);

    // 프로필 정보가 업데이트 될 때마다 업데이트
    useEffect(() => {
        setName(profile.userName);
        setEmail(profile.email);
        setPhone(formatPhone(profile.phone));
    }, [profile]);
    // 이름 입력 필드의 값이 변경될 때 상태 업데이트
    const handleNameChange = (e) => {
        setName(e.target.value);
    };
    // 이메일 입력 필드의 값이 변경될 때 상태 업데이트
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    // 전화번호 입력 필드의 값이 변경될 때 상태 업데이트
    const handlePhoneChange = (e) => {
        const phoneValue = e.target.value.replace(/[^0-9]/g, ''); // 숫자만 추출
        setPhone(formatPhone(phoneValue)); // 하이픈 포맷 적용
    };

    const formatPhone = (phone) => {
        if (phone.length <= 3) return phone;
        if (phone.length <= 7) return phone.replace(/(\d{3})(\d{1,4})/, "$1-$2");
        return phone.replace(/(\d{3})(\d{3,4})(\d{4})/, "$1-$2-$3");
    };
    // 프로필 업데이트를 서버에 제출하는 함수
    const handleProfileEditSubmit = async () => {
        try {
            const response = await axios.put('http://localhost:8080/api/user/myProfile', {
                userName: name,
                email: email,
                phone: phone.replace(/-/g, ''),
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                updateGlobalName(name);    // 이름을 전역 상태에 업데이트 (헤더)
                setProfile(response.data); // 프로필 정보 업데이트
            }
        } catch (error) {
            console.error('내 정보 수정을 실패했습니다.', error);
        }
    };

    return (
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
                    maxLength={13}
                    value={phone}
                    onChange={handlePhoneChange}
                />
            </div>
            <button className="me_btn" onClick={handleProfileEditSubmit}>수정 완료</button>
        </div>
    );
}

export default ProfileEdit;
