import React, { useState } from "react";
import "../styles/AdoptionList.css";
import all_b from '../asset/all_b.png';
import all_bl from '../asset/all_bl.png';
import cat_b from '../asset/cat_b.png';
import cat_bl from '../asset/cat_bl.png';
import dog_b from '../asset/dog_b.png';
import dog_bl from '../asset/dog_bl.png';
import paw_b from '../asset/paw_b.png';
import paw_bl from '../asset/paw_bl.png';
import bannerImg from '../asset/bannerImg.png';
import Click from '../asset/Click.png';
import PetCard from '../../common/pet/components/PetCard';
import useAuthStore from '../../store/useAuthStore';

const AdoptionList = () => {
    const { token, userId } = useAuthStore();

    // TODO: 리스트받아오기

    const [adoptCategory, setAdoptCategory] = useState("ALL");
    
    return (
        <div className="adoptionList">
            <p>사랑이 필요한 아이들에게 손을 내밀어 주세요</p>
            <div className="adoptionList_category">
                <div className="adoptionList_category_com"
                    onClick={() => setAdoptCategory("ALL")}>
                    <img 
                        src={adoptCategory==="ALL" ? all_b : all_bl } 
                        alt="전체" />
                    <p className={`${adoptCategory==="ALL"?"active":""}`}>전체</p>
                </div>
                <div className="adoptionList_category_com"
                    onClick={() => setAdoptCategory("DOG")}>
                    <img 
                        src={adoptCategory==="DOG" ? dog_b : dog_bl } 
                        alt="" />
                    <p className={`${adoptCategory==="DOG"?"active":""}`}>강아지</p>
                </div>
                <div className="adoptionList_category_com"
                    onClick={() => setAdoptCategory("CAT")}>
                    <img 
                        src={adoptCategory==="CAT" ? cat_b : cat_bl } 
                        alt="" />
                    <p className={`${adoptCategory==="CAT"?"active":""}`}>고양이</p>
                </div>
                <div className="adoptionList_category_com"
                    onClick={() => setAdoptCategory("OTHER")}>
                    <img 
                        src={adoptCategory==="OTHER" ? paw_b : paw_bl } 
                        alt="" />
                    <p className={`${adoptCategory==="OTHER"?"active":""}`}>그 외</p>
                </div>
            </div>
            <div className="adoptionList_Group">
                <PetCard/>
                <PetCard/>
                <PetCard/>
                <PetCard/>
                <PetCard/>
                <PetCard/>
                <PetCard/>
            </div>
            <div className="adoptionList_banner">
                <p>특별한 인연을<br/>찾아드립니다</p>
                <img src={bannerImg} alt="" />
                <div className="adoptionList_banner_matchingBtn">
                    <p>매칭하기</p>
                    <img src={Click} alt="" />
                </div>
            </div>
        </div>
    );
}

export default AdoptionList;