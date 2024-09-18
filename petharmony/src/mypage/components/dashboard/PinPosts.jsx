import React, { useState, useEffect } from "react";
import axiosInstance from "../../../api/axiosConfig";
import "../../styles/dashboard/PinPosts.css";
import BoardListElem from "../../../board/components/boardList/BoardListElem";

const PinPosts = () => {
    const [pinPosts, setPinPosts] = useState([]);

    // PIN 게시물
    useEffect(() => {
        const fetchPinPosts = async () => {
            try {
                const response = await axiosInstance.get('/api/user/pinPosts');
                setPinPosts(response.data);
            } catch (error) {
                console.error("핀 게시물을 가져오는 데 실패했습니다:", error);
            }
        };
        fetchPinPosts();
    }, []);

    return (
        <div className="pin_posts">
            <p className="pp_title">PIN 게시물</p>
            <div className="pp_content">
                {pinPosts.map(post => (
                    /* 특정 경로에 대해 각 컴포넌트 렌더링 */
                    <BoardListElem key={post.boardId} board={post} customClass="custom_board_list_elem" />
                ))}
            </div>
        </div>
    );
}

export default PinPosts;