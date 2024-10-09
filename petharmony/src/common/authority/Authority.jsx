import React from "react";
import "./Authority.css";
import mainImg from "../../main/assets/mainImg.png";

const Authority = () => {
    
    return (
        <div className="authority">
            <img src={mainImg} alt="" />
            <p>이 페이지에 접근할 수 있는 권한이 없습니다.</p>
        </div>
    )
}

export default Authority;