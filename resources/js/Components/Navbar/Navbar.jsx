import React from "react";
import { Link } from "@inertiajs/inertia-react";
import "../../../css/navbar.css";
import Logo from "../../../../public/assets/logo.webp";
import { useEffect } from "react";

import {
    WalletIcon,
    RectangleGroupIcon,
    DocumentTextIcon,
    UserGroupIcon,
    UserIcon,
    ArrowLeftOnRectangleIcon,
    Bars3BottomRightIcon,
} from "@heroicons/react/24/outline";

const Navbar = () => {
    const currentUrl = window.location.pathname;

    useEffect(() => {
        document.querySelectorAll(".nav-item a").forEach((link) => {
            const aHref = link.href.split("/");
            const pageLink = currentUrl.split("/");

            if (pageLink[1] === "" && aHref[3] === "") {
                link.classList.add("active-link");
            } else if (
                aHref[3].includes(`${pageLink[1]}`) &&
                pageLink[1] !== ""
            ) {
                link.classList.add("active-link");
            }
        });
    }, [currentUrl]);

    const handleToggleMenu = () => {
        const navigationItems = document.querySelector(".nav-items-container");
        navigationItems.classList.toggle("nav-active");
    };

    return (
        <nav className="nav">
            <div className="nav-brand">
                <img src={Logo} alt="Logo Pemkab" className="logo" />
                <div className="app-name">
                    <span className="title">DISKOMINFO</span>
                    <span className="second-text">Kabupaten Malang</span>
                </div>
            </div>
            <div className="nav-items-container">
                <ul className="nav-items">
                    <li className="nav-item">
                        <a href="/" className="nav-link">
                            <RectangleGroupIcon className="icon" />
                            Dashboard
                        </a>
                    </li>
                    <li className="nav-item">
                        <Link href="/asset" className="nav-link">
                            <WalletIcon className="icon" />
                            Kelola Aset
                        </Link>
                    </li>
                    <li className="nav-item">
                        <a href="/bast" className="nav-link">
                            <DocumentTextIcon className="icon" />
                            BAST
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="/user-list" className="nav-link">
                            <UserGroupIcon className="icon" />
                            Daftar Pengguna
                        </a>
                    </li>
                </ul>
                <div className="loggedin-user">
                    <div className="wrapper-loggedin-user">
                        <UserIcon className="icon-lg avatar" />
                        <div className="loggedin-user-info">
                            <span className="second-text">Login sebagai :</span>
                            <a href="">achmad rifqi</a>
                        </div>
                    </div>
                    <ArrowLeftOnRectangleIcon className="icon" />
                </div>
            </div>
            <button
                className="toggle-button"
                type="button"
                onClick={() => handleToggleMenu()}
            >
                <Bars3BottomRightIcon />
            </button>
        </nav>
    );
};

export default Navbar;
