import React from "react";
import "../../styles/slide/SlideItem.css";

const SlideItem = ({ popFile, orgNm, sexCd, age }) => {
    return (
        <div className="slide_item">
            <img className="si_img" src={popFile} alt="유기동물사진"/>
            <p className="si_location">{orgNm}</p>
            <p className="si_sex_age">{sexCd} | {age}</p>
        </div>
    );
}

export default SlideItem;