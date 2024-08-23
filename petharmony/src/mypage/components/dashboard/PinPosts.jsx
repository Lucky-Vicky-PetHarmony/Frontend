import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/dashboard/PinPosts.css";
import BoardListElem from "../../../board/components/boardList/BoardListElem";

const PinPosts = ({ token }) => {
    // PIN 게시물 목록 상태
    const [pinPosts, setPinPosts] = useState([]);

    // PIN 게시물 가져오는 함수
    useEffect(() => {
        const fetchPinPosts = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/user/pinPosts', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setPinPosts(response.data);
            } catch (error) {
                console.error("핀 게시물을 가져오는 데 실패했습니다:", error);
            }
        };
        fetchPinPosts();
    }, [token]);

    return (
        <div className="pin_posts">
            <p className="pp_title">PIN 게시물</p>
            <div className="pp_content">
                {pinPosts.map(post => (
                    // customClass prop을 전달하여 특정 CSS 스타일을 적용할 수 있게 함
                    <BoardListElem key={post.boardId} board={post} customClass="custom_board_list_elem" />
                ))}
            </div>
        </div>
    );
}

export default PinPosts;