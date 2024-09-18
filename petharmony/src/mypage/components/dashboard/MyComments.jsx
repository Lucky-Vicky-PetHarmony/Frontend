import React, { useState, useEffect } from "react";
import axiosInstance from "../../../api/axiosConfig";
import "../../styles/dashboard/MyComments.css";
import MyCommentList from "../dashboard/commentList/MyCommentList";

const MyComments = () => {
    const [commentData, setCommentData] = useState([]);

    // 내가 쓴 댓글
    useEffect(() => {
        const fetchMyComments = async () => {
            try {
                const response = await axiosInstance.get('/api/user/myComments');
                if (response.status === 200) {
                    setCommentData(response.data);
                }
            } catch (error) {
                console.error("댓글 데이터를 가져오는 데 실패했습니다.", error);
            }
        };
        fetchMyComments();
    }, []);

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