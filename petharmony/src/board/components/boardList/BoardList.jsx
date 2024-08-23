import React, { useState, useEffect, useCallback } from "react";
import '../../style/boardList/BoardList.css';
import boardbannerimg from "../../asset/boardbanner.png"
import BoardPagination from "./BoardPagination";
import BoardSelectBtn from "./BoardSelectBtn";
import BoardWriteBtn from "./BoardWriteBtn";
import BoardSearch from "./BoardSearch";
import BoardFilter from "./BoardFilter";
import BoardListElem from "./BoardListElem";
import axios from "axios";

import useAuthStore from "../../../store/useAuthStore";

const BoardList = () => {

    //로그인한 사용자의 token과 userId
    const { token, userId } = useAuthStore();

    const [category, setCategory] = useState('ALL');
    const [filter, setFilter] = useState("date");
    const [page, setPage] = useState(1);
    const [boardData, setBoardData] = useState([]);
    const [totalPages, setTotalPages] = useState(0);

    // 검색기능
    const [searchFilter, setSearchFilter] = useState('title');
    const [searchText, setSearchText] = useState('');

    // 카테고리, 필터, 페이지 변경시마다 서버 요청
    useEffect(() => {
        if(token){
            axiosBoardList();
        }
    }, [category, filter, page, token]);

    //리스트
    const axiosBoardList = async () => {
        
        const params = searchText.trim() === "" 
            ? { category, sortBy: filter, page: page - 1, size: 10 } 
            : { category, sortBy: filter, keyword: searchText, searchType: searchFilter, page: page - 1, size: 10 };

        //검색어가 없으면 /list 요청, 검색어가 있으면 /search 요청
        const url = searchText.trim() === "" 
            ? 'http://localhost:8080/api/user/board/list' 
            : 'http://localhost:8080/api/user/board/search';


        try {
            const response = await axios.get(url, {
                params,
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });

            if (response.status === 200) {
                setBoardData(response.data.content); // 서버로부터 받은 데이터를 상태로 저장
                setTotalPages(response.data.totalPages); // 총 페이지 수 상태로 저장
            } else {
                alert("데이터 불러오기 실패");
            }
        } catch (error) {
            alert("서버와의 통신 중 오류가 발생했습니다.");
            console.error("Error: ", error);
        }
    };

    return (
        <div className="boardlist">
            <img src={boardbannerimg} alt="" />
            <div className="boardlist_top_top">
                <BoardSelectBtn mode={"list"} category={category} setCategory={setCategory} setPage={setPage}/>
                <BoardWriteBtn/>
            </div>
            <div className="boardlist_top_bottom">
                <BoardFilter 
                    mode={"board"}
                    setFilter={setFilter} 
                    setPage={setPage}/>
                <BoardSearch 
                    setSearchFilter={setSearchFilter} 
                    setSearchText={setSearchText} 
                    axiosBoardList={axiosBoardList}
                    setPage={setPage}/>
            </div>
            <div className="boardlist_middle">
                {boardData.length>0?boardData.map(board => (
                    <BoardListElem key={board.boardId} board={board} />
                )):
                <p>게시물이 없습니다.</p>}
            </div>
            <BoardPagination setPage={setPage} totalPages={totalPages} currentPage={page} />
        </div>
    );
}

export default BoardList;