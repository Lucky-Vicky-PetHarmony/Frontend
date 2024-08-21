import React from "react";
import '../style/ReportDetailModalElem.css';


const ReportDetailModalElem = () => {

    return (
       <div className="RDM_bottom_listgroup">
            <p className="RDM_bottom_listgroup_reporter">김가은 | 도배 및 반복 게시</p>
            <p className="RDM_bottom_listgroup_content">해당 게시물은 매우 부적절한 언어를 사용하고 있으며, 특정 개인을 비방하는 내용이 포함되어 있습니다. 작성자는 게시물에서 다른 사용자를 명확하게 지칭하며, 모욕적인 표현을 반복적으로 사용하고 있습니다. 특히, ‘XXX는 정말 쓸모없는 사람이다’와 같은 인신공격성 발언이 여러 차례 등장하며, 이로 인해 다른 사용자들이 심각한 불쾌감을 느낄 수 있습니다. 또한, 해당 게시물에는 신뢰할 수 없는 정보가 포함되어 있어 다른 사용자들에게 잘못된 인식을 심어줄 위험이 큽니다.</p>
       </div>
    );
}

export default ReportDetailModalElem;