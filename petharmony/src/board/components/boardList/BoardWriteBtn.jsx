import React from "react";
import '../../style/boardList/BoardWriteBtn.css';
import { useNavigate } from 'react-router-dom';

const BoardWriteBtn = ({isLogin}) => {
    const nav = useNavigate();

    return (
        <button 
            className="board_write_btn" 
            onClick={isLogin ?
                    () => nav('/board/post'):
                    () => {alert("로그인이 필요한 서비스입니다.")}}>글쓰기</button>  
    );
}

export default BoardWriteBtn;