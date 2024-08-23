import React, { useEffect, useState } from "react";
import '../../style/boardPost/BoardPost.css';
import BoardPostCategory from "./BoardPostCategory";
import BoardPostContent from "./BoardPostContent";
import BoardPostFile from './BoardPostFile';
import BoardPostWarningMsg from '../../asset/BoardPostWarningMsg.png'
import { useNavigate, useLocation } from 'react-router-dom';
import axios from "axios";

import useAuthStore from "../../../store/useAuthStore";

const BoardPost = () => {
    //로그인한 사용자의 token과 userId
    const { token, userId } = useAuthStore();

    //서버에 보낼 데이터를 formData형태로 보냄
    const formData = new FormData();

    //페이지 이동시 필요
    const nav = useNavigate();
    const location = useLocation();

    // 수정모드, 글생성모드
    const isEdit = location.state?.isEdit || false; // 수정모드 || 작성모드
    const board = location.state?.boardData || {}; 

    // 서버에 보낼 게시글 데이터들
    const [category, setCategory] = useState(isEdit ? board.category : "");
    const [title, setTitle] = useState(isEdit ? board.title : "");
    const [content, setContent] = useState(isEdit ? board.content : "");

    //post모드: 첨부한 모든 이미지
    //edit모드: 새롭게 추가한 이미지
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


    // 게시글 작성 함수
    const handleBoardPostBtn = async () => {

        formData.append('userId', userId);
        formData.append('title', title);
        formData.append('content', content);
        formData.append('category', category);

        // 여러 개의 이미지파일 추가
        files.forEach((file, index) => {
            if(file!== undefined)
                formData.append('images', file);
        });

        try {
            const response = await axios.post('http://localhost:8080/api/public/board/post', formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });

            if (response.status === 200) {
                alert(`[${response.data.title}] 작성완료`);
                nav(`/board/view/${response.data.boardId}`);
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


    // 게시글 수정 함수
    const handleBoardUpdateBtn = async () => {

        formData.append('boardId', board.boardId);
        formData.append('userId', userId);
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
                        formData,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`
                            },
                        });
                    
                    if(response.status === 200){
                        alert(response.data);
                        nav(`/board/view/${board.boardId}`); // 수정된 게시물의 상세 페이지로 이동
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
            <BoardPostFile setFiles = {setFiles} isEdit={isEdit} setDeleteImages={setDeleteImages} existingImages={board.images || []}/>
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