import React, { useState, useEffect } from "react";
import axiosInstance from "../../../api/axiosConfig";
import "../../styles/dashboard/MyPosts.css";
import BoardListElem from "../../../board/components/boardList/BoardListElem";

const MyPosts = () => {
    const [posts, setPosts] = useState([]);

    // PIN 게시물
    useEffect(() => {
        const fetchMyPosts = async () => {
            try {
                const response = await axiosInstance.get('/api/user/myPosts');
                setPosts(response.data);
            } catch (error) {
                console.error("핀 게시물을 가져오는 데 실패했습니다:", error);
            }
        };
        fetchMyPosts();
    }, []);

    return (
        <div className="my_posts">
            <p className="mps_title">내가 쓴 게시물</p>
            <div className="mps_content">
                {posts.map(post => (
                    // customClass prop을 전달하여 특정 CSS 스타일을 적용할 수 있게 함
                    <BoardListElem key={post.boardId} board={post} customClass="custom_board_list_elem" />
                ))}
            </div>
        </div>
    )
}

export default MyPosts;