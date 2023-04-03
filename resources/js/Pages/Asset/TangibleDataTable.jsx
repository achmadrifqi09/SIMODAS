import React from "react";
import "../../../css/table.css";
import { IconButton } from "@mui/material";
import {
    InformationCircleIcon,
    PencilSquareIcon,
    TrashIcon,
} from "@heroicons/react/24/outline";
import Table from "../../Components/Table/table";

const TangibleDataTable = (props) => {
    const { datas } = props;
    const columns = [
        { accessorKey: "item_name", header: "Nama" },
        { accessorKey: "price", header: "Harga" },
        { accessorKey: "how_to_earn", header: "Cara Perolehan" },
    ];

    return (
        <div className="">
            <Table datas={datas} columns={columns}>
                <IconButton
                    color="primary"
                    onClick={() =>
                        window.open(
                            `mailto:kevinvandy@mailinator.com?subject=Hello ${row.original.firstName}!`
                        )
                    }
                >
                    <InformationCircleIcon className="icon" />
                </IconButton>
                <IconButton
                    color="secondary"
                    onClick={() => {
                        table.setEditingRow(row);
                    }}
                >
                    <PencilSquareIcon className="icon" />
                </IconButton>
                <IconButton
                    color="error"
                    onClick={() => {
                        data.splice(row.index, 1); //assuming simple data table
                        setData([...data]);
                    }}
                >
                    <TrashIcon className="icon" />
                </IconButton>
            </Table>
        </div>
    );
};

export default TangibleDataTable;
