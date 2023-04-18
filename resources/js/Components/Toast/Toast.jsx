import React, { useState, useRef, useEffect } from "react";
import "../../../css/toast.css";
import { Inertia } from "@inertiajs/inertia";

const Toast = (props) => {
    const { urlRedirect, message } = props;
    const [num, setNum] = useState(3);
    let intervalRef = useRef();
    const decreaseNum = () => setNum((prev) => prev - 1);
    useEffect(() => {
        intervalRef.current = setInterval(decreaseNum, 1000);
        if (num == 0) {
            clearInterval(intervalRef.current);
            urlRedirect && Inertia.visit(String(urlRedirect));
        }
        return () => clearInterval(intervalRef.current);
    }, [num]);

    return (
        <div className="alert-container">
            <span className="message">
                {message} {urlRedirect && ", halaman akan dialihkan dalam"}
                {urlRedirect && <span className="countdown"> {num}</span>}
            </span>
        </div>
    );
};

export default Toast;
