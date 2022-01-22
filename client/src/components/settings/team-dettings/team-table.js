import { usePagination, useTable } from "react-table";
import {
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import MaUTable from "@mui/material/Table/Table";
import { useState } from "react";
import { TeamDialog } from "./team-dialog";

export function TeamTable({ columns, data, faction }) {
  const [paginatorPage, setPaginatorPage] = useState(0);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [rowNumberSelection] = useState([2, 5, 10]);
  const [team, setTeam] = useState(null);

  const {
    getTableProps,
    getTableBodyProps,
    setPageSize,
    headerGroups,
    prepareRow,
    page,
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

  const handleOpenEditDialog = (val) => {
    setTeam(val);
    setOpenEditDialog(true);
  };

  return (
    <div>
      <TeamDialog
        data={team}
        setOpenDialog={setOpenEditDialog}
        factions={faction}
        openDialog={openEditDialog}
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
                        onClick={() => handleOpenEditDialog(cell.row.values)}
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
                rowsPerPage={pageSize ? pageSize : 5}
                onPageChange={handleChangePage}
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
