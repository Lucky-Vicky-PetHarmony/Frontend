import React, { useEffect, useState } from "react";
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

import axios from "axios";


const AdoptionList = () => {
    const { token, userId } = useAuthStore();
    const [ pets, setPets ] = useState();
    const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가


    // TODO: 리스트받아오기

    const [adoptCategory, setAdoptCategory] = useState("ALL");

    useEffect(() => {
        axiosAdoptionList();
    }, [])

    // 서버에 신고 리스트 요청
    const axiosAdoptionList = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/public/allPetsInfo', {
                headers: {
                    Authorization: token ? { Authorization: `Bearer ${token}` } : {}, // 토큰이 있으면 헤더에 추가
                },
            });

            if (response.status === 200) {
                setPets(response.data);
                setIsLoading(false);
            } else {
                alert("데이터 불러오기 실패");
            }
        } catch (error) {
            alert("서버와의 통신 중 오류가 발생했습니다.");
            console.error("Error: ", error);
        }
    };

    if (isLoading) {
        return <div className="loading">로딩 중...</div>; // 로딩 중 화면 표시
    }
    
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
                {pets.map((pet, index) => (
                    <PetCard key={index} pet={pet} />
                ))}
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