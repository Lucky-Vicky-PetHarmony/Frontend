import React, { useState } from "react";
import '../../style/boardList/BoardSearch.css';
import searchImg from "../../asset/search.png";

const BoardSearch = () => {
    return (
        <div className="board_search">
            <input type="text" placeholder="검색어를 입력하세요"/>
            <img src={searchImg} alt="" />
        </div>
    );
}

export default BoardSearch;