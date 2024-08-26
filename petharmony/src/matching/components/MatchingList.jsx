import React from "react";
import "../styles/MatchingList.css";
import axios from "axios";
import bg from "../asset/matchinglistBG.png";
import useAuthStore from '../../store/useAuthStore';
import PetCard from "../../common/pet/components/PetCard";
import { useNavigate } from "react-router-dom";

const MatchingList = () => {
    const nav = useNavigate();
    //로그인한 사용자의 token과 userId
    const { token, userId } = useAuthStore();
    

    return (
        <div className="matchinglistbg" style={{backgroundImage:`url(${bg})`}}>
            <div className="matchinglist">
                <p>당신과 인연이 된 사랑스러운 아이들<br/><span>운명처럼 다가온 이 친구들, 이제 당신의 가족이 되어줄 시간이에요.</span></p>

                <div className="matchinglist_cards">
                    <PetCard/>
                    <PetCard/>
                    <PetCard/>
                    <PetCard/>
                    <PetCard/>
                    <PetCard/>
                    <PetCard/>
                    <PetCard/>
                    <PetCard/>
                    <PetCard/>
                    <PetCard/>
                    <PetCard/>
                </div>

                <div className="rematching" onClick={() => nav('/matching')}>매칭 다시하기 🐶</div>
            </div>
        </div>
    );
}

export default MatchingList;