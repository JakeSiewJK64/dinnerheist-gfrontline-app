import {
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TableHead,
    TableRow,
} from "@material-ui/core";
import React, { useState } from "react";
import MaUTable from "@material-ui/core/Table";
import { usePagination, useTable } from "react-table";
import TablePagination from "@material-ui/core/TablePagination/TablePagination";
import { CategoriesDetailsDialog } from "./categories-details-dialog";

export function CategoriesTable({ columns, data }) {

    const [paginatorPage, setPaginatorPage] = useState(0);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [category, setSelectedCategory] = useState(null);
    const [rowNumberSelection] = useState([2, 5, 10, 15, 20, 50, 100]);
    const {
        getTableProps,
        getTableBodyProps,
        setPageSize,
        headerGroups,
        prepareRow,
        page, // Instead of using 'rows', we'll use page,
        // which has only the rows for the active page

        // The rest of these things are super handy, too ;)
        gotoPage,
        state: { pageSize },
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0, pageSize: 5 },
        },
        usePagination
    );

    const handleChangePage = (event, newPage) => {
        setPaginatorPage(newPage);
        gotoPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setPageSize(Number(event.target.value));
    };

    const openDialogFunction = (val) => {
        setSelectedCategory(val);
        setOpenEditDialog(true);
    }

    return (
        <div>
            <CategoriesDetailsDialog
                openDialog={openEditDialog}
                setOpenDialog={setOpenEditDialog}
                data={category}
            />
            <TableContainer>
                <MaUTable {...getTableProps()}>
                    <TableHead className="hero-table-head">
                        {headerGroups.map((headerGroup) => (
                            <TableRow {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <TableCell {...column.getHeaderProps()}>
                                        <b>{column.render("Header")}</b>
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableHead>
                    <TableBody {...getTableBodyProps()}>
                        {page.map((row, i) => {
                            prepareRow(row);
                            return (
                                <TableRow {...row.getRowProps()}>
                                    {row.cells.map((cell) => {
                                        return (
                                            <TableCell
                                                {...cell.getCellProps()}
                                                onClick={() => {
                                                    openDialogFunction(cell.row.values);
                                                }}
                                            >
                                                {cell.column.Header === "Role" ? (
                                                    cell.row.original.role_name === "administrator" ? (
                                                        <p className="badge badge-pill bg-primary text-white">
                                                            {cell.render("Cell")}
                                                        </p>
                                                    ) : cell.row.original.role_name === "contributor" ? (
                                                        <p className="badge badge-pill bg-danger text-white">
                                                            {cell.render("Cell")}
                                                        </p>
                                                    ) : (
                                                        // For Normal heros
                                                        <p className="badge badge-pill bg-warning text-white">
                                                            {cell.render("Cell")}
                                                        </p>
                                                    )
                                                ) : (
                                                    // For Normal Cells
                                                    <p>{cell.render("Cell")}</p>
                                                )}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                className="paginator"
                                count={data.length}
                                page={paginatorPage}
                                onPageChange={handleChangePage}
                                rowsPerPage={pageSize !== undefined ? pageSize : 5}
                                rowsPerPageOptions={rowNumberSelection}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </TableRow>
                    </TableFooter>
                </MaUTable>
            </TableContainer>
        </div>
    )
}