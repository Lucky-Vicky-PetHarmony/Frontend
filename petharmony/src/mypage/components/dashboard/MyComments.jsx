import React, { useState, useEffect } from "react";
import axiosInstance from "../../../api/axiosConfig";
import "../../styles/dashboard/MyComments.css";
import MyCommentList from "../dashboard/commentList/MyCommentList";
import BoardPagination from "../../../board/components/boardList/BoardPagination";

const MyComments = () => {
    const [commentData, setCommentData] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    // 내가 쓴 댓글
    useEffect(() => {
        const fetchMyComments = async () => {
            try {
                const response = await axiosInstance.get(`/api/user/myComments?page=${currentPage - 1}&size=5`);
                setCommentData(response.data.content);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                console.error("댓글 데이터를 가져오는 데 실패했습니다.", error);
            }
        };
        fetchMyComments();
    }, [currentPage]);

    return (
        <div className="my_comments">
            <p className="mc_title">내가 쓴 댓글</p>
            <div className="mc_content">
                {commentData.map((comment, index) => (
                    <MyCommentList key={index} comment={comment} />
                ))}
            </div>
            <BoardPagination
                customClass="custom_board_pagination3"
                setPage={setCurrentPage}
                totalPages={totalPages}
                currentPage={currentPage}
            />
        </div>
    )
}

export default MyComments;