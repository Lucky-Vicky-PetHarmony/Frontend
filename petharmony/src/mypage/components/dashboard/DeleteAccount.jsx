import React from "react";
import "../../../common.css";
import "../../styles/dashboard/DeleteAccount.css";

const DeleteAccount = () => {
    return (
        <div className="delete_account">
            <p className="da_title">회원 탈퇴</p>
            <div className="da_content">
                회원탈퇴하시겠습니까<br />
                회원탈퇴시 작성한 게시물, 댓글, 좋아요 한 입양동물, 자신의 매칭기록 등<br />
                활동기록이 사라집니다.
            </div>
            <button className="da_btn">탈퇴하기</button>
        </div>
    )
}

export default DeleteAccount;