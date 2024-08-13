import React, { useState, useEffect } from "react";
import '../../style/boardList/BoardSelectBtn.css'

const BoardSelectBtn = ({mode, setCategory}) => {
    const [activeBtn, setActiveBtn] = useState( mode === "post" ? "FREE" : "ALL");

    useEffect(() => {
        if(setCategory) {
            setCategory(activeBtn);
        }
    }, [activeBtn]);

    const handleButtonClick = (buttonName) => {
        setActiveBtn(buttonName);
    };

    return (
        <div className="board_select_btn_group">
            {mode!=="post" && (<button 
                className={`board_select_btn ${activeBtn === 'ALL' ? 'active all' : ''}`}
                onClick={() => handleButtonClick("ALL")}>전체</button>)}
            <button 
                className={`board_select_btn ${activeBtn === 'FREE' ? 'active FREE' : ''}`}
                onClick={() => handleButtonClick("FREE")}>자유</button>
            <button 
                className={`board_select_btn ${activeBtn === 'ADOPT' ? 'active ADOPT' : ''}`}
                onClick={() => handleButtonClick("ADOPT")}>입양</button>
            <button 
                className={`board_select_btn ${activeBtn === 'INFORMATION' ? 'active INFORMATION' : ''}`}
                onClick={() => handleButtonClick("INFORMATION")}>정보</button>
        </div>
    );
}

export default BoardSelectBtn;