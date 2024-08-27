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
import upbtn from '../asset/upbtn.png';
import PetCard from '../../common/pet/components/PetCard';

import axios from "axios";
import { useNavigate } from "react-router-dom";


const AdoptionList = () => {
    const nav = useNavigate();
    
    // localstorage에서 토큰과 userId를 가져옴
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    // 서버에서 가져온 동물 데이터와 관련된 상태들
    const [pets, setPets] = useState([]);                 // 동물 데이터 목록
    const [isLoading, setIsLoading] = useState(true);       // 로딩 상태 관리
    const [page, setPage] = useState(0);                  // 현재 페이지 번호
    const [isFetching, setIsFetching] = useState(false);    // 데이터 요청 중인지 여부

    const [adoptCategory, setAdoptCategory] = useState("ALL");  // 선택된 카테고리

    // 페이지 번호 또는 카테고리가 변경될 때마다 데이터를 요청
    useEffect(() => {
        axiosAdoptionList();
    }, [page, adoptCategory]);

    // 스크롤 이벤트 리스너 설정
    useEffect(() => {
        const handleScroll = () => {
            // 사용자가 페이지 끝부분에 도달하고 데이터 요청 중이 아닌 경우
            if (
                window.innerHeight + window.scrollY >= document.documentElement.offsetHeight - 500 &&
                !isFetching
            ) {
                // 페이지 번호를 증가시켜 다음 데이터를 요청
                setPage((prevPage) => prevPage + 1);
            }
        };

        // 스크롤 이벤트 리스너 등록
        window.addEventListener("scroll", handleScroll);
        // 컴포넌트가 언마운트될 때 리스너 제거
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isFetching]);

    // 서버에 입양동물 리스트 요청
    const axiosAdoptionList = async () => {
        if (isFetching) return; // 이미 요청 중이라면 함수 종료
        setIsFetching(true); // 데이터 요청 시작
        try {
            const response = await axios.get(`http://localhost:8080/api/public/${getCategoryEndpoint()}/${userId ? userId : 0}`, {
                params: {
                    page: page
                },
                headers: {
                    Authorization: token ? `Bearer ${token}` : undefined,
                },
            });

            if (response.status === 200) {
                if (response.data.length === 0) {
                    // 더 이상 데이터가 없는 경우
                    setIsFetching(false);
                    return;
                }
                setPets((prevPets) => [...prevPets, ...response.data]); // 기존 데이터에 추가
                setIsLoading(false); // 로딩 상태 해제
            } else {
                alert("데이터 불러오기 실패");
            }
        } catch (error) {
            alert("서버와의 통신 중 오류가 발생했습니다.");
            console.error("Error: ", error);
        } finally {
            setIsFetching(false); // 데이터 요청 종료
        }
    };

    // 카테고리에 따라 엔드포인트를 변경
    const getCategoryEndpoint = () => {
        switch (adoptCategory) {
            case "DOG":
                return "pets/categories/dogs";
            case "CAT":
                return "pets/categories/cats";
            case "OTHER":
                return "pets/categories/others";
            default:
                return "allPetsInfo";
        }
    };

    // 카테고리가 바뀌면 첫 번째 페이지로 초기화하고 기존 데이터를 초기화
    const handleCategoryChange = (category) => {
        setAdoptCategory(category);
        setPets([]); // 기존 데이터 초기화
        setPage(0); // 페이지 번호 초기화
        setIsLoading(true); // 로딩 상태로 설정
    };

    if (isLoading) {
        return <div className="loading">로딩 중...</div>; // 로딩 중 화면 표시
    }
    
    return (
        <div className="adoptionList">
            <p>사랑이 필요한 아이들에게 손을 내밀어 주세요</p>
            <div className="adoptionList_category">
                <div className="adoptionList_category_com"
                    onClick={() => handleCategoryChange("ALL")}>
                    <img 
                        src={adoptCategory === "ALL" ? all_b : all_bl } 
                        alt="전체" />
                    <p className={`${adoptCategory === "ALL" ? "active" : ""}`}>전체</p>
                </div>
                <div className="adoptionList_category_com"
                    onClick={() => handleCategoryChange("DOG")}>
                    <img 
                        src={adoptCategory === "DOG" ? dog_b : dog_bl } 
                        alt="" />
                    <p className={`${adoptCategory === "DOG" ? "active" : ""}`}>강아지</p>
                </div>
                <div className="adoptionList_category_com"
                    onClick={() => handleCategoryChange("CAT")}>
                    <img 
                        src={adoptCategory === "CAT" ? cat_b : cat_bl } 
                        alt="" />
                    <p className={`${adoptCategory === "CAT" ? "active" : ""}`}>고양이</p>
                </div>
                <div className="adoptionList_category_com"
                    onClick={() => handleCategoryChange("OTHER")}>
                    <img 
                        src={adoptCategory === "OTHER" ? paw_b : paw_bl } 
                        alt="" />
                    <p className={`${adoptCategory === "OTHER" ? "active" : ""}`}>그 외</p>
                </div>
            </div>
            <div className="adoptionList_Group">
                {pets.map((pet, index) => (
                    <PetCard key={index} pet={pet} userId={userId} token={token}/>
                ))}
            </div>
            <div className="adoptionList_banner" onClick={() => nav('/matching-list')}>
                <p>특별한 인연을<br/>찾아드립니다</p>
                <img src={bannerImg} alt="" />
                <div className="adoptionList_banner_matchingBtn">
                    <p>매칭하기</p>
                    <img src={Click} alt="" />
                </div>
            </div>
            <img 
                src={upbtn} 
                alt="" 
                style={{
                    width:"50px", 
                    borderRadius:"32px", 
                    position:"fixed",
                    bottom:"100px",
                    right:"120px",
                    boxShadow:"4px 4px 10px rgba(0,0,0,0.25)",
                    cursor:"pointer"
                    }}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}/>
        </div>
    );
}

export default AdoptionList;