import React from "react";
import { Layout } from "../../Layouts";
import { Head } from "@inertiajs/inertia-react";
import NavigationCard from "../../Components/Card/NavigationCard";
import { LinkWithIcon } from "../../Components/Button/index";
import { PlusIcon } from "@heroicons/react/24/outline";

const Dashboard = (props) => {
    return (
        <Layout>
            <Head title="Kelola BAST" />
            <h2>Dashboard</h2>

            <NavigationCard title="Pilihan Menu">
                <LinkWithIcon buttonType="button-primary" link="/asset/form">
                    <PlusIcon className="button-icon" />
                    Tambah Data
                </LinkWithIcon>
            </NavigationCard>
        </Layout>
    );
};

export default Dashboard;
