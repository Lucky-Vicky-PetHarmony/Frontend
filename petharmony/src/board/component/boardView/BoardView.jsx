import React from "react";
import '../../style/boardView/BoardContent.css';
import BoardContent from "./BoardContent";
import BoardCommentInput from './BoardCommentInput';
import BoardComment from './BoardComment';


const BoardView = () => {

    return (
        <div className="">
            <BoardContent />
            <BoardCommentInput/>
            <BoardComment/>
            <BoardComment/>
            <BoardComment/>
            <BoardComment/>
            <BoardComment/>
        </div> 
    );
}

export default BoardView;