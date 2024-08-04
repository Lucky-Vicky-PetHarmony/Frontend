import React from "react";
import '../style/BoardList.css';
import BoardContent from "./BoardContent";
import BoardPagination from "./BoardPagination";
import BoardSelectBtn from "./BoardSelectBtn";
import BoardWriteBtn from "./BoardWriteBtn";


const BoardList = () => {

    return (
        <div className="boardlist">
            <div className="boardlist_top">
                <BoardSelectBtn/>
                <BoardWriteBtn/>
            </div>
            <div className="boardlist_middle">
                <BoardContent/>
                <BoardContent/>
                <BoardContent/>
                <BoardContent/>
                <BoardContent/>
                <BoardContent/>
                <BoardContent/>
                <BoardContent/>
            </div>
            <BoardPagination/>
        </div>
    );
}

export default BoardList;