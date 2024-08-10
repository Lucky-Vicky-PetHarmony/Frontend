import React from "react";
import '../../style/boardPost/BoardPostContent.css';


const BoardPostContent = ({setTitle, setContent}) => {
    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    return (
        <div className="BPContent">
            <div className="BPC_title">
                <p>제목</p>
                <input type="text" onChange={handleTitleChange}/>
            </div>
            <div className="BPC_content">
                <p>내용</p>
                <textarea type="text" onChange={handleContentChange}/>
            </div>
        </div>
    );
}

export default BoardPostContent;