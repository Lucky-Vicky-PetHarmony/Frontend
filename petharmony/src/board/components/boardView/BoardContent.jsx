import React, { useState } from "react";
import '../../style/boardView/BoardContent.css';
import pinNoneImg from '../../asset/pin_none.png'
import pinActiveImg from '../../asset/pin_active.png'
import pinGrayImg from '../../asset/pin_gray.png'
import commImg from '../../asset/comment.png'
import viewImg from '../../asset/view.png'
import dogImg from '../../asset/dog.png'
import sosImg from '../../asset/sos.png'
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BoardContent = ({board, commCount, setReportModal, setReportMode, setReportData, userId, token}) => {

    // 페이지 이동
    const nav = useNavigate();

    // 게시물 좋아요(pin)
    const [pin, setPin] = useState(board.pinStatus);
    const [pinCount, setPinCount] = useState(board.pinCount);
    

    // 신고기능
    const reportBtnClick = (userId, userName, boardId) => {
        setReportMode("board");
        setReportModal(true);
        // 피신고자id, 피신고자 이름, boardId(commmId)
        setReportData(
            {
                reportedId: userId,
                reportedName: userName,
                boardOrCommentId: boardId,
            }
        );
    }

    // 게시물 좋아요 반영
    const pinToggle = async() => {
        try {
            const response = await
                axios.post(`http://localhost:8080/api/public/board/pinned`,
                    {
                        userId: userId,
                        boardId: board.boardId,
                        pinAction: pin ? "unlike" : "like"
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        },
                    }
                );
                if(response.status === 200 && response.data.boardId === board.boardId){
                    setPin(response.data.pinStatus); // pin상태
                    setPinCount(response.data.pinCount); // pin숫자 
                }else{
                    alert("게시물 pin실패. 다시 시도해주세요.")
                }
        } catch (error) {
            console.error("서버 오류 발생 : ", error);
            alert("서버 오류. 잠시후 다시 시도해주세요.")
        }
    }

    // 카테고리 한글로 포맷
    const categotyFormat = (category) => {
        switch(category) {
            case "ADOPT":
                return "입양";
            case "INFORMATION":
                return "정보";
            case "FREE":
                return "자유";
            default:
                return ""; // 추가적인 케이스가 없을 때 반환될 기본 값
        }
    }

    //이름 필터링
    const nameFormat = (name) => {
        if(name==="(알수없음)"){
            return name
        } else if(name.length <= 2) {
            // 이름이 2글자 이하인 경우 첫 글자만 남기고 * 처리
            return name[0] + '*';
        } else {
            // 첫 글자와 마지막 글자를 제외한 부분을 *로 처리
            const middle = '*'.repeat(name.length - 2);
            return name[0] + middle + name[name.length - 1];
        }
    }

    // 게시물 삭제 
    const boardDelete = async () => {
        try {
            const response = await 
                axios.delete(`http://localhost:8080/api/public/board/delete`,
                    {
                        params: {
                            boardId: board.boardId,
                            userId: userId
                        },
                        headers: {
                            Authorization: `Bearer ${token}`
                        },
                    });

                    if (response.status === 200){
                        alert(`[ ${board.title} ] 게시물이 삭제되었습니다.`);
                        nav("/board/list");
                    } else{
                        alert("게시물 삭제에 실패했습니다.");
                    }
        } catch (error) {
            console.error("게시물 삭제 중 오류 발생: ", error);
            alert("게시물 삭제 중 오류가 발생했습니다.");
        }
    }

    //게시글 수정 페이지로 이동
    const handleEditClick = () => {
        nav('/board/edit-post', { state: { isEdit: true, boardData: board } });
    };

    return (
        <div className="board_content">

            {/* 카테고리, pin */}
            <div className="bc_1">
                <div className={`bc_1_category ${board.category}`}>{categotyFormat(board.category)}</div>
                <img 
                    src={pin ? pinActiveImg : pinNoneImg} 
                    alt=""
                    onClick={() => pinToggle()} />
            </div>

            {/* 제목, 작성자 */}
            <div className="bc_2">
                <p className="bc_2_title">{board.title}</p>
                <p className="bc_2_writer">
                    {board.userId===userId?board.userName:nameFormat(board.userName)}
                </p>
            </div>

            {/* 조회수, 댓글수, pin수, 작성시간(수정시간) */}
            <div className="bc_3">
                <div className="bc_3_left">
                    <div className="bc_3_left_elem">
                        <img src={viewImg} alt="조회수" />
                        <p>{board.views}</p>
                    </div>
                    <div className="bc_3_left_elem">
                        <img src={commImg} alt="댓글" />
                        <p>{commCount}</p>
                    </div>
                    <div className="bc_3_left_elem">
                        <img src={pinGrayImg} alt="핀" />
                        <p>{pinCount}</p>
                    </div>
                </div>
                <div className="bc_3_right">{board.updateTime}</div>
            </div>

            {/* 내용 */}
            <div className="bc_4">{board.content}</div>

            {/* 첨부파일 */}
            <div className="bc_5">
                {board.images.length > 0 && (
                    board.images.map((image, index) => (
                        <img key={index} src={image.imageUrl || dogImg} alt={`게시물첨부파일 ${index + 1}`} />
                    ))
                )}
            </div>

            {/* 게시물 작성자와 로그인된 사용자가 동일한지 확인 
                본인 게시물 : 수정 | 삭제
                타인 게시물 : 신고버튼 */}
            {board.userId === userId ? (
                <div className="bc_7">
                    <p onClick={handleEditClick}>수정</p>
                    | 
                    <p onClick={boardDelete}>삭제</p>
                </div>
            ) : board.userName!=="(알수없음)" ?
            (
                <div className="bc_6" onClick={() => reportBtnClick(board.userId, board.userName, board.boardId)}>
                    <img src={sosImg} alt="신고" />
                    <p>신고</p>
                </div>
            ):null}

        </div>
    );
}

export default BoardContent;