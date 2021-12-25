import { usePagination, useTable } from "react-table";
import {
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
} from "@material-ui/core";
import MaUTable from "@material-ui/core/Table";
import { TablePagination } from "@mui/material";
import { useState } from "react";
import { UpsertFactionDialog } from "./upsert-faction-dialog";

export function FactionTable({ columns, data }) {
  const [paginatorPage, setPaginatorPage] = useState(0);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [faction, setFaction] = useState(null);
  const [rowNumberSelection] = useState([2, 5, 10]);

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
    setFaction(val);
    setOpenEditDialog(true);
  };

  return (
    <div>
      <UpsertFactionDialog
        openDialog={openEditDialog}
        data={faction}
        setOpenDialog={setOpenEditDialog}
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
                        <p>{cell.render("Cell")}</p>
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
                rowsPerPage={pageSize ? pageSize : 5}
                rowsPerPageOptions={rowNumberSelection}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </MaUTable>
      </TableContainer>
    </div>
  );
}
