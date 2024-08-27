import React, { useEffect, useState } from "react";
import "../styles/MatchingList.css";
import axios from "axios";
import bg from "../asset/matchinglistBG.png";
import useAuthStore from '../../store/useAuthStore';
import PetCard from "../../common/pet/components/PetCard";
import { useNavigate } from "react-router-dom";

const MatchingList = () => {
    // 페이지 이동
    const nav = useNavigate();

     // localstorage에서 토큰과 userId를 가져옴
     const userId = localStorage.getItem("userId");
     const token = localStorage.getItem("token");

    const [matchingData, setMatchingData] = useState([]);

    useEffect(() => {
        if(!token&&!userId){
            alert("로그인이 필요한 서비스입니다.")
            nav("/")
        }
        matchingCards();
    }, [token, userId])


    // TODO: 서버에 매칭카드 요청하기, 매칭카드가 없으면 단어선택페이지로 이동
    const matchingCards = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/user/matching/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            if (response.status === 200) {
                if(response.data.length===0){
                    nav("/matching");
                }
                setMatchingData(response.data);
            } else {
                alert("매칭 목록 가져오기 실패");
            }
        } catch (error) {
            console.error("매칭 목록 가져오기 실패: ", error);
        }
    };
    

    return (
        <div className="matchinglistbg" style={{backgroundImage:`url(${bg})`}}>
            <div className="matchinglist">
                <p>당신과 인연이 된 사랑스러운 아이들<br/><span>운명처럼 다가온 이 친구들, 이제 당신의 가족이 되어줄 시간이에요.</span></p>

                <div className="matchinglist_cards">
                    {matchingData.map((pet, index) => (
                        <PetCard key={index} pet={pet} userId={userId} token={token}/>
                    ))}
                </div>

                <div className="rematching" onClick={() => nav('/matching')}>매칭 다시하기 🐶</div>
            </div>
        </div>
    );
}

export default MatchingList;