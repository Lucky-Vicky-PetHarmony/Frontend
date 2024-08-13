import React, { useEffect, useState } from "react";
import '../../style/boardPost/BoardPost.css';
import BoardPostCategory from "./BoardPostCategory";
import BoardPostContent from "./BoardPostContent";
import BoardPostFile from './BoardPostFile';
import BoardPostWarningMsg from '../../asset/BoardPostWarningMsg.png'
import { useNavigate, useLocation } from 'react-router-dom';
import axios from "axios";


const BoardPost = () => {
    const formData = new FormData();
    const nav = useNavigate();
    const location = useLocation();
    const isEdit = location.state?.isEdit || false; // 수정모드 || 작성모드
    const board = location.state?.boardData || {}; 

    const [category, setCategory] = useState(isEdit ? board.category : "");
    const [title, setTitle] = useState(isEdit ? board.title : "");
    const [content, setContent] = useState(isEdit ? board.content : "");
    const [files, setFiles] = useState([]);

    // 게시글 수정에서 필요한 삭제할 이미지번호 배열
    const [deleteImages, setDeleteImages] = useState([]);

    useEffect(() => {
        if (isEdit) {
            // 기존 데이터를 폼에 설정
            setCategory(board.category);
            setTitle(board.title);
            setContent(board.content);
        }
    }, [isEdit, board]);

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

    const handleBoardUpdateBtn = async () => {

        formData.append('boardId', board.boardId);
        formData.append('userId', 28); // 임시 사용자 ID
        formData.append('title', title);
        formData.append('content', content);
        formData.append('category', category);

        // 여러 개의 파일 추가
        files.forEach((file, index) => {
            formData.append('updateImages', file);
        });

        deleteImages.forEach((imageId) => {
            formData.append('deleteImages', imageId);
        });

        try {
            const response = await 
                axios
                    .put(`http://localhost:8080/api/public/board/update`, 
                    formData);
                    
                    if(response.status === 200){
                        alert(response.data);
                        nav(`/board/view/${board.boardId}`, { state: { userId: 28 } }); // 수정된 게시물의 상세 페이지로 이동
                    }else{
                        alert("게시글 수정 실패")
                    }
            
        } catch (error) {
            console.error("게시글 수정 중 오류 발생: ", error);
            alert("게시글 수정 중 오류가 발생했습니다.");
        }
    }

    return (
        <div className="BP">
            <img className="BP_WarningMsg" src={BoardPostWarningMsg} alt="" />
            <BoardPostCategory setCategory={setCategory} category={category} isEdit={isEdit}/>
            <BoardPostContent setTitle={setTitle} setContent={setContent} title={title} content={content}/>
            <BoardPostFile setFiles = {setFiles} setDeleteImages={setDeleteImages} existingImages={board.images || []}/>
            <div className="BP_buttons">
                <div className="BP_buttons_cancle" onClick={() => nav('/boardList')}>취소</div>
                <div 
                    className="BP_buttons_post" 
                    onClick={() => isEdit ? handleBoardUpdateBtn() : handleBoardPostBtn()}
                >{isEdit ? "수정" : "등록"}</div>
            </div>
        </div>
    );
}

export default BoardPost;