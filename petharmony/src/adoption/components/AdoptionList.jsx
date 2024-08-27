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
import { useNavigate } from "react-router-dom";


const AdoptionList = () => {
    // 페이지 이동시
    const nav = useNavigate();
    
    // 공유저장소에서 토큰과 userId 가져옴
    const { token, userId } = useAuthStore();

    const [ pets, setPets ] = useState([]);                   // 서버에서 가져온 동물 데이터
    const [isLoading, setIsLoading] = useState(true);       // 초기 로딩 상태 추가
    const [ page, setPage ] = useState(0);                  // 요청할 페이지
    const [isFetching, setIsFetching] = useState(false);    // 추가 데이터 요청 중 상태

    const [adoptCategory, setAdoptCategory] = useState("ALL");  // 카테고리 선택

    // 페이지 값이 증가하거나, 카테고리가 변한때 서버에 데이터 요청
    useEffect(() => {
        axiosAdoptionList();
    }, [page, adoptCategory]);


    useEffect(() => {
        // 윈도우 객체에 스크롤 이벤트 리스너 추가, 사용자가 페이지를 스크롤할때마다 handleScroll 함수 호출
        window.addEventListener("scroll", handleScroll);
        // 컴포넌트가 언마운트, 리렌더링될 때 호출, 메모리 누수 방지
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    // 사용자가 페이지를 스크롤할 때마다 호출, 페이지 끝에 도달했는지 확인
    const handleScroll = () => {

        // window.innerHeight : 브라우저 창의 뷰포트 높이
        // document.documentElement.scrollTop : 현재 문서 상단에서부터 현재 스크롤 위치까지의 거리
        // document.documentElement.offsetHeight-450 : 마지막 페이지의 카드의 하단
        if ((window.innerHeight + window.scrollY >= document.documentElement.offsetHeight-450) && !isFetching) {
        setIsFetching(true);
        setPage(prevPage => prevPage + 1);
    }
    };

    // 서버에 입양동물 리스트 요청
    const axiosAdoptionList = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/public/${getCategoryEndpoint()}`, {
                params: {
                    page: page
                },
                headers: {
                    Authorization: token ? `Bearer ${token}` : undefined,
                },
            });

            if (response.status === 200) {
                setPets(prevPets => [...prevPets, ...response.data]); // 이전 데이터에 새로운 데이터 추가
                setIsLoading(false);
                setIsFetching(false);
            } else {
                alert("데이터 불러오기 실패");
            }
        } catch (error) {
            alert("서버와의 통신 중 오류가 발생했습니다.");
            console.error("Error: ", error);
        }finally{
            setIsFetching(false);
        }
    };

    // 카테고리에 따라 엔드포인트 변경
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

    // 카테고리가 바뀌면 첫번째 페이지로 초기화 및 기존 데이터 초기화
    const handleCategoryChange = (category) => {
        setAdoptCategory(category);
        setPets([]); // 카테고리가 변경되면 기존 데이터 초기화
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
                        src={adoptCategory==="ALL" ? all_b : all_bl } 
                        alt="전체" />
                    <p className={`${adoptCategory==="ALL"?"active":""}`}>전체</p>
                </div>
                <div className="adoptionList_category_com"
                    onClick={() => handleCategoryChange("DOG")}>
                    <img 
                        src={adoptCategory==="DOG" ? dog_b : dog_bl } 
                        alt="" />
                    <p className={`${adoptCategory==="DOG"?"active":""}`}>강아지</p>
                </div>
                <div className="adoptionList_category_com"
                    onClick={() => handleCategoryChange("CAT")}>
                    <img 
                        src={adoptCategory==="CAT" ? cat_b : cat_bl } 
                        alt="" />
                    <p className={`${adoptCategory==="CAT"?"active":""}`}>고양이</p>
                </div>
                <div className="adoptionList_category_com"
                    onClick={() => handleCategoryChange("OTHER")}>
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
            <div className="adoptionList_banner" onClick={() => nav('/matching')}>
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