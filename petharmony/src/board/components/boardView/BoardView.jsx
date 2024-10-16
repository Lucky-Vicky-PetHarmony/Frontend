import React, {useState, useEffect} from "react";
import '../../style/boardView/BoardView.css';
import BoardContent from "./BoardContent";
import BoardCommentInput from './BoardCommentInput';
import BoardComment from './BoardComment';
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../../api/axiosConfig";
import ReportPostModal from "../ReportPostModal";

import useAuthStore from "../../../store/useAuthStore";
import Loading from "../../../common/Loading/Loading";

const BoardView = ({isLogin}) => {
    //로그인한 사용자의 token과 userId
    const { userId } = useAuthStore();

    // 페이지 이동시에 사용
    const nav = useNavigate();

    // 보여줄 게시물의 boardId를 url에서 추출
    const { boardId } = useParams(); //URL파라미터를 가져옴. 여기서는 게시물 번호를 가져옴

    // 게시물데이터, 댓글데이터
    const [boardData, setBoardData] = useState(null); //서버로부터 받아올 게시물 내용 데이터를 저장 
    const [commentData, setCommentData] = useState([]);

    // 신고
    const [reportModal, setReportModal] = useState(false);
    const [reportMode, setReportMode] = useState("");
    const [reportData, setReportData] = useState({});

    const formatDate = (date) => {
        if (!date) return "-";
        const redate = date.replace(/-/g, '.'); //전체 문자열 검사해서 치환
        return redate.slice(0, 16);
    }

    // 서버에 게시글내용 상세 요청
    const fetchBoardData = async () => {
        try{
            const response = await 
            axiosInstance
                    .get(`/api/public/board/view`, {
                        params: { userId: userId?userId:0, boardId }
                        });
                setBoardData(response.data);
        }catch(error){
            console.error("게시물 내용을 불러오기 중 오류가 발생했습니다. error: ", error)
        }
    };

    // 서버에 게시글 댓글 리스트 요청
    const fetchCommentData = async () => {
        try{
            const response = await 
            axiosInstance
                    .get(`/api/public/comment/list`,{
                        params: { boardId }
                        });
                setCommentData(response.data);
        }catch(error){
            console.error("댓글 리스트를 불러오는 중 오류가 발생했습니다. error: ", error)
        }
    };

    useEffect(() => {
        fetchBoardData();
        fetchCommentData();
    }, [userId]);  // userId와 token이 변경될 때마다 실행

    return (
        <div className="BoardView">
            {boardData ? (<>
                <BoardContent 
                    board={boardData} 
                    commCount={commentData.length} 
                    setReportModal={setReportModal}
                    setReportMode={setReportMode}
                    setReportData={setReportData}
                    userId={userId}
                    isLogin={isLogin}
                    formatDate={formatDate}/>
                <BoardCommentInput 
                    boardId={boardId} 
                    userId={userId} 
                    onCommentSubmit={fetchCommentData}
                    isLogin={isLogin}/>
                {commentData.map(comment => (
                    <BoardComment 
                        key={comment.commId} 
                        comment={comment}
                        masterId={boardData.userId}
                        updateComment={fetchCommentData}
                        setReportModal={setReportModal}
                        setReportMode={setReportMode}
                        setReportData={setReportData}
                        userId={userId}
                        isLogin={isLogin}
                        formatDate={formatDate}/>
                ))}
            </>) :
            (<Loading/>)}
            <div className="BoardView_backbtn" onClick={() => nav('/board/list')}>목록</div>
            {reportModal && (
                <ReportPostModal 
                setReportModal={setReportModal}
                mode={reportMode}
                reportData = {reportData}
                userId={userId}
            />)}
        </div> 
    );
}

export default BoardView;