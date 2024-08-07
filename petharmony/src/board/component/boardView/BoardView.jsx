import React from "react";
import '../../style/boardView/BoardView.css';
import BoardContent from "./BoardContent";
import BoardCommentInput from './BoardCommentInput';
import BoardComment from './BoardComment';


const BoardView = () => {

    return (
        <div className="BoardView">
            <BoardContent />
            <BoardCommentInput/>
            <BoardComment/>
            <BoardComment/>
            <BoardComment/>
            <BoardComment/>
            <BoardComment/>
            <div className="BoardView_backbtn">목록</div>
        </div> 
    );
}

export default BoardView;