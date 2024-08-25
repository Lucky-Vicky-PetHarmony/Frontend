import React, { useState } from "react";
import "../styles/AdoptionDetailShelter.css";
import KakaoMap from "./KakaoMap";

const AdoptionDetailShelter = () => {
    
    return (
        <div className="adoptionDetailShelter">
            <div className="adoptionDetailShelter_info">
                <div className="adoptionDetailShelter_info_elem">
                    <p>보호소 이름</p>
                    <p>(사)동물보호관리협회</p>
                </div>
                <div className="adoptionDetailShelter_info_elem">
                    <p>보호소 주소</p>
                    <p>부산광역시 강서구 가락대로1283번길 25-2 (봉림동) </p>
                </div>
                <div className="adoptionDetailShelter_info_elem">
                    <p>취급 동물</p>
                    <p>개, 고양이, 기타</p>
                </div>
                <div className="adoptionDetailShelter_info_elem">
                    <p>평일 운영시간</p>
                    <p>09:00 - 17:00 (분양 13:00 - 15:00)</p>
                </div>
                <div className="adoptionDetailShelter_info_elem">
                    <p>주말 운영시간</p>
                    <p>운영안함.</p>
                </div>
                <div className="adoptionDetailShelter_info_elem">
                    <p>휴무일</p>
                    <p>토요일, 일요일</p>
                </div>
                <div className="adoptionDetailShelter_info_elem">
                    <p>전화번호</p>
                    <p>051-971-6208</p>
                </div>
            </div>
            <KakaoMap/>
        </div>
    );
}

export default AdoptionDetailShelter;