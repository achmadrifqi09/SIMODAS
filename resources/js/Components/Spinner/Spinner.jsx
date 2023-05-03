import React from "react";
import "../../../css/spinner.css";

const Spinner = (props) => {
    const { bgVariant, message } = props;
    return (
        <div className={`wave-container ${bgVariant}`}>
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
            <span className="spinner-caption">{message}</span>
        </div>
    );
};

export default Spinner;
