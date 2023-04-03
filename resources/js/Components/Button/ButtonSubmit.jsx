import React from "react";
import "../../../css/button.css";

const ButtonSubmit = ({ label, action }) => {
    const handleSubmit = () => {
        action();
    };

    return (
        <button
            className="button-primary-lg"
            onClick={() => handleSubmit()}
            type="button"
        >
            {label}
        </button>
    );
};

export default ButtonSubmit;
