import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Main.css";
import mainImg from "../assets/mainImg.png";
import moveMatching from "../assets/adoptionBtnImg.png";
import mainTitle from "../assets/mainTitle.png";
import BoardListElem from "../../board/components/boardList/BoardListElem";

const Main = ({ isLogin }) => {
    // useNavigate() 호출
    const navigate = useNavigate();
    // 내가 쓴 게시물 목록 상태
    const [boards, setBoards] = useState([]);

    // 게시물 가져오기
    useEffect(() => {
        const fetchBoards = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/public/boards?size=5');
                setBoards(response.data.content);
            } catch (error) {
                console.error("게시물을 가져오는 데 실패했습니다:", error);
            }
        };
        fetchBoards();
    }, []);
    
    // 매칭 페이지로 이동 
    const handleMoveMatching = () => {
        if (!isLogin) {
            alert('로그인 후 이용해주세요.');
        } else {
            navigate('/matching');
        }
    };

    return (
        <div className="main">
            <img className="main_img" src={mainImg} alt="" />
            <p className="main_title">새로운 가족을 기다리는 친구들 🐶</p>
            <div className="main_slide">
                {/* 구현 예정 */}
            </div>
            <button className="main_move_matching" onClick={handleMoveMatching}>
                <img src={moveMatching} alt="" />
            </button>
            <p className="main_title">주인을 찾고 있어요 💦💦</p>
            <div className="main_adoption">
                {/* 구현 예정 */}
            </div>
            <img className="main_title_img" src={mainTitle} alt="" />
            <div className="main_board">
                {boards.map(board => (
                    <BoardListElem key={board.boardId} board={board} />
                ))}
            </div>
        </div>
    );
}

export default Main;