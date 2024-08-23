import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/dashboard/MyPosts.css";
import BoardListElem from "../../../board/component/boardList/BoardListElem";

const MyPosts = ({token}) => {
    // 내가 쓴 게시물 목록 상태
    const [posts, setPosts] = useState([]);

    // PIN 게시물 가져오는 함수
    useEffect(() => {
        const fetchMyPosts = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/user/myPosts', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setPosts(response.data);
            } catch (error) {
                console.error("핀 게시물을 가져오는 데 실패했습니다:", error);
            }
        };
        fetchMyPosts();
    }, [token]);

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