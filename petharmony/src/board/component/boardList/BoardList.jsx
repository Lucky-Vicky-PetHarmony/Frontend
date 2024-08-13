import React, { useState, useEffect } from "react";
import '../../style/boardList/BoardList.css';
import boardbannerimg from "../../asset/boardbanner.png"
import BoardPagination from "./BoardPagination";
import BoardSelectBtn from "./BoardSelectBtn";
import BoardWriteBtn from "./BoardWriteBtn";
import BoardSearch from "./BoardSearch";
import BoardFilter from "./BoardFilter";
import BoardListElem from "./BoardListElem";
import axios from "axios";


const BoardList = () => {
    const [category, setCategory] = useState('ALL');
    const [filter, setFilter] = useState("date");
    const [page, setPage] = useState(0);
    const [boardData, setBoardData] = useState([]);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        axiosBoardList();
    }, [category, filter, page]);

    const axiosBoardList = async () => {
        // 서버에 보낼 데이터를 객체 형식으로 작성합니다.
        const params = {
            category: category,
            sortBy: filter,
            page: page,
            size: 10
        };
        try {
            const response = await axios.get('http://localhost:8080/api/public/board/list', {params});

            if (response.status === 200) {
                setBoardData(response.data.content); // 서버로부터 받은 데이터를 상태로 저장
                setTotalPages(response.data.totalPages); // 총 페이지 수 상태로 저장
            } else {
                alert("게시글 불러오기 실패");
            }
        } catch (error) {
            if (error.response) {
                alert("게시글 불러오기 실패");
            } else if (error.requset) {
                alert("서버와의 통신 중 오류가 발생했습니다.");
            }
            console.error("Error: ", error);
        }
    };

    // 카테고리 변경 시 페이지를 0번으로 초기화
    const handleCategoryChange = (newCategory) => {
        setCategory(newCategory);
        setPage(0); // 페이지를 초기화
    };

    // 필터 변경 시 페이지를 0번으로 초기화
    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
        setPage(0); // 페이지를 초기화
    };

    return (
        <div className="boardlist">
            <img src={boardbannerimg} alt="" />
            <div className="boardlist_top_top">
                <BoardSelectBtn mode={"list"} setCategory={handleCategoryChange} />
                <BoardWriteBtn/>
            </div>
            <div className="boardlist_top_bottom">
                <BoardFilter setFilter={handleFilterChange} />
                <BoardSearch/>
            </div>
            <div className="boardlist_middle">
                {boardData.map(board => (
                    <BoardListElem key={board.boardId} board={board} />
                ))}
            </div>
            <BoardPagination setPage={setPage} totalPages={totalPages} currentPage={page + 1} />
        </div>
    );
}

export default BoardList;