import React, { useState, useEffect } from "react";
import "../../styles/dashboard/PinPosts.css";
import BoardListElem from "../../../board/component/boardList/BoardListElem";
import axios from "axios";

const PinPosts = ({ token }) => {
    const [pinPosts, setPinPosts] = useState([]);

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
            <div className="pin_posts_list">
                {pinPosts.map(post => (
                    <BoardListElem key={post.boardId} board={post} />
                ))}
            </div>
        </div>
    );
}

export default PinPosts;