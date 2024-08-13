import React from "react";
import '../../style/boardList/BoardListElem.css';
import viewimg from '../../asset/view.png';
import commentimg from '../../asset/comment.png';
import pictureimg from '../../asset/picture.png';


const BoardListElem = ({board}) => {

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

    return (
        <div className="boardcontent">
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
                    <div className="boardcontent_right_top_child comment">
                        <img src={commentimg} alt="" style={{padding: '1.5px'}}/>
                        <p>{board.commentCount}</p>
                    </div>
                </div>
                <p className="boardcontent_right_bottom">{board.boardUpdate}</p>
            </div>
        </div>
    );
}

export default BoardListElem;