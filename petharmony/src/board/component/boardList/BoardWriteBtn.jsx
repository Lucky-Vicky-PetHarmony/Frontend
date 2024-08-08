import React from "react";
import '../../style/boardList/BoardWriteBtn.css';
import { useNavigate } from 'react-router-dom';

const BoardWriteBtn = () => {
    const nav = useNavigate();

    return (
        <button 
            className="board_write_btn" 
            onClick={() => nav('/boardPost')}>글쓰기</button>  
    );
}

export default BoardWriteBtn;