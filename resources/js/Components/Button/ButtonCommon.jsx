import React from "react";
import "../../../css/button.css";

const ButtonCommon = ({
    children,
    action,
    tooltip,
    buttonVariant,
    disabled,
}) => {
    const handleSubmit = () => {
        action();
    };

    return (
        <button
            data-tooltip={tooltip}
            className={buttonVariant}
            onClick={() => handleSubmit()}
            type="button"
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default ButtonCommon;
