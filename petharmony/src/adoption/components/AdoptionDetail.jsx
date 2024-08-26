import React, { useState } from "react";
import "../styles/AdoptionDetail.css";
import AdoptionDetailPet from "./AdoptionDetailPet";
import AdoptionDetailShelter from "./AdoptionDetailShelter";

const AdoptionDetail = () => {

    // TODO: 정보 받아오기
    // 하드코딩된 데이터
    const pet = {
        weekend_operating_hours: "운영 안함",
        words: ["건강한", "활발한", "특별한"],
        kind_cd_detail: "믹스견",
        kind_cd: "개",
        happen_place: "평창동 207-1  홍지문터널관리소 인근",
        care_nm: "한국동물구조관리협회",
        special_mark: "경계. 예민. 사나움. 코검정. 우전지파행및부종. 털때탐. 꼬리단미안됨. ",
        care_addr: "서울특별시 마포구 만리재로 74 (신공덕동, 신공덕2차삼성래미안) 삼성 래미안상가 117호",
        week_operating_hours: "09:00 ~ 18:00",
        pet_like: true,
        save_trgt_animal: "개",
        popfile: "http://www.animal.go.kr/files/shelter/2024/07/202407251707806.jpg",
        happen_dt: "2024-07-24",
        close_day: "일요일",
        care_tel: "031-867-9119",
        color_cd: "갈",
        org_nm: "경기도 하남시",
        notice_period: "2024-07-25 ~ 2024-08-05",
        age: "2022년생",
        sex_cd: "여아",
        neuter_yn: "알 수 없음",
        weight: "17(kg)"
    };
    
    return (
        <div className="adoptionDetail">
            <p>🍀 입양 동물 정보</p>
            <AdoptionDetailPet pet={pet}/>
            <p>🏡 해당 동물을 보호하고 있는 보호소 정보</p>
            <AdoptionDetailShelter pet={pet}/>
        </div>
    );
}

export default AdoptionDetail;