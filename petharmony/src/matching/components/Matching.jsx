import React, { useEffect, useState } from "react";
import "../styles/Matching.css";
import backgroundImage from '../asset/background.png';
import MatchingBtn from "./MatchingBtn";
import axios from "axios";
import useAuthStore from '../../store/useAuthStore';
import MatchingAddr from "./MatchingAddr";
import { useNavigate } from 'react-router-dom';

const Matching = () => {
    const nav = useNavigate();
    //로그인한 사용자의 token과 userId
    const { token, userId } = useAuthStore();
    
    const [words, setWords] = useState([]);         // 전체단어
    const [userWords, setUserWords] = useState([]); // 사용자가 선택한 단어

    const [addr, setAddr] = useState();             // 사용자 주소
    const [existAddr, setExistAddr] = useState();   // 기존 사용자주소

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
    const sentWords = async () => {
        try {
            const response = await axios.post(`http://localhost:8080/api/user/words`, 
                {
                    userId: userId,                 // 유저 아이디
                    wordId: userWords               // 유저가 선택한 단어 리스트
                },
                {
                    headers: {
                        Authorization: token,
                    },
                });
            if (response.status === 200) {
                nav("/matching-list");
            } else {
                alert("단어 전송에 실패하였습니다. 다시 시도해주세요.")
                console.log("단어 전송 실패");
            }
        } catch (error) {
            alert("서버와의 통신 중 오류가 발생했습니다.");
            console.error("Error: ", error);
        }
    };

    // TODO: 서버에 주소 보내기
    const sentAddr = async () => {
        try {
            const response = await axios.post(`http://localhost:8080/api/user/address`, 
                {
                    userId: userId,                 // 유저 아이디
                    address: addr                   // 주소
                },
                {
                    headers: {
                        Authorization: token,
                    },
                });
            if (response.status === 200) {
            } else {
                alert("주소 전송에 실패하였습니다. 다시 시도해주세요.");
                console.log("주소 전송 실패");
            }
        } catch (error) {
            alert("서버와의 통신 중 오류가 발생했습니다.");
            console.error("Error: ", error);
        }
    };

    // TODO: 성공적으로 서버에 전송이 되면 매칭 리스트로 이동
    const matchingHandler = async () => {
        if (userWords.length === 0) {
            alert("단어를 선택해주세요");
            return;
        } else if (addr == null) {
            alert("주소를 입력해주세요");
            return;
        } else {
            if(addr!==existAddr){
                sentAddr();
            }
            sentWords();
        }
    }




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

            <div className="matching_btn" onClick={() => matchingHandler()}>매칭 GOGO!! 🐶</div>
        </div>
    );
}

export default Matching;