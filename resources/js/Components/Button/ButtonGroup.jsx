import React, { useEffect } from "react";
import "../../../css/button.css";

const ButtonGroup = ({ buttons, action }) => {
    useEffect(() => {
        setActiveButton(buttons[0].value);
    }, []);

    const handleClick = (event) => {
        setActiveButton(event.target.name);
        action(event);
    };

    const setActiveButton = (buttonName) => {
        const buttons = document.querySelectorAll(".button-group button");
        buttons.forEach((button) => {
            button.classList.remove("active-button-group");
        });

        const activeButton = document.querySelector(
            `button[name="${buttonName}"]`
        );
        activeButton.classList.add("active-button-group");
    };
    return (
        <div className="button-group">
            {buttons.map((button, index) => (
                <button
                    type="button"
                    key={index}
                    name={button.value}
                    className={`button-group-item ${
                        index === 0
                            ? "button-group-rounded-left"
                            : index === Object.keys(buttons).length - 1
                            ? "button-group-rounded-right"
                            : "button-group-no-rounded"
                    }
                    `}
                    onClick={(event) => handleClick(event)}
                >
                    {button.value}
                </button>
            ))}
        </div>
    );
};

export default ButtonGroup;
