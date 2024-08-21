import React from "react";
import '../style/ReportListElem.css';


const ReportListElem = ({setModal}) => {

    return (
        <tr>
            <td>2024.08.28</td>
            <td>이채림</td>
            <td>12</td>
            <td className="report_listElem_content">해당 게시물은 매우 부적절한 언어를 사용하고 있으며, 특정 개인을 비방하는 내용이 포함되어 있습니다. 작성자는 게시물에서 다른 ···</td>
            <td>
                <p 
                    className="report_listElem_detail"
                    onClick={() => setModal(true)}>신고 상세</p>
            </td>
            <td>2024.08.28</td>
            <td>3일 정지</td>
            <td>김가은</td>
        </tr>
    );
}

export default ReportListElem;