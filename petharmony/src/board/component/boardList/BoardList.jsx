import React from "react";
import '../../style/boardList/BoardList.css';
import boardbannerimg from "../../asset/boardbanner.png"
import BoardPagination from "./BoardPagination";
import BoardSelectBtn from "./BoardSelectBtn";
import BoardWriteBtn from "./BoardWriteBtn";
import BoardSearch from "./BoardSearch";
import BoardFilter from "./BoardFilter";
import BoardListElem from "./BoardListElem";


const BoardList = () => {

    return (
        <div className="boardlist">
            <img src={boardbannerimg} alt="" />
            <div className="boardlist_top_top">
                <BoardSelectBtn/>
                <BoardWriteBtn/>
            </div>
            <div className="boardlist_top_bottom">
                <BoardFilter/>
                <BoardSearch/>
            </div>
            <div className="boardlist_middle">
                <BoardListElem/>
                <BoardListElem/>
                <BoardListElem/>
                <BoardListElem/>
                <BoardListElem/>
                <BoardListElem/>
                <BoardListElem/>
                <BoardListElem/>
            </div>
            <BoardPagination/>
        </div>
    );
}

export default BoardList;