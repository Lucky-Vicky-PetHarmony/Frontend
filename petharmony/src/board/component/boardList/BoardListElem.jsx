import React from "react";
import '../../style/boardList/BoardListElem.css';
import viewimg from '../../asset/view.png';
import commentimg from '../../asset/comment.png';
import pictureimg from '../../asset/picture.png';


const BoardListElem = () => {

    return (
        <div className="boardcontent">
            <div className="boardcontent_left">
                <div className="boardcontent_left_category">입양</div>
                <p className="boardcontent_left_title">제 강아지 귀엽죠?</p>
                <img src={pictureimg} alt="" />
            </div>
            <div className="boardcontent_right">
                <div className="boardcontent_right_top">
                    <div className="boardcontent_right_top_child">
                        <img src={viewimg} alt=""/>
                        <p>1</p>
                    </div>
                    <div className="boardcontent_right_top_child comment">
                        <img src={commentimg} alt="" style={{padding: '1.5px'}}/>
                        <p>1</p>
                    </div>
                </div>
                <p className="boardcontent_right_bottom">2024.07.08 12:30</p>
            </div>
        </div>
    );
}

export default BoardListElem;