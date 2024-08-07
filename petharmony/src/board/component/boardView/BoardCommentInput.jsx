import React from "react";
import '../../style/boardView/BoardCommentInput.css';
import commpostImg from '../../asset/commpost.png';
import warningImg from '../../asset/warning.png'


const BoardCommentInput = () => {
    return (
        <div className="board_comment_input">
            <div className="bci_warning">
                <img src={warningImg} alt="" />
                <p>모두가 함께하는 따뜻한 공간을 만들기 위해, 욕설이나 비방, 상처를 주는 언행은 자제해 주시기 바랍니다. <br></br>
                불쾌감을 줄 수 있는 댓글은 관리자의 판단 하에 삭제될 수 있으며, 반복적인 경우 제재 조치가 취해질 수 있습니다.</p>
            </div>
            <div className="bci_input">
                <input type="text" />
                <img src={commpostImg} alt="댓글전송버튼" />
            </div>
        </div>
    );
}

export default BoardCommentInput;