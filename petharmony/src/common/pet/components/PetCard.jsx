import React, { useState } from "react";
import "../../../common.css";
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
import temp from "../assets/temp.png"; // 임시 이미지
import { useNavigate } from 'react-router-dom';

const PetCard = ({pet}) => {
    const nav = useNavigate();

    const [petLike, setPetLike] = useState(false);

    const petLikeHandler = (e) => {
        e.stopPropagation();
        setPetLike(prev => !prev);
    }
    // 하드코딩된 데이터
    // const pet = {
    //     id: 1,
    //     image: temp,
    //     words: ["호기심 많음", "돌봄이 필요한", "내성적인", "내장적인", "내성장인"],
    //     kind: "고양이",
    //     sex: "남아",
    //     age: "2004년생",
    //     weight: "4kg",
    //     location: "서울 노원구",
    //     status: "중성화 완료"
    // };
    // "popfile": "http://www.animal.go.kr/files/shelter/2024/07/202407161507650.jpg",
    // "kind_cd_detail": "도마뱀",
    // "words": [
    //     "독특한",
    //     "멋진",
    //     "온순한"
    // ],
    // "kind_cd": "기타축종",
    // "care_nm": "경기도 하남시",
    // "weight": "0.03(Kg)",
    // "age": "2024년생",
    // "sex_cd": "알 수 없음",
    // "neuter_yn": "알 수 없음"

    return (
        <div className="pet_card" onClick={() => nav(`/adoption/1`)}>
            <img className="pc_img" src={pet.popfile} alt="입양동물 사진" />
            <div className="pc_top">
                <div className="pc_words">
                    {pet.words.map((word, index) => (<span key={index}>{word}</span>))}
                </div >
                <img 
                    src={petLike?likeBtn:noLikeBtn} 
                    alt="좋아요"
                    onClick={petLikeHandler} />
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
                        <span>{pet.care_nm}</span>
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