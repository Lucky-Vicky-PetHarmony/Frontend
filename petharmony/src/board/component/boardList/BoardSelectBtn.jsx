import React, { useState, useEffect } from "react";
import '../../style/boardList/BoardSelectBtn.css'

const BoardSelectBtn = ({post, setCategory}) => {
    const [activeBtn, setActiveBtn] = useState(post ? post :"all");

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
            {!post && (<button 
                className={`board_select_btn ${activeBtn === 'all' ? 'active all' : ''}`}
                onClick={() => handleButtonClick("all")}>전체</button>)}
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