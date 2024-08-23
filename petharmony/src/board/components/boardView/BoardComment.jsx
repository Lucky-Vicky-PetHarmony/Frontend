import React, { useState } from "react";
import '../../style/boardView/BoardComment.css';
import sosImg from '../../asset/sos.png'
import commpostImg from '../../asset/commpost.png';
import axios from "axios";

const BoardComment = ({comment, masterId, updateComment, setReportModal, setReportMode, setReportData}) => {
    const loggedInUserId = 27; // 로그인한 사용자 ID

    const [updateForm, setUpdateForm] = useState(false);
    const [updatedContent, setUpdatedContent] = useState(comment.content);

    const reportBtnClick = (userId, userName, commId) => {
        setReportMode("comment");
        setReportModal(true);
        // 피신고자id, 피신고자 이름, boardId(commmId)
        setReportData(
            {
                reportedId: userId,
                reportedName: userName,
                boardOrCommentId: commId,
            }
        );
    }

    const updateFormtoggle = () => {
        setUpdateForm(prevState => !prevState);
    }

    const commentUpdate = async () => {
        try {
            const response = await 
                axios.put(`http://localhost:8080/api/public/comment/update`,
                    {
                        commId: comment.commId,
                        commContent: updatedContent,
                        userId: loggedInUserId
                    });
                    
                    if(response.status === 200){
                        setUpdateForm(false);
                        updateComment(); //데이터 다시 요청
                    }else{
                        alert("댓글 수정 실패")
                    }
            
        } catch (error) {
            console.error("댓글 수정 중 오류 발생: ", error);
            alert("댓글 수정 중 오류가 발생했습니다.");
        }
    }

    const commentDelete = async () => {
        try {
            const response = await 
                axios.delete(`http://localhost:8080/api/public/comment/delete`,
                    {
                        params: {
                            commId: comment.commId,
                            userId: loggedInUserId
                        }
                    });

                    if (response.status === 200){
                        updateComment(); //데이터 다시 요청
                    } else{
                        alert("댓글 삭제에 실패했습니다.");
                    }
        } catch (error) {
            console.error("댓글 삭제 중 오류 발생: ", error);
            alert("댓글 삭제 중 오류가 발생했습니다.");
        }
    }

    return (
        <div className="BoardComment">
            
            <div className="BC_top">
                {/* 댓글정보 */}
                <div className="BC_top_left">
                    <p className="BC_top_left_writer">{comment.userName}</p>
                    <p className="BC_top_left_time">{comment.commCreate}</p>
                    {/* 게시글작성자일때 */}
                    {comment.userId === masterId && (<div className="BC_top_left_master">작성자</div>)}
                </div>

                {/* 신고 */}
                {loggedInUserId !== comment.userId && 
                 comment.userName !== "(알수없음)" && 
                 comment.content !== "관리자에 의해 삭제된 댓글입니다." && (
                    <div className="BC_top_report" onClick={() => reportBtnClick(comment.userId, comment.userName, comment.commId)}>
                        <img src={sosImg} alt="" />
                        <p>신고</p>
                    </div>
                )}

                {/* 댓글작성자일때 수정, 삭제*/}
                {loggedInUserId === comment.userId && !updateForm &&(<div className="BC_top_update">
                    <p onClick={updateFormtoggle}>수정</p>
                     | 
                    <p onClick={commentDelete}>삭제</p>
                </div>)}
            </div>

            {/* 댓글조회 */}
            {!updateForm && (
                <p className="BC_bottom">{comment.content}</p>)}

            {/* 댓글수정 */}
            {updateForm && (
                <div className="BC_bottom_update">
                    <textarea
                        value={updatedContent}
                        onChange={(e) => setUpdatedContent(e.target.value)}
                    />
                    <img src={commpostImg} alt="" onClick={commentUpdate}/>
                </div>
            )}
            
        </div>
    );
}

export default BoardComment;