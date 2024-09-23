import React, { useState } from "react";
import axiosInstance from "../../../api/axiosConfig";
import "../styles/PetCard.css";
import likeBtn from "../assets/likeBtn.png";
import noLikeBtn from "../assets/noLikeBtn.png";
import dog_bl from "../../../adoption/asset/dog_bl.png";
import paw_bl from "../../../adoption/asset/paw_bl.png";
import cat_bl from "../../../adoption/asset/cat_bl.png";
import sexIcon from "../assets/sexIcon.png";
import ageIcon from "../assets/ageIcon.png";
import weightIcon from "../assets/weightIcon.png";
import locationIcon from "../assets/locationIcon.png";
import statusIcon from "../assets/statusIcon.png";

import { useNavigate } from 'react-router-dom';

const PetCard = ({pet, userId, customClass}) => {
    const nav = useNavigate();

    const [petLike, setPetLike] = useState(pet.pet_like);

    const petLikeHandler = (e) => {
        
        e.stopPropagation(); // 먼저 이벤트 전파를 중지

        if(!userId){
            alert("입양동물 좋아요는 로그인이 필요합니다.")
            return; // 로그인하지 않은 경우 함수 종료
        }
        axiosPetLike();
    }

    // TODO: 좋아요처리(좋아요 취소요청인지 활성화요청인지 보내야함)
    const axiosPetLike = async () => {
        try {
            const response = await axiosInstance.post(`/api/user/pet-likes`, 
                {
                    userId: userId,                 // 유저 아이디
                    desertionNo: pet.desertion_no,   // 입양 동물 아이디
                    isLiked: !petLike,           // 좋아요 활성화 여부 (true: 좋아요, false: 취소)
                }
            );
            if (response.status === 200) {
                setPetLike(prev => !prev);
            } else {
                console.log("좋아요 실패");
            }
        } catch (error) {
            alert("서버와의 통신 중 오류가 발생했습니다.");
            console.error("Error: ", error);
        }
    };

    return (
        <div className={`pet_card ${customClass}`} onClick={() => nav(`/adoption/${pet.desertion_no}`)}>
            <img className="pc_img" src={pet.popfile} alt="입양동물 사진" />
            <div className="pc_top">
                <div className="pc_words">
                    {pet.words.map((word, index) => (<span key={index}>{word}</span>))}
                </div >
                <img 
                    src={petLike?likeBtn:noLikeBtn} 
                    alt="좋아요"
                    onClick={(e) => {petLikeHandler(e)}} />
            </div>
            <div className="pc_info">
                <div className="pc_info_row">
                    <div className="pc_info_row_item">
                        <img 
                            src={pet.kind_cd==="개"?dog_bl:pet.kind_cd==="고양이"?cat_bl:paw_bl} 
                            alt="" 
                            className="pc_info_icon" />
                        <span>{pet.kind_cd}</span>
                    </div>
                    <div className="pc_info_row_item">
                        <img src={sexIcon} alt="" className="pc_info_icon" />
                        <span>{pet.sex_cd}</span>
                    </div>
                </div>
                <div className="pc_info_row">
                    <div className="pc_info_row_item">
                        <img src={ageIcon} alt="" className="pc_info_icon" />
                        <span>{pet.age}</span>
                    </div>
                    <div className="pc_info_row_item">
                        <img src={weightIcon} alt="" className="pc_info_icon" />
                        <span>{pet.weight}</span>
                    </div>
                </div>
                <div className="pc_info_row">
                    <div className="pc_info_row_item">
                        <img src={locationIcon} alt="" className="pc_info_icon" />
                        <span>{pet.org_nm}</span>
                    </div>
                    <div className="pc_info_row_item">
                        <img src={statusIcon} alt="" className="pc_info_icon" />
                        <span>{pet.neuter_yn}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PetCard;