import React from "react";
import "../../../css/spinner.css";

const Spinner = () => {
    return (
        <div className="wave-container">
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
            <span className="spinner-caption">
                Sedang memuat, mohon tunggu ...
            </span>
        </div>
    );
};

export default Spinner;
