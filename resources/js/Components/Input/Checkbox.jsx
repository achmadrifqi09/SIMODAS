import React from "react";
import "../../../css/input.css";

const Checkbox = (props) => {
    const { name, onChange, label } = props;
    const handleChecked = (event) => {
        onChange(event);
    };
    return (
        <div className="wrapper-checkbox">
            <input
                type="checkbox"
                id={name}
                name={name}
                className="checkbox"
                onChange={(event) => handleChecked(event)}
            />
            <label htmlFor={name} className="checkbox-label">
                {label}
            </label>
        </div>
    );
};
export default Checkbox;
