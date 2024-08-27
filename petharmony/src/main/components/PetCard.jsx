import React, { useState } from "react";
import "../../common/pet/styles/PetCard.css";
import likeBtn from "../../common/pet/assets/likeBtn.png";
import noLikeBtn from"../../common/pet/assets/noLikeBtn.png";
import kindIcon from "../../common/pet/assets/kindIcon.png";
import sexIcon from "../../common/pet/assets/sexIcon.png";
import ageIcon from "../../common/pet/assets/ageIcon.png";
import weightIcon from "../../common/pet/assets/weightIcon.png";
import locationIcon from "../../common/pet/assets/locationIcon.png";
import statusIcon from "../../common/pet/assets/statusIcon.png";
import { useNavigate } from 'react-router-dom';

const PetCard = ({ pet }) => {
    const nav = useNavigate();

    const [petLike, setPetLike] = useState(false);

    const petLikeHandler = (e) => {
        e.stopPropagation();
        setPetLike(prev => !prev);
    }

    return (
        <div className="pet_card" onClick={() => nav("/adoption/1")}>
            <img className="pc_img" src={pet.popFile} alt={pet.desertionNo} />
            <div className="pc_top">
                <div className="pc_words">
                    {pet.words.map(word => <span key={word}>{word}</span>)}
                </div >
                <img
                    src={petLike ? likeBtn : noLikeBtn}
                    alt="좋아요"
                    onClick={petLikeHandler} />
            </div>
            <div className="pc_info">
                <div className="pc_info_row">
                    <div className="pc_info_row_item">
                        <img src={kindIcon} alt="" className="pc_info_icon" />
                        <span>{pet.kindCd}</span>
                    </div>
                    <div className="pc_info_row_item">
                        <img src={sexIcon} alt="" className="pc_info_icon" />
                        <span>{pet.sexCd}</span>
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
                        <span>{pet.orgNm}</span>
                    </div>
                    <div className="pc_info_row_item">
                        <img src={statusIcon} alt="" className="pc_info_icon" />
                        <span>{pet.neuterYn}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PetCard;