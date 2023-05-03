import React, { useEffect, useState } from "react";
import { Container, Layout } from "../../Layouts/index";
import { Head, useForm } from "@inertiajs/inertia-react";
import {
    LinkWithIcon,
    ButtonWithIcon,
    ButtonCommon,
} from "../../Components/Button/index";
import {
    PlusIcon,
    BarsArrowUpIcon,
    DocumentArrowDownIcon,
} from "@heroicons/react/24/outline";
import { InputWithLabel } from "../../Components/Input/index";
import NavigationCard from "../../Components/Card/NavigationCard";
import Modal from "../../Components/Modal/Modal";
import Table from "../../Components/Table/table";
import { MenuItem } from "@mui/material";
import { Inertia } from "@inertiajs/inertia";
import Toast from "../../Components/Toast/Toast";

const DashboardEmployee = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
    const [deletedData, setDeletedData] = useState({});
    const [isOpenToast, setIsOpenToast] = useState(false);
    const { datas, errors, flash } = props;
    const columns = [
        { accessorKey: "name", header: "Nama" },
        { accessorKey: "nip", header: "NIP" },
        { accessorKey: "rank", header: "Pangkat" },
        { accessorKey: "position", header: "Jabatan" },
        { accessorKey: "group", header: "Golongan" },
    ];
    const { data, setData, post, progress } = useForm({
        file: null,
    });

    const handleChangeFormImport = (event) => {
        const { name, value, type } = event.target;
        setData({
            ...data,
            [name]: type === "file" ? event.target.files[0] : value,
        });
    };

    const handleSubmit = () => {
        setIsOpen(false);
        post("/employees/import");
    };

    const handleClickDelete = (id, name) => {
        setIsOpenModalDelete(true);
        setDeletedData({
            ...deletedData,
            id: id,
            name: name,
        });
    };

    const handleDelete = () => {
        Inertia.delete(`/employees/${deletedData.id}`);
        setIsOpenModalDelete(false);
        setIsOpenToast(true);
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
    }, [flash, errors]);

    return (
        <Layout>
            <Head title="Kelola Pengguna" />
            <h2>Kelola Pengguna</h2>
            {isOpenToast && (
                <Toast
                    message={!isError ? flash?.message : "Gagal melakukan aksi"}
                />
            )}
            <NavigationCard title="Pilihan Menu">
                <LinkWithIcon
                    buttonType="button-primary"
                    link="/employees/form"
                >
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
                    Export PDF
                </LinkWithIcon>
            </NavigationCard>
            <Container>
                <Table
                    datas={datas}
                    columns={columns}
                    action={({ row, closeMenu }) => [
                        <MenuItem
                            key="edit"
                            sx={{ fontSize: "10pt" }}
                            onClick={() => {
                                Inertia.visit(
                                    `/employees/${row.original.id}/form`
                                );
                                closeMenu();
                            }}
                        >
                            Edit pengguna
                        </MenuItem>,
                        <MenuItem
                            key="delete"
                            sx={{ fontSize: "10pt" }}
                            onClick={() => {
                                handleClickDelete(
                                    row.original.id,
                                    row.original.name
                                );
                                closeMenu();
                            }}
                        >
                            Hapus pengguna
                        </MenuItem>,
                    ]}
                ></Table>
            </Container>
            {isOpenModalDelete && (
                <Modal
                    title="Validasi Hapus Data"
                    setIsOpen={setIsOpenModalDelete}
                >
                    <Container>
                        <p>
                            Apakah anda yakin akan mengahapus pengguna dengan
                            nama {deletedData?.name}?
                        </p>
                    </Container>
                    <ButtonCommon
                        buttonVariant="button-danger-lg"
                        action={() => handleDelete()}
                        buttonType="button"
                    >
                        Ya, saya yakin
                    </ButtonCommon>
                </Modal>
            )}
            {isOpen && (
                <Modal title="Import Data Pegawai" setIsOpen={setIsOpen}>
                    <form onSubmit={handleSubmit}>
                        <InputWithLabel
                            type="file"
                            name="file"
                            placeholder="Pilih File Excel"
                            label="Pilih File Excel"
                            onChange={handleChangeFormImport}
                            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                        />

                        <ButtonCommon
                            buttonVariant="button-primary-lg"
                            action={handleSubmit}
                            buttonType="button"
                        >
                            Import
                        </ButtonCommon>
                    </form>
                </Modal>
            )}
        </Layout>
    );
};

export default DashboardEmployee;
