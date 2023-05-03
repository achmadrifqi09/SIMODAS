import React from "react";
import "../../../css/button.css";

const ButtonCommon = ({
    children,
    action,
    tooltip,
    buttonVariant,
    disabled,
    buttonType,
}) => {
    const handleSubmit = () => {
        action();
    };

    return (
        <button
            data-tooltip={tooltip}
            className={buttonVariant}
            onClick={() => handleSubmit()}
            type={buttonType}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default ButtonCommon;
