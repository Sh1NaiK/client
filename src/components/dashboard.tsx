import {
  Box,
  MenuItem,
  FormControl,
  TextField,
  Input,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import * as React from "react";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";

const Dashboard = () => {
  const [isoFrom, setIsoFrom] = useState("");
  const [isoTo, setIsoTo] = useState("");
  const [inputAdorFrom, setInputAdorFrom] = useState("");
  const [inputAdorTo, setInputAdorTo] = useState("");
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [amountToEnable, setAmountToEnable] = useState(true);
  const [amountFromEnable, setAmountFromEnable] = useState(true);

  const handleChangeIsoFrom = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsoFrom(event.target.value as string);
    switch (event.target.value as string) {
      case "USD":
        setInputAdorFrom("$");
        setAmountFromEnable(false);
        break;
      case "EUR":
        setInputAdorFrom("€");
        setAmountFromEnable(false);
        break;
      case "RUB":
        setInputAdorFrom("₽");
        setAmountFromEnable(false);
        break;
      case "BYN":
        setInputAdorFrom("Br");
        setAmountFromEnable(false);
        break;
    }
  };

  const handleChangeIsoTo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsoTo(event.target.value as string);
    switch (event.target.value as string) {
      case "USD":
        setInputAdorTo("$");
        setAmountToEnable(false);
        break;
      case "EUR":
        setInputAdorTo("€");
        setAmountToEnable(false);
        break;
      case "RUB":
        setInputAdorTo("₽");
        setAmountToEnable(false);
        break;
      case "BYN":
        setInputAdorTo("Br");
        setAmountToEnable(false);
        break;
    }
  };

  const swap = () => {
    const bufIso = isoTo;
    const bufAdor = inputAdorTo;
    setIsoTo(isoFrom);
    setIsoFrom(bufIso);
    setInputAdorTo(inputAdorFrom);
    setInputAdorFrom(bufAdor);
    setToAmount(fromAmount);
    setFromAmount("");
  };

  const handleFromAmountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setFromAmount(value.replace(/\D/g, ""));
  };

  const handleToAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setToAmount(value.replace(/\D/g, ""));
  };

  const currencies = [
    {
      value: "USD",
      label: "USD($)",
    },
    {
      value: "EUR",
      label: "EUR(€)",
    },
    {
      value: "RUB",
      label: "RUB(₽)",
    },
    {
      value: "BYN",
      label: "BYN(Br)",
    },
  ];

  return (
    <Box
      className="App"
      width={"100hv"}
      height={"100vh"}
      display={"flex"}
      alignItems={"center"}
      sx={{
        backgroundColor: "grey",
        background:
          "url(https://c0.wallpaperflare.com/preview/1017/538/491/money-finance-bank-cash.jpg)",
        backgroundSize: "cover",
        backgroundPositionX: "center",
        backgroundPositionY: "center",
        overflow: "hidden",
      }}
    >
      <Box
        className="formContainer"
        sx={{
          backgroundColor: "whitesmoke",
          height: "70%",
          width: "60%",
          margin: "0 auto",
          padding: "0.5rem 1rem 0 1rem",
        }}
      >
        <h1>Currency Converter</h1>
        <Box
          className="wrapper"
          sx={{
            display: "flex",
            width: "100%",
            height: "100%",
          }}
        >
          <Box
            className="leftContainer"
            sx={{
              width: "60%",
              height: "90%",
            }}
          >
            <Box
              className="converter"
              sx={{
                height: "auto",
                display: "flex",
              }}
            >
              <Box
                className="isoFrom"
                sx={{
                  paddingTop: "1rem",
                  paddingLeft: "1.5%",
                  paddingRight: "1.5%",
                  width: "44.5%",
                }}
              >
                <FormControl fullWidth>
                  <TextField
                    id="outlined-select-currency"
                    select
                    label="Currnecy"
                    value={isoFrom}
                    onChange={handleChangeIsoFrom}
                    helperText="Select your currency"
                    sx={{
                      margin: "0 auto",
                      width: "9rem",
                    }}
                  >
                    {currencies.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  <Input
                    id="standard-adornment-amount"
                    value={fromAmount}
                    disabled={amountFromEnable}
                    onChange={handleFromAmountChange}
                    startAdornment={
                      <InputAdornment position="start">
                        {inputAdorFrom}
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Box>
              <Box
                className="swap"
                sx={{
                  margin: "auto auto",
                }}
              >
                <IconButton
                  onClick={swap}
                  aria-label="delete"
                  sx={{
                    margin: "0 auto",
                  }}
                >
                  <SwapHorizIcon />
                </IconButton>
              </Box>
              <Box
                className="isoTo"
                sx={{
                  paddingTop: "1rem",
                  paddingLeft: "1.5%",
                  paddingRight: "1.5%",
                  paddingBottom: "1rem",
                  width: "44.5%",
                }}
              >
                <FormControl fullWidth>
                  <TextField
                    id="outlined-select-currency"
                    select
                    label="Currency"
                    value={isoTo}
                    onChange={handleChangeIsoTo}
                    helperText="Select your currency"
                    sx={{
                      margin: "0 auto",
                      width: "9rem",
                    }}
                  >
                    {currencies.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  <Input
                    id="standard-adornment-amount"
                    value={toAmount}
                    onChange={handleToAmountChange}
                    disabled={amountToEnable}
                    startAdornment={
                      <InputAdornment position="start">
                        {inputAdorTo}
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Box>
            </Box>
            <Box
              className="statisticContainer"
              sx={{
                width: "100%",
                height: "55%",
                backgroundColor: "darkgrey",
              }}
            ></Box>
          </Box>
          <Box
            className="rightContainer"
            sx={{
              backgroundColor: "lightblue",
              width: "50%",
              height: "80%",
            }}
          ></Box>
        </Box>
      </Box>
    </Box>
  );
};
export default Dashboard;
