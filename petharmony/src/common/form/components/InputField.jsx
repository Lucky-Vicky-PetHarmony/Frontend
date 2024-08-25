import React from "react";
import "../styles/InputField.css";

const InputField = ({ icon, type, placeholder, value, onChange }) => {
    return (
        <div className="input_field">
            <img src={icon} alt="" />
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </div>
    );
}

export default InputField;