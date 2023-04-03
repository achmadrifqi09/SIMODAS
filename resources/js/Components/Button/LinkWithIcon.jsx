import React from "react";
import "../../../css/button.css";
import { Link } from "@inertiajs/inertia-react";

const LinkWithIcon = (props) => {
    const { buttonType, children, link } = props;
    return (
        <Link className={buttonType} href={link} type="button" as="button">
            {children}
        </Link>
    );
};

export default LinkWithIcon;
