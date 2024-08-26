import React, { useState } from "react";
import "../styles/AdoptionDetailShelter.css";
import KakaoMap from "./KakaoMap";

const AdoptionDetailShelter = ({pet}) => {
    
    return (
        <div className="adoptionDetailShelter">
            <div className="adoptionDetailShelter_info">
                <div className="adoptionDetailShelter_info_elem">
                    <p>보호소 이름</p>
                    <p>{pet.care_nm}</p>
                </div>
                <div className="adoptionDetailShelter_info_elem">
                    <p>보호소 주소</p>
                    <p>{pet.care_addr}</p>
                </div>
                <div className="adoptionDetailShelter_info_elem">
                    <p>취급 동물</p>
                    <p>{pet.save_trgt_animal}</p>
                </div>
                <div className="adoptionDetailShelter_info_elem">
                    <p>평일 운영시간</p>
                    <p>{pet.week_operating_hours}</p>
                </div>
                <div className="adoptionDetailShelter_info_elem">
                    <p>주말 운영시간</p>
                    <p>{pet.weekend_operating_hours}</p>
                </div>
                <div className="adoptionDetailShelter_info_elem">
                    <p>휴무일</p>
                    <p>{pet.close_day}</p>
                </div>
                <div className="adoptionDetailShelter_info_elem">
                    <p>전화번호</p>
                    <p>{pet.care_tel}</p>
                </div>
            </div>
            <KakaoMap care_addr={pet.care_addr} care_nm={pet.care_nm}/>
        </div>
    );
}

export default AdoptionDetailShelter;