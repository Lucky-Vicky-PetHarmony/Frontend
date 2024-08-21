import React from "react";
import '../style/ReportDetailModal.css';
import ReportDetailModalElem from "./ReportDetailModalElem";


const ReportDetailModal = ({setModal}) => {

    return (
       <div className="RDM">
            {/* 제목 */}
            <p>🚨 신고 상세</p>

            {/* 피신고자 */}
            <div className="RDM_row">
                <p>피신고자</p>
                <p>이채림</p>
            </div>

            {/* 신고날짜 */}
            <div className="RDM_row">
                <p>최초 신고 일자</p>
                <p>2024.08.28</p>
            </div>

            {/* 글 내용 */}
            <div className="RDM_column">
                <p>신고된 글 내용 <span> 🔗 게시글로 이동하기</span></p>
                <p className="RDM_column_content">해당 게시물은 매우 부적절한 언어를 사용하고 있으며, 특정 개인을 비방하는 내용이 포함되어 있습니다. 작성자는 게시물에서 다른 사용자를 명확하게 지칭하며, 모욕적인 표현을 반복적으로 사용하고 있습니다. 특히, ‘XXX는 정말 쓸모없는 사람이다’와 같은 인신공격성 발언이 여러 차례 등장하며, 이로 인해 다른 사용자들이 심각한 불쾌감을 느낄 수 있습니다. 또한, 해당 게시물에는 신뢰할 수 없는 정보가 포함되어 있어 다른 사용자들에게 잘못된 인식을 심어줄 위험이 큽니다.</p>
            </div>

            {/* 신고내용 목록 */}
            <div className="RDM_column">
                <p>신고 목록</p>
                <div className="RDM_column_listgroups">
                    <ReportDetailModalElem/>
                    <ReportDetailModalElem/>
                    <ReportDetailModalElem/>
                    <ReportDetailModalElem/>
                </div>
            </div>

            {/* 신고처리 */}
            <div className="RDM_row">
                <p>신고 처리하기</p>
                <select
                    className="RDM_row_select">
                    <option value="THREE_DAY_SUSPENSION">회원 3일 정지</option>
                    <option value="DELETE_POST">삭제 처리</option>
                    <option value="ACCOUNT_TERMINATION">회원 탈퇴 처리</option>
                    <option value="IGNORE_REPORT">신고 무시하기</option>
                    <option value="PENDING">신고 보류</option>
                </select>
            </div>

            {/* 취소, 저장 버튼 */}
            <div className="RDM_btn">
                <div className="RDM_btn_cancel" onClick={() => setModal(false)}>취소</div>
                <div className="RDM_btn_submit" onClick={() => {}}>저장</div>
            </div>

       </div>
    );
}

export default ReportDetailModal;