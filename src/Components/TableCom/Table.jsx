import * as React from "react";
import data from "../../Database/db.json";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@material-ui/core";

export default function ColumnGroupingTable(props) {
  const { user, deleteData,setOpenFrom } = props;
  console.log("user", user);
  const columnsdata = user.length ? Object.keys(user[0]) : null;
  console.log("columnsdata", columnsdata);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%" }}>
      <TableContainer sx={{ maxHeight: 440, marginTop: 3 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columnsdata?.map((column) => (
                <TableCell sx={{ fontWeight: 700 }}>{column}</TableCell>
              ))}
              <TableCell sx={{ fontWeight: 700 }} align="cenetr">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {user
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                console.log("row==>", row);
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columnsdata.map((column) => {
                      console.log("row[column]", row[column]);
                      return (
                        <TableCell key={column.id}>{row[column]}</TableCell>
                      );
                    })}
                    <TableCell>
                      <IconButton>
                        <EditIcon style={{ color: "green",fontSize:"20px" }}  onClick={() => setOpenFrom(row)} />
                      </IconButton>
                      <IconButton>
                        <DeleteIcon
                          onClick={() => deleteData(row.id)}
                          style={{ color: "red" }}
                          fontSize="17px"
                        />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={user.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
