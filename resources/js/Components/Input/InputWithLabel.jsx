import React from "react";
import "../../../css/input.css";

const InputWithLabel = (props) => {
    const { type, label, placeholder, name, required, onChange, value } = props;

    const handleChange = (event) => {
        onChange(event);
    };
    return (
        <div className="wraper-input">
            <label htmlFor={name} className="label">
                {label}
            </label>
            <input
                className="input"
                type={type}
                name={name}
                id={name}
                placeholder={placeholder}
                onChange={(event) => handleChange(event)}
            />
        </div>
    );
};

export default InputWithLabel;
