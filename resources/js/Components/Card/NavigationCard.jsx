import React from "react";
import "../../../css/card.css";

const NavigationCard = (props) => {
    const { children, title } = props;

    return (
        <div className="navigation-card">
            <span className="card-title">{title}</span>
            <div className="navigation-card-body">{children}</div>
        </div>
    );
};

export default NavigationCard;
