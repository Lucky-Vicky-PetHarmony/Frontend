import React from "react";
import '../../style/boardPost/BoardPostContent.css';


const BoardPostContent = ({setTitle, setContent, title, content}) => {
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
                <input 
                    type="text" 
                    onChange={handleTitleChange}
                    value={title}
                    />
            </div>
            <div className="BPC_content">
                <p>내용</p>
                <textarea 
                    type="text" 
                    onChange={handleContentChange}
                    value={content}/>
            </div>
        </div>
    );
}

export default BoardPostContent;