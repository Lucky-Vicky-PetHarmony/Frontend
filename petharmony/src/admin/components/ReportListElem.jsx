import React from "react";
import '../style/ReportListElem.css';


const ReportListElem = ({setModal, report, setReportDetailId}) => {

    // 날짜 형식
    const formatDate = (date) => {
        if (!date) return "-";
        const redate = date.replace(/-/g, '.'); //전체 문자열 검사해서 치환
        return redate;
    }

    // 내용이 길때 말줄임표
    const contentOmission = (content) => {
        if(content.length<=40){
            return content;
        }else{
            return content.slice(0, 41) + "···";
        }
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

    const detailClick = (id) => {
        setModal(true);
        setReportDetailId(id);
    }

    return (
        <tr>
            <td>{report.reportId}</td>
            <td>{formatDate(report.reportDate)}</td>
            <td>{report.reporterName}</td>
            <td>{report.reportedName}</td>
            <td>{reportTypeConversion(report.reportType)}</td>
            <td>{contentOmission(report.reportContent)}</td>
            <td>
                <p 
                    className="report_listElem_detail"
                    onClick={() => detailClick(report.reportId)}>신고 상세</p>
            </td>
            <td>{formatDate(report.processingDate) || "-"}</td>
            <td
                style={{
                    color: report.reportProcess === 'PENDING' ? 'var(--color-green)' 
                          : report.reportProcess === 'UNPROCESSED' ? 'var(--color-red)' 
                          : 'var(--color-gray2)' // 기본 색상
                  }}
                >
                {reportProcessConversion(report.reportProcess)}
            </td>
        </tr>
    );
}

export default ReportListElem;