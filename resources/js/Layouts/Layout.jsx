import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import "../../css/layout.css";

const Layout = ({ children }) => {
    return (
        <div className="layout">
            <Navbar />
            <main className="main">{children}</main>
        </div>
    );
};

export default Layout;
