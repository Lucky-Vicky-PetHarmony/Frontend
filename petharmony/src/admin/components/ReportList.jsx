import React, { useEffect, useState } from "react";
import '../style/ReportList.css';
import refresh from '../asset/refresh.png'
import axios from "axios";
import BoardFilter from "../../board/components/boardList/BoardFilter";
import ReportListElem from "./ReportListElem";
import ReportDetailModal from "./ReportDetailModal";
import BoardPagination from "../../board/components/boardList/BoardPagination";


const ReportList = () => {

    // 처리상태 필터
    const [selectedStatuses, setSelectedStatuses] = useState([]); //필터 체크박스(미처리, 보류, 처리완료)

    // 정렬 필터
    const [filter, setFilter] = useState("date");

    // 신고상세 모달
    const [modal, setModal] = useState(false);
    const [reportDetailId, setReportDetailId] = useState();

    // 페이지
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    //서버로부터 받은 데이터
    const [reportListData, setReportListData] = useState();

    const handleStatusChange = (e) => {
        const value = e.target.value;
        setPage(1);
        setSelectedStatuses(prev => 
            prev.includes(value) 
                ? prev.filter(status => status !== value) 
                : [...prev, value]
        );
    };

    // 서버에 신고 리스트 요청
    const axiosReportList = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/public/report/list', {
                params: {
                    page: page-1,
                    size: 8,
                    sortBy: filter,
                    selection: selectedStatuses.join(",")
                }
            });

            if (response.status === 200) {
                setReportListData(response.data.content);
                setTotalPages(response.data.totalPages); // 총 페이지 수 상태로 저장
            } else {
                alert("데이터 불러오기 실패");
            }
        } catch (error) {
            alert("서버와의 통신 중 오류가 발생했습니다.");
            console.error("Error: ", error);
        }
    };

    useEffect(() => {
        axiosReportList();
    }, [page, filter, selectedStatuses])

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
                            value="UNPROCESSED" 
                            onChange={handleStatusChange} 
                        />
                        미처리
                    </label>
                    <label>
                        <input 
                            type="checkbox" 
                            value="PENDING" 
                            onChange={handleStatusChange} 
                        />
                        보류
                    </label>
                    <label>
                        <input 
                            type="checkbox" 
                            value="COMPLETED" 
                            onChange={handleStatusChange} 
                        />
                        처리 완료
                    </label>
                </div>
                <img src={refresh} alt="새로고침" onClick={() => window.location.reload()}/>
                <p>* 신고 상세 클릭시 신고 처리 가능</p>
            </div>
            <div className="ARP_list_group">
                <table>
                    <thead>
                        <tr>
                            <td>신고ID</td>
                            <td>신고일자</td>
                            <td>신고자</td>
                            <td>피신고자</td>
                            <td>신고유형</td>
                            <td>신고내용</td>
                            <td>신고상세</td>
                            <td>처리일자</td>
                            <td>처리상태</td>
                        </tr>
                    </thead>
                    <tbody>
                        {(reportListData || []).map(report => (
                            <ReportListElem 
                                key={report.reportId} 
                                report={report} 
                                setModal={setModal}
                                setReportDetailId={setReportDetailId}/>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="ARP_pagenation">
                <BoardPagination
                    setPage = {setPage}
                    totalPages = {totalPages}
                    currentPage = {page}/>
            </div>

            {modal&&(
                <ReportDetailModal 
                    setModal={setModal}
                    reportDetailId={reportDetailId}
                    setReportDetailId={setReportDetailId}/>
            )}
            
        </div>
    );
}

export default ReportList;