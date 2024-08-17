import React, { useState } from "react";
import '../../style/boardView/BoardCommentInput.css';
import commpostImg from '../../asset/commpost.png';
import warningImg from '../../asset/warning.png'
import axios from "axios";


const BoardCommentInput = ({ boardId, userId, onCommentSubmit }) => {
    const [ commentContent, setCommentContent ] = useState(""); // 입력된 댓글

    const handleCommentChange = (e) => {
        setCommentContent(e.target.value);
    }

    const commentSubmit = async () => {
        // 아무것도 입력안됐을 경우
        if(!commentContent.trim()){
            alert("댓글 내용을 입력해주세요.");
            return;
        }

        try {
            const response = await 
                axios.post('http://localhost:8080/api/public/comment/post',
                    {
                        boardId: boardId,
                        userId: userId,
                        commContent: commentContent
                    });

                    if(response.status === 200){
                        setCommentContent(""); // 입력필드초기화
                        onCommentSubmit(); // 댓글 목록 다시 불러옴
                    }else{
                        alert("댓글 전송 실패. 다시 시도해주세요.")
                    }
            
        } catch (error) {
            console.error("댓글 전송 중 요류 발생 : ", error);
            alert("댓글을 전송하는 중 오류가 발생했습니다. 잠시후 다시 시도해주세요.")
            
        }
    }


    return (
        <div className="board_comment_input">
            <div className="bci_warning">
                <img src={warningImg} alt="" />
                <p>모두가 함께하는 따뜻한 공간을 만들기 위해, 욕설이나 비방, 상처를 주는 언행은 자제해 주시기 바랍니다. <br></br>
                불쾌감을 줄 수 있는 댓글은 관리자의 판단 하에 삭제될 수 있으며, 반복적인 경우 제재 조치가 취해질 수 있습니다.</p>
            </div>
            <div className="bci_input">
                <input 
                    type="text" 
                    onChange={handleCommentChange}
                    value={commentContent}
                    placeholder="댓글을 입력하세요."/>
                <img 
                    src={commpostImg} 
                    alt="댓글전송버튼" 
                    onClick={commentSubmit}/>
            </div>
        </div>
    );
}

export default BoardCommentInput;