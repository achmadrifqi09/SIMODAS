import React from "react";
import Layout from "../Layouts/Layout";
import "../../css/test.css";
import { Head } from "@inertiajs/inertia-react";

export default function Test() {
    return (
        <Layout>
            <Head title="Test" />
            <div className="first">asdfasd</div>
            <div className="second">123</div>
        </Layout>
    );
}
