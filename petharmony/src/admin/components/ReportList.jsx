import React, { useState } from "react";
import '../style/ReportList.css';
import refresh from '../asset/refresh.png'
import axios from "axios";
import BoardFilter from "../../board/components/boardList/BoardFilter";
import ReportListElem from "./ReportListElem";
import ReportDetailModal from "./ReportDetailModal";


const ReportList = () => {
    const [selectedStatuses, setSelectedStatuses] = useState([]); //필터 체크박스(미처리, 보류, 처리완료)

    // 정렬 필터
    const [filter, setFilter] = useState("date");
    const [page, setPage] = useState(1);

    //신고상세 모달
    const [modal, setModal] = useState(false);

const handleStatusChange = (e) => {
    const value = e.target.value;
    setSelectedStatuses(prev => 
        prev.includes(value) 
            ? prev.filter(status => status !== value) 
            : [...prev, value]
    );
};

    // 서버에 신고 리스트 요청
    // const axiosReportList = async () => {
    //     try {
    //         const response = await axios.get(url, {params});

    //         if (response.status === 200) {
    //         } else {
    //             alert("데이터 불러오기 실패");
    //         }
    //     } catch (error) {
    //         alert("서버와의 통신 중 오류가 발생했습니다.");
    //         console.error("Error: ", error);
    //     }
    // };

    return (
        <div className="ARP">
            <p>신고 목록</p>
            <div className="ARP_filter_group">
                <BoardFilter
                    mode={"report"}
                    setFilter={setFilter}
                    setPage={setPage}
                />
                <div className="ARP_filter_group_check">
                    <label>
                        <input 
                            type="checkbox" 
                            value="unprocessed" 
                            onChange={handleStatusChange} 
                        />
                        미처리
                    </label>
                    <label>
                        <input 
                            type="checkbox" 
                            value="pending" 
                            onChange={handleStatusChange} 
                        />
                        보류
                    </label>
                    <label>
                        <input 
                            type="checkbox" 
                            value="completed" 
                            onChange={handleStatusChange} 
                        />
                        처리 완료
                    </label>
                </div>
                <img src={refresh} alt="새로고침" />
                <p>* 신고 상세 클릭시 신고 처리 가능</p>
            </div>
            <table className="ARP_list_group">
                <thead>
                    <tr>
                        <td>최초 신고 일자</td>
                        <td>피신고자</td>
                        <td>신고자 수</td>
                        <td>해당 글 내용</td>
                        <td>신고 상세</td>
                        <td>처리일자</td>
                        <td>처리상태</td>
                        <td>처리자</td>
                    </tr>
                </thead>
                <tbody>
                    <ReportListElem setModal={setModal}/>
                    <ReportListElem setModal={setModal}/>
                    <ReportListElem setModal={setModal}/>
                    <ReportListElem setModal={setModal}/>
                    <ReportListElem setModal={setModal}/>
                    <ReportListElem setModal={setModal}/>
                </tbody>
            </table>
            {modal&&(<ReportDetailModal setModal={setModal}/>)}
        </div>
    );
}

export default ReportList;