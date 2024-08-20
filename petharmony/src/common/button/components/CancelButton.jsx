import React from "react";
import "../../../common.css";
import "../styles/CancelButton.css";
import cancelIcon from "../assets/exit.png";

const CancleButton = () => {
    return (
        <button className="cancel_button">
            <img src={cancelIcon} alt="" />
        </button>
    );
};

export default CancleButton;