import React from "react";
import "../../../css/input.css";

const InputWithLabel = (props) => {
    const {
        type,
        label,
        placeholder,
        name,
        onChange,
        value,
        accept,
        disabled,
        isCorrect,
    } = props;

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
                value={value}
                placeholder={placeholder}
                onChange={(event) => handleChange(event)}
                accept={accept}
                disabled={disabled}
                maxLength={100}
            />

            <span className="error-label">
                {isCorrect && "Tipe isian ini harus diisi"}
            </span>
        </div>
    );
};

export default InputWithLabel;
