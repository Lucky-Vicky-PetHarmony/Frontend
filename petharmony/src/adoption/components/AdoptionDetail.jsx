import React, { useState, useEffect } from "react";
import "../styles/AdoptionDetail.css";
import AdoptionDetailPet from "./AdoptionDetailPet";
import AdoptionDetailShelter from "./AdoptionDetailShelter";
import useAuthStore from '../../store/useAuthStore';
import axios from "axios";
import { useParams } from "react-router-dom";
import Loading from '../../common/Loading/Loading';


const AdoptionDetail = () => {
    // localstorage에서 토큰과 userId를 가져옴
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    
    // 서버로 부터 받은 데이터 저장
    const [ pet, setPet ] = useState(null);

    // 보여줄 입양동물의 boardId를 url에서 추출
    const { desertionNo } = useParams(); //URL파라미터를 가져옴. 여기서는 게시물 번호를 가져옴

    useEffect(() => {
        axiosAdoptionDetail();
    }, [])

    // 서버에 입양동물 리스트 요청
    const axiosAdoptionDetail = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/public/${desertionNo}/${userId?userId:0}`, {
                headers: {
                    Authorization: token ? `Bearer ${token}` : undefined,
                },
            });

            if (response.status === 200) {
                setPet(response.data);
            } else {
                alert("데이터 불러오기 실패");
            }
        } catch (error) {
            alert("서버와의 통신 중 오류가 발생했습니다.");
            console.error("Error: ", error);
        }
    };

    // 데이터가 아직 로드되지 않았을 때 로딩 메시지 표시
    if (!pet) {
        return <Loading/>;
    }
    
    return (
        <div className="adoptionDetail">
            <p>🍀 입양 동물 정보</p>
            <AdoptionDetailPet pet={pet} token={token} userId={userId}/>
            <p>🏡 해당 동물을 보호하고 있는 보호소 정보</p>
            <AdoptionDetailShelter pet={pet}/>
        </div>
    );
}

export default AdoptionDetail;