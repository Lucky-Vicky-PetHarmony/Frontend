import React, { useState, useEffect } from "react";
import axiosInstance from "../../../api/axiosConfig";
import "../../styles/dashboard/PinPosts.css";
import BoardListElem from "../../../board/components/boardList/BoardListElem";
import BoardPagination from "../../../board/components/boardList/BoardPagination";

const PinPosts = () => {
    const [pinPosts, setPinPosts] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    // PIN 게시물
    useEffect(() => {
        const fetchPinPosts = async () => {
            try {
                const response = await axiosInstance.get(`/api/user/pinPosts?page=${currentPage - 1}&size=10`);
                setPinPosts(response.data.content);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                console.error("핀 게시물을 가져오는 데 실패했습니다:", error);
            }
        };
        fetchPinPosts();
    }, [currentPage]);

    return (
        <div className="pin_posts">
            <p className="pp_title">PIN 게시물</p>
            <div className="pp_content">
                {pinPosts.map((post, index) => (
                    /* 특정 경로에 대해 각 컴포넌트 렌더링 */
                    <BoardListElem key={index} board={post} customClass="custom_board_list_elem" />
                ))}
            </div>
            <BoardPagination
                customClass="custom_board_pagination2"
                setPage={setCurrentPage}
                totalPages={totalPages}
                currentPage={currentPage}
            />
        </div>
    );
}

export default PinPosts;