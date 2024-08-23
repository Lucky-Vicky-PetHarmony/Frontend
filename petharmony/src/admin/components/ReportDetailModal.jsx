import React, { useEffect, useState } from "react";
import '../style/ReportDetailModal.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';



const ReportDetailModal = ({setModal, reportDetailId, setReportDetailId}) => {
    const nav = useNavigate();

    const [reportDetailData, setReportDetailData] = useState(null);
    const [loading, setLoading] = useState(true); // 로딩 상태 추가

    const [reportProcessing, setReportProcessing] = useState("UNPROCESSED");

    // 요청하는 reportid가 바뀔때마다
    useEffect(() => {
        axiosReportDetail();
    }, [reportDetailId]);

    // 서버에 신고 리스트 요청
    const axiosReportDetail = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:8080/api/public/report/detail/${reportDetailId}`);

            if (response.status === 200) {
                setReportDetailData(response.data);
                setReportProcessing(response.data.reportProcess);
                // console.log(response.data);
            } else {
                alert("신고 상세데이터 불러오기 실패");
            }
        } catch (error) {
            alert("서버와의 통신 중 오류가 발생했습니다.");
            console.error("Error: ", error);
        } finally {
            setLoading(false); // 로딩 상태 종료
        }
    };

    // 서버에 신고 처리 요청
    const axiosReportProcessing = async () => {
        try {
            const response = await axios.put(`http://localhost:8080/api/public/report/processing/${reportDetailId}`, null,{
                params: {
                    processing: reportProcessing
                }
            });

            if (response.status === 200) {
            } else {
                alert("신고 처리 실패");
            }
        } catch (error) {
            alert("서버와의 통신 중 오류가 발생했습니다.");
            console.error("Error: ", error);
        }
    };

    // 신고처리 저장
    const saveProcessing = () => {
        const confirmed = window.confirm(`[${reportProcessConversion(reportProcessing)}] 처리 하시겠습니까?`);

        if (confirmed) {
            axiosReportProcessing();
            window.location.reload();
        }
    }

    // 날짜 형식
    const formatDate = (date) => {
        if (!date) return "-";
        const redate = date.replace(/-/g, '.'); //전체 문자열 검사해서 치환
        return redate;
    }

    //신고유형
    const reportTypeConversion = (type) => {
        let typeName = "";
        switch (type) {
            case "PROFANITY_ABUSE":
                typeName= "욕설 및 비방";
                break;
            case "FALSE_INFORMATION":
                typeName= "허위 정보";
                break;
            case "SPAM_ADVERTISEMENT":
                typeName= "스팸 및 광고";
                break;
            case "PRIVACY_VIOLATION":
                typeName= "개인정보 노출";
                break;
            case "REPEATED_POSTING":
                typeName= "도배 및 반복 게시";
                break;
            case "OBSCENE_ILLEGAL_CONTENT":
                typeName= "음란물 및 불법 콘텐츠";
                break;
            case "COPYRIGHT_INFRINGEMENT":
                typeName= "저작권 침해";
                break;
            case "OFF_TOPIC":
                typeName= "주제와 무관한 글";
                break;
            case "IMPERSONATION_IDENTITY_THEFT":
                typeName= "사칭 및 명의 도용";
                break;
            case "VIOLENT_HATEFUL_CONTENT":
                typeName= "폭력적이거나 혐오스러운 콘텐츠";
                break;
            case "OTHER":
                typeName= "기타";
                break;
            default:
                typeName= "유형오류";
                break;
        }
        return typeName;
    }

     //처리상태
     const reportProcessConversion = (process) => {
        let processName = "";
        switch (process) {
            case "THREE_DAY_SUSPENSION":
                processName= "3일 정지";
                break;
            case "DELETE_POST":
                processName= "글 삭제";
                break;
            case "ACCOUNT_TERMINATION":
                processName= "탈퇴";
                break;
            case "IGNORE_REPORT":
                processName= "무시";
                break;
            case "PENDING":
                processName= "보류";
                break;
            default:
                processName= "미처리";
                break;
        }
        return processName;
    }

    // 데이터가 로딩 중일 때 로딩 메시지를 표시
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
       <div className="RDM">
            {/* 제목 */}
            <p>🚨 신고 상세</p>

            {/* 신고일자, 신고유형 */}
            <div className="RDM_top">
                <div className="RDM_top_E">
                    <p>신고일자</p>
                    <p>{formatDate(reportDetailData.reportDate)}</p>
                </div>
                <div className="RDM_top_E">
                    <p>신고유형</p>
                    <p>{reportTypeConversion(reportDetailData.reportType)}</p>
                </div>
            </div>

             {/* 피신고자, 처리상태 */}
             <div className="RDM_top">
                <div className="RDM_top_E">
                    <p>신고자</p>
                    <p>{reportDetailData.reporterName}</p>
                </div>
                <div className="RDM_top_E">
                    <p>처리상태</p>
                    <p>{reportProcessConversion(reportDetailData.reportProcess)}</p>
                </div>
            </div>

            {/* 글 내용 */}
            <div className="RDM_content">
                <p>신고된 글 내용 
                    <span onClick={() => nav(`/board/view/${reportDetailData.boardId}`)}> 
                        🔗 게시글로 이동하기
                    </span>
                </p>
                <p>{reportDetailData.postContent}</p>
            </div>

            {/* 신고 내용 */}
            <div className="RDM_content">
                <p>신고 내용</p>
                <p>{reportDetailData.reportContent}</p>
            </div>

            {/* 해당 글을 신고한 다른 유저들의 신고 목록 */}
            <div className="RDM_other">
                <p>해당 글의 다른 신고 내역 ({reportDetailData.reportDetailList.length}건)</p>
                <div className="RDM_other_group">
                    {(reportDetailData.reportDetailList || []).map((report, index) => (
                        <div key={report.reportId} className="RDM_other_report">
                            <p>{report.reportId}</p>
                            <p>{formatDate(report.reportDate)}</p>
                            <p>{report.reporterName}</p>
                            <p>{reportTypeConversion(report.reportType)}</p>
                            <p onClick={() => setReportDetailId(report.reportId)}>상세보기</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* 신고처리 */}
            <div className="RDM_precess">
                <p>🚨 신고 처리하기 <span>(* 처리시 해당 게시물을 신고한 모든 신고내역이 일괄처리됩니다.)</span></p>
                <select
                    className="RDM_row_select"
                    value={reportProcessing}
                    onChange={(e) => setReportProcessing(e.target.value)}
                    >
                    <option value="UNPROCESSED">미처리</option>
                    <option value="PENDING">신고 보류</option>
                    <option value="THREE_DAY_SUSPENSION">회원 3일 정지</option>
                    <option value="DELETE_POST">삭제 처리</option>
                    <option value="ACCOUNT_TERMINATION">회원 탈퇴 처리</option>
                    <option value="IGNORE_REPORT">신고 무시하기</option>
                </select>
            </div>

            {/* 취소, 저장 버튼 */}
            <div className="RDM_btn">
                <div className="RDM_btn_cancel" onClick={() => setModal(false)}>취소</div>
                <div className="RDM_btn_submit" onClick={() => saveProcessing()}>저장</div>
            </div>

       </div>
    );
}

export default ReportDetailModal;