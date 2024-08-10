import React, { useEffect, useState } from "react";
import '../../style/boardPost/BoardPost.css';
import BoardPostCategory from "./BoardPostCategory";
import BoardPostContent from "./BoardPostContent";
import BoardPostFile from './BoardPostFile';
import BoardPostWarningMsg from '../../asset/BoardPostWarningMsg.png'
import { useNavigate } from 'react-router-dom';
import axios from "axios";


const BoardPost = () => {
    const formData = new FormData();
    const nav = useNavigate();

    const [category, setCategory] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [files, setFiles] = useState([]);

    // 확인용 로그
    // useEffect(()=> {
    //     console.log("category: ", category);
    //     console.log("title: ", title);
    //     console.log("content: ", content);
    //     console.log("files: ", files);
    // }, [category, title, content, files])

    const handleBoardPostBtn = async () => {

        formData.append('userId', 28);
        formData.append('title', title);
        formData.append('content', content);
        formData.append('category', category);

        // 여러 개의 파일 추가
        files.forEach((file, index) => {
            formData.append('images', file);
        });
        try {
            const response = await axios.post('http://localhost:8080/api/public/board/post', formData);

            if (response.status === 200) {
                alert(response.data);
            } else {
                alert("게시글 작성 실패");
            }
        } catch (error) {
            if (error.response) {
                alert("게시글 작성 실패");
            } else if (error.requset) {
                alert("서버와의 통신 중 오류가 발생했습니다.");
            }
            console.error("Error: ", error);
        }
    }

    return (
        <div className="BP">
            <img className="BP_WarningMsg" src={BoardPostWarningMsg} alt="" />
            <BoardPostCategory setCategory={setCategory}/>
            <BoardPostContent setTitle={setTitle} setContent={setContent}/>
            <BoardPostFile setFiles = {setFiles}/>
            <div className="BP_buttons">
                <div className="BP_buttons_cancle" onClick={() => nav('/boardList')}>취소</div>
                <div className="BP_buttons_post" onClick={() => handleBoardPostBtn()}>등록</div>
            </div>
        </div>
    );
}

export default BoardPost;