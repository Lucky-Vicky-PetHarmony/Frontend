import React from "react";
import "../styles/MyPage.css";
import { Routes, Route } from "react-router-dom";
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
    return (
        <div className="my_page">
            <div className="mp_left">
                <MyProfile
                    name="김가은"
                    email="0107162a@gmail.com"
                    phone="01071621006"
                />
                <SideBar />
            </div>
            <div className="mp_right">
                <Routes>
                    <Route path="profile-edit" element={<ProfileEdit />} />
                    <Route path="password-edit" element={<PasswordEdit />} />
                    <Route path="interested-pets" element={<InterestedPets />} />
                    <Route path="pin-posts" element={<PinPosts />} />
                    <Route path="my-comments" element={<MyComments />} />
                    <Route path="my-posts" element={<MyPosts />} />
                    <Route path="delete-account" element={<DeleteAccount />} />
                </Routes>
            </div>
        </div>
    );
}

export default MyPage;