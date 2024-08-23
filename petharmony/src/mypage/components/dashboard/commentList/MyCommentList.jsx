import React from "react";
import { useNavigate } from "react-router-dom";
import "../../../styles/dashboard/commentList/MyCommentList.css";
import pictureIcon from "../../../../board/asset/picture.png";
import viewIcon from "../../../../board/asset/view.png";
import commentIcon from "../../../../board/asset/comment.png";
import pinIcon from "../../../../board/asset/pin_gray.png";
import replyIcon from "../../../assets/reply.png";

const MyCommentList = ({ comment }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/board/view/${comment.boardId}`, { state: { userId: comment.userId } });
    };

    const categoryFormat = (category) => {
        switch (category) {
            case "ADOPT":
                return "입양";
            case "INFORMATION":
                return "정보";
            case "FREE":
                return "자유";
            default:
                return "";
        }
    };

    return (
        <div className="my_comment_list" onClick={handleClick}>
            <div className="board_container">
                <div className="bc_left">
                    <div className={`bc_left_category ${comment.category}`}>
                        {categoryFormat(comment.category)}
                    </div>
                    <p className="bc_left_title">{comment.boardTitle}</p>
                    {comment.image && <img src={pictureIcon} alt="" />}
                </div>
                <div className="bc_right">
                    <div className="bc_right_top">
                        <div className="bc_right_top_child">
                            <img src={viewIcon} alt="" />
                            <p>{comment.viewCount}</p>
                        </div>
                        <div className="bc_right_top_child">
                            <img src={commentIcon} alt="" style={{ padding: '1.5px' }} />
                            <p>{comment.commentCount}</p>
                        </div>
                        <div className="bc_right_top_child pin">
                            <img src={pinIcon} alt="" style={{ padding: '1.5px' }} />
                            <p>{comment.pinCount}</p>
                        </div>
                    </div>
                    <p className="bc_right_bottom">{comment.boardUpdate}</p>
                </div>
            </div>
            <div className="comment_container">
                <img className="cc_icon" src={replyIcon} alt="" />
                <p className="cc_reply">{comment.content}</p>
            </div>
        </div>
    );
};

export default MyCommentList;
