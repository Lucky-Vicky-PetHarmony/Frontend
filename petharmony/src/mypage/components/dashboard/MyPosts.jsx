import React, { useState, useEffect } from "react";
import axiosInstance from "../../../api/axiosConfig";
import "../../styles/dashboard/MyPosts.css";
import BoardListElem from "../../../board/components/boardList/BoardListElem";
import BoardPagination from "../../../board/components/boardList/BoardPagination";

const MyPosts = () => {
    const [posts, setPosts] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    // 내가 쓴 게시물
    useEffect(() => {
        const fetchMyPosts = async () => {
            try {
                const response = await axiosInstance.get(`/api/user/myPosts?page=${currentPage - 1}&size=10`);
                setPosts(response.data.content);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                console.error("내가 쓴 게시물을 가져오는 데 실패했습니다:", error);
            }
        };
        fetchMyPosts();
    }, [currentPage]);

    return (
        <div className="my_posts">
            <p className="mps_title">내가 쓴 게시물</p>
            <div className="mps_content">
                {posts.map((post, index) => (
                    // customClass prop을 전달하여 특정 CSS 스타일을 적용할 수 있게 함
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
    )
}

export default MyPosts;