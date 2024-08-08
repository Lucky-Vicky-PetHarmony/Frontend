import React from "react";
import '../../style/boardPost/BoardPostContent.css';


const BoardPostContent = () => {

    return (
        <div className="BPContent">
            <div className="BPC_title">
                <p>제목</p>
                <input type="text" />
            </div>
            <div className="BPC_content">
                <p>내용</p>
                <textarea type="text" />
            </div>
        </div>
    );
}

export default BoardPostContent;