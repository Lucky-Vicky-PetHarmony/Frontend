import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosConfig";
import "../styles/MyPage.css";
import MyProfile from "./profile/MyProfile";
import SideBar from "./nav/SideBar";
import ProfileEdit from "./dashboard/ProfileEdit";
import PasswordEdit from "./dashboard/PasswordEdit";
import InterestedPets from "./dashboard/InterestedPets";
import PinPosts from "./dashboard/PinPosts";
import MyComments from "./dashboard/MyComments";
import MyPosts from "./dashboard/MyPosts";
import DeleteAccount from "./dashboard/DeleteAccount";

const MyPage = () => {
    const navigate = useNavigate();

    // 공통 상태 관리
    const [profile, setProfile] = useState({
        userName: "",
        email: "",
        phone: "",
        kakaoId: ""
    });

    const [isWithdrawn, setIsWithdrawn] = useState(false);
    
    // 프로필 정보
    useEffect(() => {
        const fetchMyProfile = async () => {
            try {
                const response = await axiosInstance.get('/api/user/myProfile');
                if (response.status === 200) {
                    setProfile(response.data);
                }
            } catch (error) {
                if (error.response && error.response.status === 410) {
                    console.error("사용자가 탈퇴된 상태입니다.");
                    setIsWithdrawn(true); // 탈퇴 상태로 설정
                } else {
                    console.error("요청이 실패했습니다.", error);
                }
            }
        };
        fetchMyProfile();
    }, []);

    // 탈퇴한 사용자인 경우 메인페이지로 이동
    useEffect(() => {
        if (isWithdrawn) {
            navigate('/');
        }
    }, [isWithdrawn, navigate]);

    return (
        <div className="my_page">
            <div className="mp_left">
                <MyProfile profile={profile} />
                <SideBar />
            </div>
            <div className="mp_right">
                <Routes>
                    {/* 기본 경로로 렌더링 */}
                    <Route index element={<ProfileEdit profile={profile} setProfile={setProfile} />} />
                    {/* 특정 경로에 대해 각 컴포넌트 렌더링 */}
                    <Route path="profile-edit" element={<ProfileEdit profile={profile} setProfile={setProfile} />} />
                    <Route path="password-edit" element={<PasswordEdit profile={profile} />} />
                    <Route path="interested-pets" element={<InterestedPets />} />
                    <Route path="pin-posts" element={<PinPosts />} />
                    <Route path="my-comments" element={<MyComments />} />
                    <Route path="my-posts" element={<MyPosts />} />
                    <Route path="delete-account" element={<DeleteAccount />} />
                </Routes>
            </div>
        </div>
    );
};

export default MyPage;