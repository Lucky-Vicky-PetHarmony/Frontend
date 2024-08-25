import React from "react";
import '../../style/boardList/BoardListElem.css';
import viewimg from '../../asset/view.png';
import commentimg from '../../asset/comment.png';
import pinimg from '../../asset/pin_gray.png';
import pictureimg from '../../asset/picture.png';
import { useNavigate } from 'react-router-dom';

const BoardListElem = ({ board, customClass }) => {
    const nav = useNavigate(); //페이지 이동을 위한 navigate

    const handleClick = () => {
        nav(`/board/view/${board.boardId}`);
    };

    const categotyFormat = (category) => {
        switch(category) {
            case "ADOPT":
                return "입양";
            case "INFORMATION":
                return "정보";
            case "FREE":
                return "자유";
            default:
                return ""; // 추가적인 케이스가 없을 때 반환될 기본 값
        }
    }

    // 날짜 형식
    const formatDate = (date) => {
        if (!date) return "-";
        const redate = date.replace(/-/g, '.'); //전체 문자열 검사해서 치환
        return redate.slice(0, 16);
    }

    return (
        <div className={`boardcontent ${customClass}`} onClick={handleClick}>
            <div className="boardcontent_left">
                <div
                    className={`boardcontent_left_category ${board.category}`}
                >
                    {categotyFormat(board.category)}
                </div>
                <p className="boardcontent_left_title">{board.boardTitle}</p>
                {board.image && <img src={pictureimg} alt="" />}
            </div>
            <div className="boardcontent_right">
                <div className="boardcontent_right_top">
                    <div className="boardcontent_right_top_child">
                        <img src={viewimg} alt=""/>
                        <p>{board.viewCount}</p>
                    </div>
                    <div className="boardcontent_right_top_child">
                        <img src={commentimg} alt="" style={{padding: '1.5px'}}/>
                        <p>{board.commentCount}</p>
                    </div>
                    <div className="boardcontent_right_top_child pin">
                        <img src={pinimg} alt="" style={{padding: '1.5px'}}/>
                        <p>{board.pinCount}</p>
                    </div>
                </div>
                <p className="boardcontent_right_bottom">
                    {board.boardCreate===board.boardUpdate ? formatDate(board.boardUpdate) : `(수정됨) ${formatDate(board.boardUpdate)}`}
                </p>
            </div>
        </div>
    );
}

export default BoardListElem;