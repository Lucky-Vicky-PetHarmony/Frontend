import React, { useState } from "react";
import "../styles/MatchingBtn.css";
import backgroundImage from '../asset/background.png';


const MatchingBtn = ({wordId, word, setUserWords}) => {
    const [active, setActive] = useState("");

    const wordClick = () => {
        if (active==="active") {
            // 이미 선택된 단어를 다시 클릭한 경우 제거
            setActive("")
            setUserWords(prevWords => prevWords.filter(w => w !== wordId));
        } else {
            // 선택되지 않은 단어를 클릭한 경우 추가
            setActive("active")
            setUserWords(prevWords => [...prevWords, wordId]);
        }
    }

    return (
        <div 
            className={`matchingbtn ${active}`}
            onClick={() => { wordClick() }}>
            {word}
        </div>
    );
}

export default MatchingBtn;