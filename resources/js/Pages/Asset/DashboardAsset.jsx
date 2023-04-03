import React, { useState } from "react";
import { Container, Layout } from "../../Layouts/index";
import { Head } from "@inertiajs/inertia-react";
import {
    LinkWithIcon,
    ButtonGroup,
    ButtonWithIcon,
} from "../../Components/Button/index";
import {
    PlusIcon,
    BarsArrowUpIcon,
    DocumentArrowDownIcon,
} from "@heroicons/react/24/outline";
import NavigationCard from "../../Components/Card/NavigationCard";
import TangibleDataTable from "./TangibleDataTable";
import ItangibleDataTable from "./ItangibleDataTable";
import Modal from "../../Components/Modal/Modal";

const Asset = (props) => {
    const [formType, setformType] = useState("Berwujud");
    const [isOpen, setIsOpen] = useState(false);
    const handleClickButtonGroup = (event) => {
        setformType(event.target.name);
    };

    return (
        <Layout>
            <Head title="Kelola Aset" />
            <h2>Kelola Asset</h2>
            <NavigationCard title="Pilihan Menu">
                <LinkWithIcon buttonType="button-primary" link="/asset/add">
                    <PlusIcon className="button-icon" />
                    Tambah Data
                </LinkWithIcon>
                <ButtonWithIcon
                    buttonVariant="button-primary"
                    action={() => setIsOpen(true)}
                    buttonType="button"
                >
                    <BarsArrowUpIcon className="button-icon" />
                    Import Excel
                </ButtonWithIcon>
                <LinkWithIcon buttonType="button-primary">
                    <DocumentArrowDownIcon className="button-icon" />
                    Ekspor PDF
                </LinkWithIcon>
            </NavigationCard>
            <Container>
                <ButtonGroup
                    buttons={["Berwujud", "Tak Berwujud"]}
                    action={handleClickButtonGroup}
                />
                {formType === "Berwujud" ? (
                    <TangibleDataTable datas={props.tangibleAsset} />
                ) : (
                    <ItangibleDataTable />
                )}
            </Container>

            {isOpen && (
                <Modal title="Modal test" setIsOpen={setIsOpen}>
                    <input type="text" />
                </Modal>
            )}
        </Layout>
    );
};

export default Asset;
