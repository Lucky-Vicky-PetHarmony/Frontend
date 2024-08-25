import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Main.css";
import mainImg from "../assets/mainImg.png";
import Slider from "./slide/Slider";
import background from "../assets/background.png";
import moveMatching from "../assets/adoptionBtnImg.png";
import slideTitle from "../assets/slideTitle.png";
import adoptionTitle from "../assets/adoptionTitle.png";
import boardTitle from "../assets/boardTitle.png";
import BoardListElem from "../../board/components/boardList/BoardListElem";
import PetCard from "./PetCard";

const Main = () => {
    // useNavigate() 호출
    const navigate = useNavigate();
    // 공고일이 지난 유기 동물들
    const [pets, setPets] = useState([]);
    // 내가 쓴 게시물 목록 상태
    const [boards, setBoards] = useState([]);

    // 유기 동물 데이터 가져오기 
    useEffect(() => {
        const fetchPets = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/public/petCards');
                setPets(response.data);
            } catch (error) {
                console.log("유기동물 데이터를 가져오는 데 실패했습니다.", error);
            }
        };
        fetchPets();
    }, []);

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
        navigate('/matching');
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
                {pets.map(pet => (
                    <PetCard key={pet.desertionNo} pet={pet} />
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