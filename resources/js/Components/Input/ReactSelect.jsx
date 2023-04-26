import React, { useEffect, useState } from "react";
import Select from "react-select";
import "../../../css/input.css";

const ReactSelect = (props) => {
    const { datas, onChange, label, name, defaultValue } = props;

    const handleChange = (event) => {
        onChange({
            target: {
                name: name,
                value: event.value,
            },
        });
    };
    const isDefaultValue = (e) => e.value === defaultValue;

    return (
        <div className="wraper-input">
            <label htmlFor={name} className="label">
                {label}
            </label>
            <Select
                onChange={(event) => handleChange(event)}
                options={datas}
                defaultValue={
                    defaultValue
                        ? datas[datas.findIndex(isDefaultValue)]
                        : datas[0]
                }
                name={name}
                id={name}
                theme={(theme) => ({
                    ...theme,
                    colors: {
                        primary25: "#2d2d2d",
                        primary: "#237bff",
                    },
                })}
                styles={{
                    control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderColor: state.isFocused ? "#237bff" : "#2d2d2d",
                        backgroundColor: "#202020",
                        color: "#fff",
                        borderRadius: "8px",
                        paddingTop: "3px",
                        paddingBottom: "3px",
                        marginTop: "8px",
                        fontSize: "10pt",
                        border: "1px solid #2d2d2d",
                    }),
                    menu: (baseStyles) => ({
                        ...baseStyles,
                        backgroundColor: "#202020",
                        color: "#fff",
                        fontSize: "10pt",
                    }),
                    singleValue: (baseStyles) => ({
                        ...baseStyles,
                        color: "#fff",
                    }),
                }}
            />
        </div>
    );
};

export default ReactSelect;
