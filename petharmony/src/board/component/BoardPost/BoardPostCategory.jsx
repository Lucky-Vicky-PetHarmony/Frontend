import React from "react";
import '../../style/boardPost/BoardPostCategory.css';
import BoardSelectBtn from '../boardList/BoardSelectBtn';


const BoardPostCategory = ({setCategory}) => {

    return (
        <div className="BPCategory">
            <p>글 작성에 앞서 글 내용에 맞는 카테고리를 선택해주세요.
                <span> * 미선택시 자유게시판에 게시됩니다.</span>
            </p>
            <BoardSelectBtn  mode={"post"} setCategory={setCategory}/>
        </div>
    );
}

export default BoardPostCategory;