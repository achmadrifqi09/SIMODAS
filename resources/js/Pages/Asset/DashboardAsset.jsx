import React, { useState, useEffect } from "react";
import { Container, Layout } from "../../Layouts/index";
import { Head, useForm } from "@inertiajs/inertia-react";
import {
    LinkWithIcon,
    ButtonGroup,
    ButtonWithIcon,
    ButtonCommon,
} from "../../Components/Button/index";
import {
    PlusIcon,
    BarsArrowUpIcon,
    DocumentArrowDownIcon,
} from "@heroicons/react/24/outline";
import { SelectWithLabel, InputWithLabel } from "../../Components/Input/index";
import NavigationCard from "../../Components/Card/NavigationCard";
import TangibleDataTable from "./TangibleDataTable";
import ItangibleDataTable from "./ItangibleDataTable";
import Modal from "../../Components/Modal/Modal";
import Toast from "../../Components/Toast/Toast";

const Asset = (props) => {
    const [formType, setformType] = useState("Berwujud");
    const [isOpen, setIsOpen] = useState(false);
    const itemCategory = [{ value: "Berwujud" }, { value: "Tak Berwujud" }];
    const [isOpenToast, setIsOpenToast] = useState(false);
    const { tangibleAsset, itangibleAsset, errors, flash } = props;
    const [isError, setIsError] = useState(false);

    const handleNavigationTab = (event) => {
        setformType(event.target.name);
    };
    const { data, setData, post, progress } = useForm({
        item_category: "Berwujud",
        file: null,
    });

    const handleChangeFormImport = (event) => {
        const { name, value, type } = event.target;

        setData({
            ...data,
            [name]: type === "file" ? event.target.files[0] : value,
        });
    };

    useEffect(() => {
        if (Object.keys(errors).length != 0) {
            setIsError(true);
            setIsOpenToast(true);
        } else if (String(flash?.message).toLowerCase().includes("berhasil")) {
            setIsError(false);
            setIsOpenToast(true);
        }
        setTimeout(() => {
            if (setIsOpenToast) {
                setIsOpenToast(false);
            }
        }, 3000);
        setData({
            ...data,
            item_category: "Berwujud",
        });
    }, [flash, errors]);

    const handleSubmit = () => {
        setIsOpen(false);
        post("/asset/import");
    };

    return (
        <Layout>
            <Head title="Kelola Aset" />
            <h2>Kelola Asset</h2>
            {isOpenToast && (
                <Toast
                    message={!isError ? flash?.message : "Gagal melakukan aksi"}
                />
            )}
            <NavigationCard title="Pilihan Menu">
                <LinkWithIcon buttonType="button-primary" link="/asset/form">
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
                    Eksport PDF
                </LinkWithIcon>
            </NavigationCard>
            <Container>
                <ButtonGroup
                    buttons={itemCategory}
                    action={handleNavigationTab}
                />
                {formType === "Berwujud" ? (
                    <TangibleDataTable datas={tangibleAsset} />
                ) : (
                    <ItangibleDataTable datas={itangibleAsset} />
                )}
            </Container>

            {isOpen && (
                <Modal title="Modal test" setIsOpen={setIsOpen}>
                    <form onSubmit={handleSubmit}>
                        <SelectWithLabel
                            datas={itemCategory}
                            label="Kategori Barang"
                            name="item_category"
                            onChange={handleChangeFormImport}
                        />
                        <InputWithLabel
                            type="file"
                            name="file"
                            placeholder="Nama aset / nama barang"
                            label="Nama Barang"
                            onChange={handleChangeFormImport}
                            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                        />

                        <ButtonCommon
                            buttonVariant="button-primary-lg"
                            action={handleSubmit}
                        >
                            Import
                        </ButtonCommon>
                    </form>
                </Modal>
            )}
        </Layout>
    );
};

export default Asset;
