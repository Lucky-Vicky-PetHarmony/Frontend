import React, { useEffect, useState } from "react";
import '../../style/boardPost/BoardPost.css';
import BoardPostCategory from "./BoardPostCategory";
import BoardPostContent from "./BoardPostContent";
import BoardPostFile from './BoardPostFile';
import BoardPostWarningMsg from '../../asset/BoardPostWarningMsg.png'
import { useNavigate, useLocation } from 'react-router-dom';
import axiosInstance from "../../../api/axiosConfig";

import useAuthStore from "../../../store/useAuthStore";
import Loading from "../../../common/Loading/Loading";

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

    // 로딩 상태 추가
const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
    // token이 존재하는지 확인
    if (token) {
        // token이 있을 경우 로딩 상태 해제
        setIsLoading(false);

        // 경로가 /board/edit-post 이면서, board 데이터가 없는 경우 잘못된 접근으로 판단하여 리다이렉트
        if (location.pathname === '/board/edit-post' && Object.keys(board).length === 0) {
            alert("잘못된 접근입니다.")
            nav("/");
        }
    } else {
        // token을 기다리는 시간 동안 로딩 상태 유지
        const timeoutId = setTimeout(() => {
            // 일정 시간이 지나도 token이 없으면 잘못된 접근으로 판단하여 리다이렉트
            if (!token) {
                if (location.pathname === '/board/edit-post' && Object.keys(board).length === 0) {
                    nav("/");
                } else if (location.pathname === '/board/post') {
                    nav("/");
                }
                alert("로그인이 필요한 서비스입니다.")
            }
            // 최종적으로 로딩 상태 해제
            setIsLoading(false);
        }, 300); // 500ms 대기시간 (필요에 따라 조정 가능)

        // 컴포넌트가 언마운트될 때 타이머 클리어
        return () => clearTimeout(timeoutId);
    }
}, [token, board, location.pathname, nav]);

// 로딩 중일 때 표시할 내용 추후 로딩페이지로 변경옞정
if (isLoading) {
    return <Loading/>;
}


    // 게시글 작성 함수
    const handleBoardPostBtn = async () => {
        // 아무것도 입력안됐을 경우
        if(!title.trim()){
            alert("제목을 입력해주세요.");
            return;
        }else if(!content.trim()){
            alert("내용을 입력해주세요.");
            return;
        }

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
            const response = await axiosInstance.post('/api/user/board/post', formData);

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
        // 아무것도 입력안됐을 경우
        if(!title.trim()){
            alert("제목을 입력해주세요.");
            return;
        }else if(!content.trim()){
            alert("내용을 입력해주세요.");
            return;
        }

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
            axiosInstance
                    .put(`http://localhost:8080/api/user/board/update`,
                        formData);
                    
                    if(response.status === 200){
                        alert(`[${response.data.title}] 수정완료`);
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
                <div className="BP_buttons_cancle" onClick={() => nav('/board/list')}>취소</div>
                <div 
                    className="BP_buttons_post" 
                    onClick={() => isEdit ? handleBoardUpdateBtn() : handleBoardPostBtn()}
                >{isEdit ? "수정" : "등록"}</div>
            </div>
        </div>
    );
}

export default BoardPost;