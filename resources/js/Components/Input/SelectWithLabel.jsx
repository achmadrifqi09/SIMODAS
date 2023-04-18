import React from "react";
import "../../../css/input.css";

const SelectWithLabel = (props) => {
    const { datas, label, name, onChange } = props;
    const handleChange = (event) => {
        onChange(event);
    };
    return (
        <div className="wraper-input">
            <label htmlFor={name} className="label">
                {label}
            </label>
            <select
                name={name}
                id={name}
                className="select"
                onChange={(event) => handleChange(event)}
            >
                {datas.map((data, index) => (
                    <option
                        key={index}
                        value={data.value}
                        className="select-item"
                    >
                        {data.value}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelectWithLabel;
