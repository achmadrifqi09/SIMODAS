import React from "react";
import "../../../css/input.css";

const TextareaWithLabel = (props) => {
    const { label, placeholder, name, onChange, value } = props;

    const handleChange = (event) => {
        onChange(event);
    };
    return (
        <div className="wraper-input">
            <label htmlFor={name} className="label">
                {label}
            </label>
            <textarea
                className="textarea"
                name={name}
                id={name}
                placeholder={placeholder}
                onChange={(event) => handleChange(event)}
            >
                {value}
            </textarea>
        </div>
    );
};

export default TextareaWithLabel;
