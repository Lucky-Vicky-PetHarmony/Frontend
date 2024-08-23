import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/dashboard/MyComments.css";
import MyCommentList from "../dashboard/commentList/MyCommentList";

const MyComments = ({ token }) => {
    // 댓글 상태 
    const [commentData, setCommentData] = useState([]);

    // 내가 작성한 댓글 가져오기
    useEffect(() => {
        const fetchMyComments = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/user/myComments', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (response.status === 200) {
                    setCommentData(response.data);
                }
            } catch (error) {
                console.error("댓글 데이터를 가져오는 데 실패했습니다.", error);
            }
        };
        fetchMyComments();
    }, [token]);

    return (
        <div className="my_comments">
            <p className="mc_title">내가 쓴 댓글</p>
            <div className="mc_content">
                {commentData.map(comment => (
                    <MyCommentList key={comment.commId} comment={comment} />
                ))}
            </div>
        </div>
    )
}

export default MyComments;