import React, { useState } from "react";
import "../styles/AdoptionDetail.css";
import AdoptionDetailPet from "./AdoptionDetailPet";
import AdoptionDetailShelter from "./AdoptionDetailShelter";

const AdoptionDetail = () => {

    // TODO: 정보 받아오기
    
    return (
        <div className="adoptionDetail">
            <p>🍀 입양 동물 정보</p>
            <AdoptionDetailPet/>
            <p>🏡 해당 동물을 보호하고 있는 보호소 정보</p>
            <AdoptionDetailShelter/>
        </div>
    );
}

export default AdoptionDetail;