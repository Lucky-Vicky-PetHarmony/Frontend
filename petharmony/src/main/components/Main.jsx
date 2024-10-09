import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";
import axiosInstance from "../../api/axiosConfig";
import "../styles/Main.css";
import mainImg from "../assets/mainImg.png";
import Slider from "./slide/Slider";
import background from "../assets/background.png";
import moveMatching from "../assets/adoptionBtnImg.png";
import slideTitle from "../assets/slideTitle.png";
import adoptionTitle from "../assets/adoptionTitle.png";
import boardTitle from "../assets/boardTitle.png";
import BoardListElem from "../../board/components/boardList/BoardListElem";
import PetCard from "../../common/pet/components/PetCard";

const Main = ({ isLogin }) => {
    const { userId } = useAuthStore();

    const navigate = useNavigate();

    const [pets, setPets] = useState([]);
    const [boards, setBoards] = useState([]);

    // 공고일이 지난 유기 동물 데이터
    useEffect(() => {
        const fetchPets = async () => {
            try {
                const response = await axiosInstance.get(`/api/public/petCards/${userId ? userId : 0}`);
                setPets(response.data);
            } catch (error) {
                console.log("유기동물 데이터를 가져오는 데 실패했습니다.", error);
            }
        };
        fetchPets();
    }, [userId]);

    // 게시물 5개
    useEffect(() => {
        const fetchBoards = async () => {
            try {
                const response = await axiosInstance.get('/api/public/boards?size=5&page=0');
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
            alert('🐶 로그인이 필요한 서비스입니다.');
        } else {
            navigate('/matching');
        }
    };

    return (
        <div className="main">
            <img className="main_img" src={mainImg} alt="" />
            <img className="main_title" src={slideTitle} alt="" />
            <div className="main_slide">
                <Slider />
            </div>
            <div className="main_matching">
                <img src={background} alt="" />
                <button className="main_move_matching" onClick={handleMoveMatching}>
                    <img src={moveMatching} alt="" />
                </button>
            </div>
            <img className="main_title" src={adoptionTitle} alt="" />
            <div className="main_adoption">
                {pets.map((pet, index) => (
                    <PetCard key={index} pet={pet} userId={userId} />
                ))}
            </div>
            <img className="main_title" src={boardTitle} alt="" />
            <div className="main_board">
                {boards.map(board => (
                    <BoardListElem key={board.boardId} board={board} />
                ))}
            </div>
        </div>
    );
}

export default Main;