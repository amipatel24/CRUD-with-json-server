import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  Stack,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Checkbox,
  Box,
  DialogActions,
  Grid,
} from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { addUser, getallUsers, editUser } from "../../service/api";
import { ValidateUser } from "./Formvalidation";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const initialValue = {
  name: "",
  address: "",
  email: "",
  mobile: "",
  gender: "",
  city: "",
};
const cities = [
  {
    name: "Ahmedabad",
    value: "ahmedabad",
  },
  {
    name: "Surat",
    value: "surat",
  },
  {
    name: "Baroda",
    value: "baroda",
  },
  {
    name: "Gandhinagar",
    value: "gandhinagar",
  },
];
export default function FormDialog(props) {
  const { openform, setOpenFrom } = props;
  const [values, setvalues] = useState(initialValue);
  const [findErrors, setFindErrors] = useState(null);
  const [error, setError] = useState(null);
  const { name, address, email, mobile, gender, city } = values;
  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;
  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const onValueChange = useCallback((e) =>
    setvalues((values) => {
      const newValues = { ...values, [e.target.name]: e.target.value };
      return newValues;
    })
  );
  useEffect(() => {
    if (findErrors) {
      setError(ValidateUser(values));
    }
  }, [findErrors]);

  useEffect(() => {
    if (openform?.id) {
      setvalues({
        name: openform?.name || "",
        address: openform?.address || "",
        email: openform?.email || "",
        mobile: openform?.mobile || "",
        gender: openform?.gender || "",
        city: openform?.city || "",
      });
    }
  }, []);

  const updateUserDetails = async () => {
    setFindErrors(true);
    setError(ValidateUser(values, setFindErrors));
    if (
      values?.name &&
      values?.email &&
      values?.address &&
      values?.mobile &&
      values?.city &&
      values?.gender
    ) {
      await editUser(openform?.id, values);
      setState({ open: true, vertical: "top", horizontal: "center" });
      setTimeout(() => {
        window.location.reload();
        setOpenFrom(false);
      }, 3000);
    }
  };
  const addUserDetails = async () => {
    setFindErrors(true);
    setError(ValidateUser(values, setFindErrors));
    if (
      values?.name &&
      values?.email &&
      values?.address &&
      values?.mobile &&
      values?.city &&
      values?.gender
    ) {
      await addUser(values);
      setState({ open: true, vertical: "top", horizontal: "center" });
      setTimeout(() => {
        window.location.reload();
        setOpenFrom(false);
      }, 3000);
    }
  };

  return (
    <div>
      <Snackbar
        autoHideDuration={2000}
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        key={vertical + horizontal}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          "Succesfully added"
        </Alert>
      </Snackbar>

      <Dialog
        sx={{ width: "100%" }}
        open={openform}
        onClose={() => setOpenFrom(false)}
      >
        <div style={{ marginTop: 10 }}>
          <span
            style={{
              fontSize: 20,
              color: "#9c27b0",
              textAlign: "center",
              fontWeight: 600,
              margin: "136px",
            }}
          >
            {openform?.id ? "EditForm" : "Registration"}
          </span>
          <span>
            <HighlightOffIcon
              style={{
                position: "absolute",
                float: "right",
                top: 0,
                right: 0,
                cursor: "pointer",
                color: "#9c27b0",
              }}
              onClick={() => setOpenFrom(false)}
            />
          </span>
        </div>
        <Stack
          sx={{ width: 400, marginTop: 2 }}
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <TextField
            error={error?.name ? true : null}
            label="Name"
            name="name"
            required
            variant="outlined"
            color="secondary"
            type="name"
            sx={{
              width: { sm: 300, md: 350 },
              "& .MuiInputBase-root": {
                height: 45,
              },
            }}
            value={name}
            onChange={(e) => onValueChange(e)}
          />
          {error?.name && (
            <span style={{ color: "red", marginTop: 7 }}>{error?.name}</span>
          )}
          <TextField
            error={error?.address ? true : null}
            label="Address"
            name="address"
            required
            variant="outlined"
            color="secondary"
            type="textarea"
            rows={4}
            sx={{
              width: { sm: 300, md: 350 },
              "& .MuiInputBase-root": {
                height: 45,
              },
            }}
            value={address}
            onChange={(e) => onValueChange(e)}
          />
          {error?.address && (
            <span style={{ color: "red", marginTop: 7 }}>{error?.address}</span>
          )}
          <TextField
            error={error?.email ? true : null}
            label="Email"
            name="email"
            required
            variant="outlined"
            color="secondary"
            type="email"
            sx={{
              width: { sm: 300, md: 350 },
              "& .MuiInputBase-root": {
                height: 45,
              },
            }}
            value={email}
            onChange={(e) => onValueChange(e)}
          />
          {error?.email && (
            <span style={{ color: "red", marginTop: 7 }}>{error?.email}</span>
          )}
          <TextField
            required
            error={error?.mobile ? true : null}
            color="secondary"
            type="number"
            name="mobile"
            label="Mobile No"
            variant="outlined"
            autoComplete="off"
            sx={{
              width: { sm: 300, md: 350 },
              "& .MuiInputBase-root": {
                height: 45,
              },
            }}
            value={mobile}
            onChange={(e) => onValueChange(e)}
          />
          {error?.mobile && (
            <span style={{ color: "red", marginTop: 7 }}>{error?.mobile}</span>
          )}
          {/* select input */}
          <FormControl>
            <InputLabel color="secondary" id="demo-simple-select-label">
              City
            </InputLabel>
            <Select
              error={error?.city ? true : null}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="city"
              name="city"
              color="secondary"
              sx={{
                width: { sm: 300, md: 350 },
              }}
              value={city}
              onChange={(e) => onValueChange(e)}
              defaultValue={openform?.id ? openform?.city : city}
            >
              {cities?.map((data) => (
                <MenuItem key={data.value} value={data.value}>
                  {data.name}
                </MenuItem>
              ))}
            </Select>
            {error?.city && (
              <span style={{ color: "red", marginTop: 7 }}>{error?.city}</span>
            )}
          </FormControl>
          {/* radio button */}
          <FormControl style={{ marginRight: 180 }}>
            <FormLabel
              id="demo-row-radio-buttons-group-label"
              color="secondary"
            >
              Gender
            </FormLabel>
            <RadioGroup
              style={{ paddingLeft: 20, marginTop: 10 }}
              color="secondary"
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              defaultValue={openform?.id ? openform?.gender : null}
            >
              <FormControlLabel
                color="secondary"
                name="gender"
                value="female"
                control={<Radio color="secondary" />}
                label="Female"
                onChange={(e) => onValueChange(e)}
              />
              <FormControlLabel
                name="gender"
                value="male"
                control={<Radio color="secondary" />}
                label="Male"
                onChange={(e) => onValueChange(e)}
              />
            </RadioGroup>
            {error?.gender && (
              <span style={{ color: "red", marginTop: 7 }}>
                {error?.gender}
              </span>
            )}
          </FormControl>
          <Box style={{ marginRight: 25 }}>
            <Checkbox id="condition" color="secondary" />
            <label
              style={{
                color: "#9c27b0",
                fontWeight: 600,
                marginLeft: 10,
              }}
              htmlFor="condition"
            >
              I agree to the company terms and policy
            </label>
          </Box>
        </Stack>
        <DialogActions style={{ alignContent: "center" }}>
          {openform?.id ? (
            <Button
              style={{
                backgroundColor: "green",
                color: "white",
                padding: "6px 8px",
              }}
              variant="contained"
              onClick={() => updateUserDetails()}
              color="success"
            >
              Update
            </Button>
          ) : (
            <Button
              style={{
                backgroundColor: "green",
                color: "white",
                padding: "6px 8px",
              }}
              variant="contained"
              onClick={() => addUserDetails()}
              color="success"
            >
              Sign Up
            </Button>
          )}
          <Button
            onClick={() => setvalues(initialValue)}
            style={{
              backgroundColor: "#9c27b0",
              color: "white",
              padding: "6px 8px",
              margin: "0px 20px",
            }}
            variant="contained"
            color="secondary"
          >
            Reset
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
