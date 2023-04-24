import React, { useEffect, useState } from "react";
import "./Allusers.css";
import Form from "./Form";
import Table from "../TableCom/Table";
import GroupIcon from "@mui/icons-material/Group";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@material-ui/core";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import DialogBox from "../DailogBox/DailogBox";

import { deleteUser, getallUsers } from "../../service/api";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AllUsers = () => {
  const [user, setUser] = useState([]);
  const [openform, setOpenFrom] = useState(null);
  const [openDailogBox, setOpenDailogBox] = useState(false);
  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;
  const handleClose = () => {
    setState({ ...state, open: false });
  };
  console.log("users", user);
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await getallUsers();
    console.log(response, "response");
    setUser(response.data);
  };

  const deleteData = async (id) => {
    console.log("*O&&(**(id", id);
    if (id) {
      await deleteUser(id);
      setOpenDailogBox(false);
      setState({ open: true, vertical: "top", horizontal: "center" });
    }
    getUsers();
  };

  return (
    <div>
      {openform ? <Form openform={openform} setOpenFrom={setOpenFrom} /> : ""}
      <DialogBox
        setOpen={setOpenDailogBox}
        open={openDailogBox}
        DialogText={"Are you sure you want to Delete this user?"}
        deleteData={deleteData}
      />
      <Snackbar
        autoHideDuration={2000}
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        key={vertical + horizontal}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          "Succesfully deleted"
        </Alert>
      </Snackbar>
      <div className="mainwrapper">
        <div className="header">
          <GroupIcon className="usericon" />
          <p style={{ fontSize: 20, fontWeight: 600 }}>User Details</p>
        </div>
        <div className="rightside">
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 250,
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search here"
              inputProps={{ "aria-label": "search here" }}
            />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
          <IconButton onClick={() => setOpenFrom(true)}>
            <GroupAddIcon className="addicon"></GroupAddIcon>
          </IconButton>
        </div>
      </div>
      <Table
        user={user}
        deleteData={setOpenDailogBox}
        setOpenFrom={setOpenFrom}
      />
    </div>
  );
};

export default AllUsers;
