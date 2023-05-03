import React from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import MaterialReactTable from "material-react-table";

const Table = ({ datas, columns, action }) => {
    const darkTheme = createTheme({
        palette: {
            mode: "dark",
        },
    });
    return (
        <ThemeProvider theme={darkTheme}>
            <MaterialReactTable
                columns={columns}
                data={datas}
                enableClickToCopy={true}
                onHoveredColumnChange={false}
                rowNumberMode="static"
                muiTopToolbarProps={{
                    sx: {
                        backgroundColor: "#202020",
                        zIndex: 0,
                    },
                }}
                muiBottomToolbarProps={{
                    sx: {
                        backgroundColor: "#202020",
                        zIndex: 0,
                    },
                }}
                muiTableHeadCellProps={{
                    sx: {
                        fontWeight: "normal",
                        fontSize: "12px",
                        backgroundColor: "#0c6efd",
                    },
                }}
                muiTablePaperProps={{
                    elevation: 0,
                }}
                enableRowActions
                renderRowActionMenuItems={action}
            />
        </ThemeProvider>
    );
};

export default Table;
