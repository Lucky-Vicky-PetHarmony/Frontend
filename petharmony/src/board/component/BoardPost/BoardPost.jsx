import React from "react";
import '../../style/boardPost/BoardPost.css';
import BoardPostCategory from "./BoardPostCategory";
import BoardPostContent from "./BoardPostContent";
import BoardPostFile from './BoardPostFile';
import BoardPostWarningMsg from '../../asset/BoardPostWarningMsg.png'
import { useNavigate } from 'react-router-dom';


const BoardPost = () => {
    const nav = useNavigate();

    return (
        <div className="BP">
            <img className="BP_WarningMsg" src={BoardPostWarningMsg} alt="" />
            <BoardPostCategory/>
            <BoardPostContent/>
            <BoardPostFile/>
            <div className="BP_buttons">
                <div className="BP_buttons_cancle" onClick={() => nav('/boardList')}>취소</div>
                <div className="BP_buttons_post">등록</div>
            </div>
        </div>
    );
}

export default BoardPost;