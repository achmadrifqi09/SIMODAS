import React, { useEffect, useState } from "react";
import "../../../css/table.css";
import { MenuItem } from "@mui/material";
import Table from "../../Components/Table/table";
import { Inertia } from "@inertiajs/inertia";
import Modal from "../../Components/Modal/Modal";
import { Container } from "../../Layouts/index";
import { ButtonCommon } from "../../Components/Button/index";

const ItangibleDataTable = React.memo((props) => {
    const { datas } = props;

    const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
    const [deletedData, setDeletedData] = useState({});

    const columns = [
        { accessorKey: "item_name", header: "Nama" },
        { accessorKey: "creator", header: "Pembuat" },
        {
            accessorKey: "price",
            header: "Harga",
            Cell: ({ cell }) => `Rp. ${cell.getValue()}`,
        },
        { accessorKey: "item_year", header: "Tahun" },
    ];

    const handleClickDelete = (id, name) => {
        setIsOpenModalDelete(true);
        setDeletedData({
            ...deletedData,
            id: id,
            name: name,
        });
    };

    const handleDelete = () => {
        Inertia.delete(`/asset/${deletedData.id}`);
        setIsOpenModalDelete(false);
    };

    return (
        <>
            <Table
                datas={datas}
                columns={columns}
                action={({ row, closeMenu }) => [
                    <MenuItem
                        key="detail"
                        sx={{ fontSize: "10pt" }}
                        onClick={() =>
                            Inertia.visit(`/asset/${row.original.id}/detail`)
                        }
                    >
                        Detail Barang
                    </MenuItem>,
                    <MenuItem
                        key="edit"
                        sx={{ fontSize: "10pt" }}
                        onClick={() =>
                            Inertia.visit(`/asset/${row.original.id}/form`)
                        }
                    >
                        Edit Barang
                    </MenuItem>,
                    <MenuItem
                        key="delete"
                        sx={{ fontSize: "10pt" }}
                        onClick={() => {
                            handleClickDelete(
                                row.original.id,
                                row.original.item_name
                            );
                            closeMenu();
                        }}
                    >
                        Hapus Barang
                    </MenuItem>,
                    <MenuItem
                        key="basV1"
                        sx={{ fontSize: "10pt" }}
                        onClick={() => console.info("Edit")}
                    >
                        BAST V1
                    </MenuItem>,
                    <MenuItem
                        key="bastV2"
                        sx={{ fontSize: "10pt" }}
                        onClick={() => console.info("Edit")}
                    >
                        BAST V2
                    </MenuItem>,
                    <MenuItem
                        key="label"
                        sx={{ fontSize: "10pt" }}
                        onClick={() =>
                            Inertia.visit(
                                `/asset/${row.original.id}/label/preview`
                            )
                        }
                    >
                        Label
                    </MenuItem>,
                ]}
            ></Table>
            {isOpenModalDelete && (
                <Modal
                    title="Validasi Hapus Data"
                    setIsOpen={setIsOpenModalDelete}
                >
                    <Container>
                        <p>
                            Apakah anda yakin akan mengahapus asset dengan nama{" "}
                            {deletedData?.name} ?
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
        </>
    );
});

export default ItangibleDataTable;
