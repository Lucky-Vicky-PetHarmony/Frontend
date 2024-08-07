import React, { useState } from "react";
import '../../style/boardView/BoardComment.css';
import sosImg from '../../asset/sos.png'
import commpostImg from '../../asset/commpost.png';

const BoardComment = ({loginId, masterId}) => {

    const [updateForm, setUpdateForm] = useState(false);

    const updateFormtoggle = () => {
        setUpdateForm(prevState => !prevState);
    }

    const commentSend = () => {
        setUpdateForm(prevState => !prevState);
        // axios : 댓글 수정
    }

    const commentDelete = () => {
        // axios : 댓글 삭제
    }

    return (
        <div className="BoardComment">
            
            <div className="BC_top">
                {/* 댓글정보 */}
                <div className="BC_top_left">
                    <p className="BC_top_left_writer">이*림</p>
                    <p className="BC_top_left_time">2024.07.08 12:30</p>
                    {/* 게시글작성자일때 */}
                    {masterId===3 && (<div className="BC_top_left_master">작성자</div>)}
                </div>

                {/* 신고 */}
                {loginId !== 2 && (<div className="BC_top_report">
                    <img src={sosImg} alt="" />
                    <p>신고</p>
                </div>)}

                {/* 댓글작성자일때 수정, 삭제*/}
                {loginId === 2 && !updateForm &&(<div className="BC_top_update">
                    <p onClick={() => updateFormtoggle()}>수정</p>
                     | 
                    <p>삭제</p>
                </div>)}
            </div>

            {/* 댓글조회 */}
            {!updateForm && (<p className="BC_bottom">
                루시 너무 귀여워요! 입양해주셔서 정말 감사해요. 루시가 새 가족과 함께 행복한 시간 보내길 바랄게요. 강아지 입양은 정말 큰 결심인데, 가족 모두에게 좋은 추억이 될 것 같아요!
            </p>)}

            {/* 댓글수정 */}
            {updateForm && (<div className="BC_bottom_update">
                <textarea>
                    루시 너무 귀여워요! 입양해주셔서 정말 감사해요. 루시가 새 가족과 함께 행복한 시간 보내길 바랄게요. 강아지 입양은 정말 큰 결심인데, 가족 모두에게 좋은 추억이 될 것 같아요!
                </textarea>
                <img src={commpostImg} alt="" onClick={() => commentSend()}/>
            </div>)}
            
        </div>
    );
}

export default BoardComment;