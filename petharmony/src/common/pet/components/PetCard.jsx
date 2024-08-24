import React, { useState } from "react";
import "../../../common.css";
import "../styles/PetCard.css";
import likeBtn from "../assets/likeBtn.png";
import noLikeBtn from "../assets/noLikeBtn.png";
import kindIcon from "../assets/kindIcon.png";
import sexIcon from "../assets/sexIcon.png";
import ageIcon from "../assets/ageIcon.png";
import weightIcon from "../assets/weightIcon.png";
import locationIcon from "../assets/locationIcon.png";
import statusIcon from "../assets/statusIcon.png";
import temp from "../assets/temp.png"; // 임시 이미지
import { useNavigate } from 'react-router-dom';

const PetCard = () => {
    const nav = useNavigate();

    const [petLike, setPetLike] = useState(false);

    const petLikeHandler = (e) => {
        e.stopPropagation();
        setPetLike(prev => !prev);
    }
    // 하드코딩된 데이터
    const pet = {
        id: 1,
        image: temp,
        words: ["호기심 많음", "돌봄이 필요한", "내성적인", "내장적인", "내성장인"],
        kind: "고양이",
        sex: "남아",
        age: "2004년생",
        weight: "4kg",
        location: "서울 노원구",
        status: "중성화 완료"
    };

    return (
        <div className="pet_card" onClick={() => nav("/adoption/1")}>
            <img className="pc_img" src={pet.image} alt={pet.id} />
            <div className="pc_top">
                <div className="pc_words">
                    {pet.words.map(word => <span key={word}>{word}</span>)}
                </div >
                <img 
                    src={petLike?likeBtn:noLikeBtn} 
                    alt="좋아요"
                    onClick={petLikeHandler} />
            </div>
            <div className="pc_info">
                <div className="pc_info_row">
                    <div className="pc_info_row_item">
                        <img src={kindIcon} alt="" className="pc_info_icon" />
                        <span>{pet.kind}</span>
                    </div>
                    <div className="pc_info_row_item">
                        <img src={sexIcon} alt="" className="pc_info_icon" />
                        <span>{pet.sex}</span>
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
                        <span>{pet.location}</span>
                    </div>
                    <div className="pc_info_row_item">
                        <img src={statusIcon} alt="" className="pc_info_icon" />
                        <span>{pet.status}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PetCard;