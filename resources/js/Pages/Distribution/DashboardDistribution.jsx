import React from "react";
import { Layout, Container } from "../../Layouts";
import { Head } from "@inertiajs/inertia-react";
import NavigationCard from "../../Components/Card/NavigationCard";
import { LinkWithIcon, ButtonWithIcon } from "../../Components/Button/index";
import {
    PlusIcon,
    BarsArrowUpIcon,
    DocumentArrowDownIcon,
} from "@heroicons/react/24/outline";

const DashboardDistribution = (props) => {
    return (
        <Layout>
            <Head title="Kelola BAST" />
            <h2>Kelola BAST</h2>

            <NavigationCard title="Pilihan Menu">
                <LinkWithIcon
                    buttonType="button-primary"
                    link="/distributions/form"
                >
                    <PlusIcon className="button-icon" />
                    Tambah Data
                </LinkWithIcon>
            </NavigationCard>
        </Layout>
    );
};

export default DashboardDistribution;
