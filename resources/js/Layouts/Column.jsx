import React from "react";
import "../../css/layout.css";

const Column = ({ children }) => {
    return <div className="column">{children}</div>;
};

const WrapperItemsColumn = ({ children }) => {
    return <div className="items-column">{children}</div>;
};
export { Column, WrapperItemsColumn };
