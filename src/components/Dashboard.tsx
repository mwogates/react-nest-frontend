import React, { useState } from "react";
import {
  createStyles,
  makeStyles,
  withStyles,
  Theme,
} from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import InputBase from "@material-ui/core/InputBase";
import Button from "@material-ui/core/Button";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import Typography from "@material-ui/core/Typography";
import axios from "../service/axios";

const BootstrapInput = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "label + &": {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 4,
      position: "relative",
      backgroundColor: theme.palette.background.paper,
      border: "1px solid #ced4da",
      fontSize: 16,
      padding: "10px 26px 10px 12px",
      transition: theme.transitions.create(["border-color", "box-shadow"]),
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
      "&:focus": {
        borderRadius: 4,
        borderColor: "#80bdff",
        boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
      },
    },
  })
)(InputBase);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(1),
    },
    flex: {
      display: "flex",
    },
    root: {
      width: "300px",
    },
    errorText: {
      color: "red",
      fontSize: "12px",
      paddingLeft: "10px",
    },
  })
);

export default function CustomizedSelects() {
  const classes = useStyles();
  const [asset, setAsset] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAsset(event.target.value as string);
  };
  const onSubmit = async () => {
    await axios
      .get("/", {
        params: { asset: asset },
      })
      .then((res: any) => {
        if (res.data.error) setError(res.data.message[0]);
        else setError("");
        setAmount(res.data.value);
      });
  };

  return (
    <div className={classes.root}>
      <FormControl className={`${classes.margin} ${classes.flex}`}>
        <InputLabel htmlFor="demo-customized-select-native">asset</InputLabel>
        <NativeSelect
          id="demo-customized-select-native"
          value={asset}
          onChange={handleChange}
          input={<BootstrapInput />}
        >
          <option aria-label="None" value="" />
          <option value="BTC">BTC</option>
          <option value="ETH">ETH</option>
        </NativeSelect>
        <Typography variant="h1" component="h2" className={classes.errorText}>
          {error}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={onSubmit}
          className={classes.margin}
        >
          submit
        </Button>
      </FormControl>
      <FormControl fullWidth className={classes.margin} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-amount">
          Curernt Price
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-amount"
          value={amount}
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
          labelWidth={100}
          disabled
        />
      </FormControl>
    </div>
  );
}
