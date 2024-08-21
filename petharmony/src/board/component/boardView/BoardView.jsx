import React, {useState, useEffect} from "react";
import '../../style/boardView/BoardView.css';
import BoardContent from "./BoardContent";
import BoardCommentInput from './BoardCommentInput';
import BoardComment from './BoardComment';
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import ReportPostModal from "../ReportPostModal";



const BoardView = () => {
    const nav = useNavigate();

    const { boardId } = useParams(); //URL파라미터를 가져옴. 여기서는 게시물 번호를 가져옴
    // const location = useLocation(); //페이지 이동시 전달된 상태를 가져옴. 여기서는 로그인한 유저의 아이디를 기져옴
    // const userId = location.state?.userId; //userId가 없을경우 undefined를 반환
    const userId = 27;

    const [boardData, setBoardData] = useState(null); //서버로부터 받아올 게시물 내용 데이터를 저장 
    const [commentData, setCommentData] = useState([]);

    // 신고
    const [reportModal, setReportModal] = useState(false);
    const [reportMode, setReportMode] = useState("");
    const [reportData, setReportData] = useState({});

    

    // 서버에 게시글내용 상세 요청
    const fetchBoardData = async () => {
        try{
            const response = await 
                axios.get(`http://localhost:8080/api/public/board/view`,
                    {params: { boardId, userId }}
                );
                setBoardData(response.data);
        }catch(error){
            console.error("게시물 내용을 불러오기 중 오류가 발생했습니다. error: ", error)
        }
    };

    // 서버에 게시글 댓글 리스트 요청
    const fetchCommentData = async () => {
        try{
            const response = await 
                axios.get(`http://localhost:8080/api/public/comment/list`,
                    {params: { boardId }}
                );
                setCommentData(response.data);
        }catch(error){
            console.error("댓글 리스트를 불러오기 중 오류가 발생했습니다. error: ", error)
        }
    };

    useEffect(() => {
        fetchBoardData();
        fetchCommentData();
    }, [])

    return (
        <div className="BoardView">
            {boardData ? (<>
                <BoardContent 
                    board={boardData} 
                    commCount={commentData.length} 
                    setReportModal={setReportModal}
                    setReportMode={setReportMode}
                    setReportData={setReportData}/>
                <BoardCommentInput boardId={boardId} userId={userId} onCommentSubmit={fetchCommentData} />
                {commentData.map(comment => (
                    <BoardComment 
                        key={comment.commId} 
                        comment={comment}
                        masterId={boardData.userId}
                        updateComment={fetchCommentData}
                        setReportModal={setReportModal}
                        setReportMode={setReportMode}
                        setReportData={setReportData}/>
                ))}
            </>) :
            (<p>Loading...</p>)}
            <div className="BoardView_backbtn" onClick={() => nav('/board/list')}>목록</div>
            {reportModal && (
                <ReportPostModal 
                setReportModal={setReportModal}
                mode={reportMode}
                reportData = {reportData}
                />)}
        </div> 
    );
}

export default BoardView;