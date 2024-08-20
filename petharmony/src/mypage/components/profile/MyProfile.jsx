import React from "react";
import "../../styles/profile/MyProfile.css";
import nameIcon from "../../assets/nameIcon.png";
import emailIcon from "../../assets/emailIcon.png";
import phoneIcon from "../../assets/phoneIcon.png";

const MyProfile = ({ name, email, phone }) => {
    return (
        <>
            <div className="my_profile">
                <p className="mp_title">MY INFO</p>
                <div className="mp_content">
                    <div className="mp_content_item">
                        <img className="mp_nameIcon" src={nameIcon} alt="" />
                        <p>{name}</p>
                    </div>
                    <div className="mp_content_item">
                        <img className="mp_emailIcon" src={emailIcon} alt="" />
                        <p>{email}</p>
                    </div>
                    <div className="mp_content_item">
                        <img className="mp_phoneIcon" src={phoneIcon} alt="" />
                        <p>{phone}</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MyProfile;