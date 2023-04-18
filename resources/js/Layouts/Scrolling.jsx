import React from "react";
import "../../css/layout.css";

const Scrolling = ({ children, layoutHeight }) => {
    return <div className={`scrolling ${layoutHeight}`}>{children}</div>;
};

export default Scrolling;
