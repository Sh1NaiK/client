import {
  Box,
  MenuItem,
  FormControl,
  TextField,
  Input,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useState, useEffect, useRef } from "react";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import Navbar from "./navbar";
import { useNavigate } from "react-router";
import Graphic from "./linechart";
import ListingTable from "./listing";

const Dashboard = () => {
  const [isoFrom, setIsoFrom] = useState("");
  const [isoTo, setIsoTo] = useState("");
  const [inputAdorFrom, setInputAdorFrom] = useState("");
  const [inputAdorTo, setInputAdorTo] = useState("");
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [amountToEnable, setAmountToEnable] = useState(true);
  const [amountFromEnable, setAmountFromEnable] = useState(true);

  const headers = {
    "Content-Type": "application/json",
  };

  const navigate = useNavigate();

  const mountEffectPassed = useRef(false);

  useEffect(() => {
    if (!mountEffectPassed.current) {
      (async () => {
        if (!localStorage.getItem("auth-token")) {
          navigate("/signin");
        } else {
          const response = await fetch("/api/users/valid", {
            method: "POST",
            body: JSON.stringify({
              jwt: localStorage.getItem("auth-token"),
            }),
            headers: headers,
          }).then((response) => {
            if (response.ok) {
              return response.json();
            }
            return response.text().then((error) => {
              const e = new Error("Something wrong...");
              e.message = error;
              throw e;
            });
          });
          if (response !== "ok") {
            navigate("/signin");
          }
        }
      })();
    }
    return () => {
      mountEffectPassed.current = true;
    };
  });

  const handleChangeIsoFrom = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === isoTo) {
      setIsoFrom("");
    } else {
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
    }
  };

  const handleChangeIsoTo = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === isoFrom) {
      setIsoTo("");
    } else {
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
    }
  };

  const swap = () => {
    const bufIso = isoTo;
    const bufAdor = inputAdorTo;
    setIsoTo(isoFrom);
    setIsoFrom(bufIso);
    setInputAdorTo(inputAdorFrom);
    setInputAdorFrom(bufAdor);
    setFromAmount("");
    setToAmount("");
  };

  const handleFromAmountChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setFromAmount(value.replace(/\D/g, ""));
    const response = await fetch("/api/currency/converting", {
      method: "POST",
      body: JSON.stringify({
        sell_iso: isoFrom,
        buy_iso: isoTo,
        amount: event.target.value,
      }),
      headers: headers,
    }).then((response) => {
      if (response.ok) {
        return response.json();
      }
      return response.text().then((error) => {
        const e = new Error("Something wrong...");
        e.message = error;
        throw e;
      });
    });
    setToAmount(response.amount);
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
    <>
      <Navbar />
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
            height: "60%",
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
              height: "90%",
            }}
          >
            <Box
              className="leftContainer"
              sx={{
                width: "50%",
                height: "100%",
              }}
            >
              <Box
                className="converter"
                sx={{
                  backgroundColor: "white",
                  borderRadius: "1rem",
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
                      label="Currency"
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
                  borderRadius: "1rem",
                  marginTop: "0.9rem",
                  marginRight: "2rem",
                  width: "100%",
                  height: "70%",
                  backgroundColor: "white",
                }}
              >
                <Graphic />
              </Box>
            </Box>
            <Box
              className="rightContainer"
              sx={{
                marginLeft: "0.5rem",
                borderRadius: "0.5rem",
                backgroundColor: "white ",
                width: "50%",
                height: "100%",
              }}
            >
              <ListingTable />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default Dashboard;
