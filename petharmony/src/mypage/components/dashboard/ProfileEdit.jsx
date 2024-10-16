import React, { useState, useEffect } from "react";
import useAuthStore from "../../../store/useAuthStore";
import axiosInstance from "../../../api/axiosConfig";
import "../../styles/dashboard/MyEdit.css";
import editNameIcon from "../../assets/edit_nameIcon.png";
import editEmailIcon from "../../assets/edit_emailIcon.png";
import editPhoneIcon from "../../assets/edit_phoneIcon.png";
import kakao from "../../assets/kakao.png";
import InputField from "../../../common/form/components/InputField";

const ProfileEdit = ({ profile, setProfile }) => {
    const { setName: updateGlobalName } = useAuthStore();

    const [name, setName] = useState(profile.userName);
    const [email, setEmail] = useState(profile.email);
    const [phone, setPhone] = useState(profile.phone);
    const [kakaoUser, setKakaoUser] = useState(!!profile.kakaoId);

    // 프로필 정보가 업데이트 될 때마다 업데이트
    useEffect(() => {
        setName(profile.userName);
        setEmail(profile.email);
        setPhone(formatPhone(profile.phone));
        setKakaoUser(!!profile.kakaoId);
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

    // 전화번호 자동 하이픈 추가
    const formatPhone = (phone) => {
        if (phone.length <= 3) return phone;
        if (phone.length <= 7) return phone.replace(/(\d{3})(\d{1,4})/, "$1-$2");
        return phone.replace(/(\d{3})(\d{3,4})(\d{4})/, "$1-$2-$3");
    };

    // 프로필 정보 업데이트
    const handleProfileEditSubmit = async () => {
        try {
            const response = await axiosInstance.put('/api/user/myProfile', {
                userName: name,
                email: email,
                phone: phone.replace(/-/g, ''),
            });

            if (response.status === 200) {
                updateGlobalName(name);    // 이름을 전역 상태에 업데이트 (헤더)
                setProfile(response.data); // 프로필 정보 업데이트
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
        <div className="my_edit">
            <p className="me_title">내 정보 수정</p>
            {!kakaoUser ? (
                <>
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
                    <button className="me_btn" onClick={handleProfileEditSubmit}>
                        수정 완료
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
}

export default ProfileEdit;
