import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";
import axios from "axios";
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
    // Zustand를 사용하여 토큰을 가져옴
    const { token } = useAuthStore();
    // 공통 상태 관리
    const [profile, setProfile] = useState({
        userName: "",
        email: "",
        phone: ""
    });
    // 프로필 정보를 가져오기 위한 비동기 함수
    useEffect(() => {
        const fetchMyProfile = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/user/myProfile', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });
                if (response.status === 200) {
                    setProfile(response.data);
                }
            } catch (error) {
                console.error("요청이 실패했습니다.", error);
            }
        };
        fetchMyProfile();
    }, [token]);

    return (
        <div className="my_page">
            <div className="mp_left">
                {/* profile props로 전달 */}
                <MyProfile profile={profile} />
                <SideBar />
            </div>
            <div className="mp_right">
                <Routes>
                    {/* 기본 경로로 렌더링하며 profile, setProfile props로 전달 */}
                    <Route index element={<ProfileEdit token={token} profile={profile} setProfile={setProfile} />} />
                    {/* 특정 경로에 대해 각 컴포넌트 렌더링 */}
                    <Route path="profile-edit" element={<ProfileEdit token={token} profile={profile} setProfile={setProfile} />} />
                    <Route path="password-edit" element={<PasswordEdit token={token} />} />
                    <Route path="interested-pets" element={<InterestedPets />} />
                    <Route path="pin-posts" element={<PinPosts token={token} />} />
                    <Route path="my-comments" element={<MyComments token={token} />} />
                    <Route path="my-posts" element={<MyPosts token={token} />} />
                    <Route path="delete-account" element={<DeleteAccount />} />
                </Routes>
            </div>
        </div>
    );
};

export default MyPage;
