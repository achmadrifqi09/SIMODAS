import React from "react";
import "../../../css/img.css";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

const ImageRoundedCorner = ({ source, alt }) => {
    return (
        <div className="wrapper-image">
            <img src={source} alt={alt} className="rounded-corner-image" />
            <a href={source} className="open-tab" target="_blank">
               <ArrowTopRightOnSquareIcon className="icon"/>
            </a>
        </div>
    );
};

export default ImageRoundedCorner;
