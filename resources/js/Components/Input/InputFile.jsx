import React, { useEffect } from "react";
import "../../../css/input.css";
import { CloudArrowUpIcon } from "@heroicons/react/24/outline";

const InputFile = (props) => {
    const { name, accept, label, onChange, previewType, value, acceptFile } =
        props;
    const handleChange = (event) => {
        setInputValue(event.target.files[0], event.target.name);
        onChange(event);
    };

    const setInputValue = (file, targetName) => {
        const preview = document.querySelector(`.${targetName}`);
        const fileReader = new FileReader();
        try {
            fileReader.readAsDataURL(file);
            fileReader.addEventListener("load", function () {
                preview.style.display = "block";
                preview.innerHTML =
                    previewType === "image"
                        ? `<img src="${this.result}" alt="${targetName}"/>`
                        : `<iframe src="${this.result}"/>`;
            });
        } catch {
            preview.style.display = "block";
            preview.innerHTML =
                previewType === "image"
                    ? `<img src="http://localhost:8000/${file}" alt="${targetName}"/>`
                    : `<iframe src="http://localhost:8000/distributions/file/${file}"/>`;
        }
    };

    useEffect(() => {
        if (value) {
            setInputValue(value, name);
        }
    }, []);

    return (
        <div className="wraper-input-file">
            <div className={`preview ${name}`} id="test">
                <CloudArrowUpIcon className="icon-lg" id="icon-upload" />
            </div>
            <span>File yang diperbolehkan {acceptFile}</span>
            <label
                htmlFor={name}
                id="chooseFile"
                className="choose-file-button"
            >
                {label}
            </label>
            <input
                className="input-file"
                type="file"
                id={name}
                name={name}
                accept={accept}
                onChange={(event) => handleChange(event)}
            />
        </div>
    );
};

export default InputFile;
