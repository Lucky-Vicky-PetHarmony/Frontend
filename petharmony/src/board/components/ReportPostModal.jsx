import React, { useEffect, useState } from "react";
import '../style/ReportPostModal.css';
import redlightImg from '../asset/redlight.png'

import axiosInstance from "../../api/axiosConfig";


const ReportPostModal = ({setReportModal, mode, reportData, userId}) => {
    //mode: board이면 게시물 신고, comment이면 댓글신고
    //그 외: 신고자id, 신고자 이름, 피신고자id, 피신고자 이름, boardId(commmId) 부모로부터 받아야함
    //서버에 보낼거 : 신고자 id, 피신고자 id, 신고유형, 신고내용, 댓글인지 게시물인지, boardId(commmId)

    // State to manage report type and content
    const [reportType, setReportType] = useState("PROFANITY_ABUSE");
    const [reportContent, setReportContent] = useState("");

    // axios
    const reportPost = async () => {
        // 아무것도 입력안됐을 경우
        if(!reportContent.trim()){
            alert("신고내용을 입력해주세요.");
            return;
        }
        try {
            const response = await 
            axiosInstance.post(`/api/user/report/post`,
                    {
                        reporterId: userId,
                        reportedId: reportData.reportedId,
                        reportType: reportType,
                        reportContent: reportContent,
                        reportBoardOrComment: mode,
                        reportPostId: reportData.boardOrCommentId

                    }
                );
                    
                    if(response.status === 200){
                        alert(`${reportData.reportedName}님의 ${mode === "board" ? "게시물" : "댓글"} 신고 완료`);
                        setReportModal(false);
                    }else{
                        alert("신고 처리 실패")
                    }
            
        } catch (error) {
            console.error("신고 처리 중 오류 발생: ", error);
            alert("신고 처리 중 오류가 발생했습니다.");
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
    

    return (
        <div className="RPM">
            <div className="RPM_title">
                <img src={redlightImg} alt="" />
                <p>커뮤니티 규칙 위반 신고</p>
            </div>

            {/* 피신고자 */}
            <div className="RPM_reported">
                <p>피신고자</p>
                <p className="report_name">{nameFormat(reportData.reportedName)}</p>
            </div>

            {/* 신고 유형 선택 */}
            <div className="RPM_type">
                <p>신고 유형</p>
                <select 
                    value={reportType}
                    onChange={(e) => setReportType(e.target.value)}>
                    <option value="PROFANITY_ABUSE">욕설 및 비방</option>
                    <option value="FALSE_INFORMATION">허위 정보</option>
                    <option value="SPAM_ADVERTISEMENT">스팸 및 광고</option>
                    <option value="PRIVACY_VIOLATION">개인정보 노출</option>
                    <option value="REPEATED_POSTING">도배 및 반복 게시</option>
                    <option value="OBSCENE_ILLEGAL_CONTENT">음란물 및 불법 콘텐츠</option>
                    <option value="COPYRIGHT_INFRINGEMENT">저작권 침해</option>
                    <option value="OFF_TOPIC">주제와 무관한 글</option>
                    <option value="IMPERSONATION_IDENTITY_THEFT">사칭 및 명의 도용</option>
                    <option value="VIOLENT_HATEFUL_CONTENT">폭력적이거나 혐오스러운 콘텐츠</option>
                    <option value="OTHER">기타</option>

                </select>
            </div>

            {/* 신고 내용 */}
            <div className="RPM_content">
                <p>신고 내용</p>
                <textarea 
                    value={reportContent} 
                    onChange={(e) => setReportContent(e.target.value)}>
                 </textarea>
            </div>

            {/* 버튼 */}
            <div className="RPM_submit">
                <div className="RPM_submit_cancel" onClick={() => setReportModal(false)}>취소</div>
                <div className="RPM_submit_report" onClick={() => reportPost()}>신고</div>
            </div>
        </div>
    );
}

export default ReportPostModal;