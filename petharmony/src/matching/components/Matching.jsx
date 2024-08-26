import React, { useEffect, useState } from "react";
import "../styles/Matching.css";
import backgroundImage from '../asset/background.png';
import MatchingBtn from "./MatchingBtn";
import axios from "axios";
import useAuthStore from '../../store/useAuthStore';
import MatchingAddr from "./MatchingAddr";

const Matching = () => {
    //로그인한 사용자의 token과 userId
    const { token, userId } = useAuthStore();
    
    const [words, setWords] = useState([]);
    const [userWords, setUserWords] = useState([]);

    const [addr, setAddr] = useState();
    const [existAddr, setExistAddr] = useState();

    useEffect(() => {
        if(token){
            fetchWord();
            fetchAddr();
        }
    }, [token]);

    
    // 단어 가져오기
    const fetchWord = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/user/allwords`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            if (response.status === 200) {
                setWords(response.data);
            } else {
                alert("단어목록 가져오기 실패");
            }
        } catch (error) {
            console.error("단어목록 가져오기 실패: ", error);
        }
    };

     // 기존주소 가져오기
     const fetchAddr = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/user/existaddr/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            if (response.status === 200) {
                setExistAddr(response.data);
            } else {
                alert("기존 주소 가져오기 실패");
            }
        } catch (error) {
            console.error("기존주소 가져오기 실패: ", error);
        }
    };

    // TODO: 서버에 단어 보내기
    // TODO: 서버에 주소 보내기
    // TODO: 응답오면 페이지 이동(매칭리스트)




    return (
        <div className="matching" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <p>당신만을 위한 특별한 매칭서비스</p>
            <p className="matching_ex">당신에게 특별한 인연, 특별한 친구를 찾아드립니다.<br/>마음이 가는 태그를 선택해주세요</p>
            <div className="matching_words">
                {words.map(word => (
                    <MatchingBtn key={word.id} wordId={word.id} word={word.word} setUserWords={setUserWords}/>
                ))}
            </div>
            <div className="matching_address">
                <p>원활한 매칭을 위해 주소를 입력해주세요 🐶</p>
                <MatchingAddr setAddr={setAddr} existAddr={existAddr}/>
            </div>

            <div className="matching_btn">매칭 GOGO!! 🐶</div>
        </div>
    );
}

export default Matching;