import React, { useState } from "react";
import '../../style/boardList/BoardSelectBtn.css'

const BoardSelectBtn = () => {
    const [activeBtn, setActiveBtn] = useState("all");

    const handleButtonClick = (buttonName) => {
        setActiveBtn(buttonName);
    };

    return (
        <div className="board_select_btn_group">
            <button 
                className={`board_select_btn ${activeBtn === 'all' ? 'active all' : ''}`}
                onClick={() => handleButtonClick("all")}>전체</button>
            <button 
                className={`board_select_btn ${activeBtn === 'free' ? 'active free' : ''}`}
                onClick={() => handleButtonClick("free")}>자유</button>
            <button 
                className={`board_select_btn ${activeBtn === 'adoption' ? 'active adoption' : ''}`}
                onClick={() => handleButtonClick("adoption")}>입양</button>
            <button 
                className={`board_select_btn ${activeBtn === 'information' ? 'active information' : ''}`}
                onClick={() => handleButtonClick("information")}>정보</button>
        </div>
    );
}

export default BoardSelectBtn;