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
import {
    SelectWithLabel,
    InputWithLabel,
    ReactSelect,
} from "../../Components/Input/index";
import NavigationCard from "../../Components/Card/NavigationCard";
import TangibleDataTable from "./TangibleDataTable";
import ItangibleDataTable from "./ItangibleDataTable";
import { Column, WrapperItemsColumn } from "../../Layouts/index";
import Modal from "../../Components/Modal/Modal";
import Toast from "../../Components/Toast/Toast";
import {
    tangibleData,
    itangibleData,
    itemCategory,
} from "../../Utils/PresenterData";
import { Inertia } from "@inertiajs/inertia";
import {
    validatorInput,
    checkAllInputIsCorrect,
} from "../../Utils/ValidatorInput";

const Asset = (props) => {
    const [formType, setformType] = useState("Berwujud");
    const [isOpenModalImport, setIsOpenModalImport] = useState(false);
    const [isOpenModalExport, setIsOpenModalExport] = useState(false);
    const [isOpenToast, setIsOpenToast] = useState(false);
    const { tangibleAsset, itangibleAsset, errors, flash } = props;
    const [isError, setIsError] = useState(false);
    const [dataExport, setDataExport] = useState({});
    const [columnData, setColumnData] = useState(tangibleData);
    const handleNavigationTab = (event) => {
        setformType(event.target.name);
    };
    const [isSubmitExport, setIsSubmitExport] = useState(false);

    const [inputErrors, setInputErrors] = useState({
        item_category: true,
        start_year: true,
        end_year: true,
        column_data: true,
    });

    const { data, setData, post, progress } = useForm({
        item_category: "Berwujud",
        file: null,
    });

    const handleChangeFormImport = (event) => {
        const { name, value } = event.target;

        setData({
            ...data,
            [name]: type === "file" ? event.target.files[0] : value,
        });
    };
    

    const handleChangeExport = (event) => {
        const { name, value } = event.target;
        if (name === "item_category" && value === "Tak Berwujud") {
            setColumnData(itangibleData);
            setDataExport({});
        } else if (name === "item_category" && value === "Berwujud") {
            setColumnData(tangibleData);
            setDataExport({});
        }
        const correctnessResult = validatorInput(inputErrors, event.target);
        Object.keys(correctnessResult).forEach((key) => {
            setInputErrors({
                ...inputErrors,
                [key]: correctnessResult[key],
            });
        });

        setDataExport({
            ...dataExport,
            [name]: value,
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
    }, [flash, errors, inputErrors]);

    useEffect(() => {
        const isErrorsInput = checkAllInputIsCorrect(inputErrors);
        !isErrorsInput ? setIsSubmitExport(true) : setIsSubmitExport(false);
    }, [inputErrors]);

    const handleImportSubmit = () => {
        setIsOpenModalImport(false);
        post("/asset/import");
    };

    const handleExportSubmit = () => {
        setIsOpenModalExport(false);
        Inertia.post("/asset/export", dataExport);
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
                    action={() => setIsOpenModalImport(true)}
                    buttonType="button"
                >
                    <BarsArrowUpIcon className="button-icon" />
                    Import Excel
                </ButtonWithIcon>
                <ButtonWithIcon
                    buttonVariant="button-primary"
                    action={() => setIsOpenModalExport(true)}
                    buttonType="button"
                >
                    <DocumentArrowDownIcon className="button-icon" />
                    Export PDF
                </ButtonWithIcon>
            </NavigationCard>

            <Container>
                <ButtonGroup
                    buttons={itemCategory}
                    action={handleNavigationTab}
                />
                {formType === "Berwujud" ? (
                    <TangibleDataTable
                        datas={tangibleAsset}
                        errors={errors}
                        flash={flash}
                    />
                ) : (
                    <ItangibleDataTable
                        datas={itangibleAsset}
                        errors={errors}
                        flash={flash}
                    />
                )}
            </Container>

            {isOpenModalImport && (
                <Modal
                    title="Import data dari file excel"
                    setIsOpen={setIsOpenModalImport}
                >
                    <form onSubmit={handleImportSubmit}>
                        <SelectWithLabel
                            datas={itemCategory}
                            label="Kategori Barang"
                            name="item_category"
                            onChange={handleChangeFormImport}
                        />
                        <InputWithLabel
                            type="file"
                            name="file"
                            placeholder="File Data"
                            label="File Data"
                            onChange={handleChangeFormImport}
                            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                        />

                        <ButtonCommon
                            buttonVariant="button-primary-lg"
                            action={handleImportSubmit}
                            buttonType="button"
                        >
                            Import
                        </ButtonCommon>
                    </form>
                </Modal>
            )}

            {isOpenModalExport && (
                <Modal title="Export data PDF" setIsOpen={setIsOpenModalExport}>
                    <form onSubmit={handleImportSubmit}>
                        <ReactSelect
                            datas={itemCategory}
                            label="Kategori"
                            onChange={handleChangeExport}
                            name="item_category"
                            isMulti={false}
                            isCorrect={inputErrors.item_category}
                        />

                        <InputWithLabel
                            type="text"
                            name="keyword"
                            placeholder="Nama aset / Merk"
                            label="Kata Kunci Pencarian"
                            onChange={handleChangeExport}
                            isCorrect={false}
                        />

                        <ReactSelect
                            datas={props.employees}
                            label="Pengguna"
                            onChange={handleChangeExport}
                            name="user"
                            isMulti={false}
                        />

                        <Column>
                            <WrapperItemsColumn>
                                <InputWithLabel
                                    type="number"
                                    name="start_year"
                                    placeholder="Tahun pengadaan barang"
                                    label="Dari Tahun"
                                    onChange={handleChangeExport}
                                    isCorrect={inputErrors.start_year}
                                />
                            </WrapperItemsColumn>
                            <WrapperItemsColumn>
                                <InputWithLabel
                                    type="number"
                                    name="end_year"
                                    placeholder="Tahun pengadaan barang"
                                    label="Sampai Tahun"
                                    onChange={handleChangeExport}
                                    isCorrect={inputErrors.end_year}
                                />
                            </WrapperItemsColumn>
                        </Column>

                        <ReactSelect
                            datas={columnData}
                            label="Kolom yang dieksport"
                            onChange={handleChangeExport}
                            name="column_data"
                            isMulti={true}
                            isCorrect={inputErrors.column_data}
                        />

                        <ButtonCommon
                            buttonVariant="button-primary-lg"
                            action={handleExportSubmit}
                            buttonType="button"
                            disabled={!isSubmitExport}
                        >
                            Export
                        </ButtonCommon>
                    </form>
                </Modal>
            )}
        </Layout>
    );
};

export default Asset;
