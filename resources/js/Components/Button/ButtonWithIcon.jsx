import React from "react";
import "../../../css/button.css";

const ButtonWithIcon = (props) => {
    const { buttonVariant, children, action, buttonType } = props;
    return (
        <button
            className={buttonVariant}
            type={buttonType}
            onClick={() => action()}
        >
            {children}
        </button>
    );
};

export default ButtonWithIcon;
