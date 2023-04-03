import React from "react";
import "../../../css/modal.css";
import { XMarkIcon } from "@heroicons/react/24/outline";

const Modal = ({ children, title, setIsOpen }) => {
    return (
        <div className="modal-container">
            <div className="modal">
                <div className="modal-header">
                    <span className="modal-title">{title}</span>
                    <button
                        className="close-button"
                        onClick={() => setIsOpen(false)}
                    >
                        <XMarkIcon className="icon" />
                    </button>
                </div>
                <div className="modal-body">{children}</div>
            </div>
        </div>
    );
};
export default Modal;
