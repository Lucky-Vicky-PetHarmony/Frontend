import React, { useState } from "react";
import '../../style/boardView/BoardComment.css';
import sosImg from '../../asset/sos.png'
import commpostImg from '../../asset/commpost.png';
import axiosInstance from "../../../api/axiosConfig";

const BoardComment = ({comment, masterId, updateComment, setReportModal, setReportMode, setReportData, userId, isLogin, formatDate}) => {

    const [updateForm, setUpdateForm] = useState(false);
    const [updatedContent, setUpdatedContent] = useState(comment.content);

    // 신고버튼 클릭 메소드
    const reportBtnClick = (userId, userName, commId) => {
        if(!isLogin){
            alert("로그인이 필요한 서비스입니다.");
            return;
        }
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

    // 댓글 수정 폼 toggle
    const updateFormtoggle = () => {
        setUpdateForm(prevState => !prevState);
    }

    // 댓글 수정
    const commentUpdate = async () => {
        try {
            const response = await 
            axiosInstance.put(`/api/user/comment/update`,
                    {
                        commId: comment.commId,
                        commContent: updatedContent,
                        userId: userId
                    }
                );
                    
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

    // 댓글 삭제
    const commentDelete = async () => {
        const isConfirmed = window.confirm("댓글을 삭제하시겠습니까?");
    
        if (!isConfirmed) {
            return; // 사용자가 취소를 눌렀을 경우, 함수 종료
        }
        try {
            const response = await 
            axiosInstance.delete(`/api/user/comment/delete`,
                    {
                        params: {
                            commId: comment.commId,
                            userId: userId
                        }
                    }
                );

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

    //이름 필터링
    const nameFormat = (name) => {
        if(name==="(알수없음)"){
            return name
        } else if(name.length <= 2) {
            // 이름이 2글자 이하인 경우 첫 글자만 남기고 * 처리
            return name[0] + '*';
        } else {
            // 첫 글자와 마지막 글자를 제외한 부분을 *로 처리
            const middle = '*'.repeat(name.length - 2);
            return name[0] + middle + name[name.length - 1];
        }
    }

    return (
        <div className="BoardComment"> 
            <div className="BC_top">
                {/* 댓글정보 */}
                <div className="BC_top_left">
                    <p className="BC_top_left_writer">
                        {comment.userId === userId ? comment.userName : nameFormat(comment.userName)}
                    </p>
                    <p className="BC_top_left_time">
                    {comment.commUpdate===comment.commCreate ? formatDate(comment.commUpdate) : `${formatDate(comment.commUpdate)} (수정됨)`}

                    </p>
                    {/* 게시글작성자일때 */}
                    {comment.userId === masterId && (<div className="BC_top_left_master">작성자</div>)}
                </div>

                {/* 신고 */}
                {userId !== comment.userId && 
                 comment.userName !== "(알수없음)" && 
                 comment.content !== "관리자에 의해 삭제된 댓글입니다." && (
                    <div className="BC_top_report" onClick={() => reportBtnClick(comment.userId, comment.userName, comment.commId)}>
                        <img src={sosImg} alt="" />
                        <p>신고</p>
                    </div>
                )}

                {/* 댓글작성자일때 수정, 삭제*/}
                {userId === comment.userId && !updateForm &&(<div className="BC_top_update">
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