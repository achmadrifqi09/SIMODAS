import React from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import { Box, IconButton } from "@mui/material";
import MaterialReactTable from "material-react-table";

const Table = ({ datas, columns, children }) => {
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
                enableFullScreenToggle={false}
                onHoveredColumnChange={false}
                enableColumnActions={false}
                rowNumberMode="static"
                muiTopToolbarProps={{
                    sx: {
                        backgroundColor: "#202020",
                    },
                }}
                muiBottomToolbarProps={{
                    sx: {
                        backgroundColor: "#202020",
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
                renderRowActions={({ row, table }) => (
                    <Box
                        sx={{
                            display: "flex",
                            flexWrap: "nowrap",
                            gap: "8px",
                        }}
                    >
                        {children}
                       
                    </Box>
                )}
            />
        </ThemeProvider>
    );
};

export default Table;
