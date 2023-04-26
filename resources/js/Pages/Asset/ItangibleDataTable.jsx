import React from "react";
import "../../../css/table.css";
import { MenuItem } from "@mui/material";
import Table from "../../Components/Table/table";
import { Inertia } from "@inertiajs/inertia";

const ItangibleDataTable = (props) => {
    const { datas } = props;
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

    return (
        <Table
            datas={datas}
            columns={columns}
            action={({ row }) => [
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
                    onClick={() => console.info("Delete")}
                    sx={{ fontSize: "10pt" }}
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
                        Inertia.visit(`/asset/${row.original.id}/label`)
                    }
                >
                    Label
                </MenuItem>,
            ]}
        ></Table>
    );
};

export default ItangibleDataTable;
