import React, { useState } from "react";
import { Line } from "@ant-design/plots";
import { Box, MenuItem, TextField } from "@mui/material";

const Graphic = () => {
  const [isoFrom, setIsoFrom] = useState("");
  const [data, setData] = useState([]);

  const headers = {
    "Content-Type": "application/json",
  };

  const updateHistory = async (iso: string) => {
    const response = await fetch("/api/history", {
      method: "POST",
      body: JSON.stringify({
        jwt: localStorage.getItem("auth-token"),
        iso_sell: iso,
        iso_buy: "BYN",
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
    setData(response.rows);
  };
  const config = {
    data,
    xField: "date",
    yField: "buy_rate",
    xAxis: {
      tickCount: 5,
    },
    smooth: true,
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
  ];

  const handleChangeIsoFrom = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsoFrom(event.target.value as string);
    updateHistory(event.target.value);
  };

  return (
    <Box
      sx={{
        marginTop: "0rem",
        height: "85%",
        padding: "0 0.7rem 0.5rem 0.7rem ",
      }}
    >
      <Box
        sx={{
          height: "5rem",
          // marginBottom: "0.5rem",
        }}
      >
        <TextField
          id="selectIso"
          select
          label="Currency"
          value={isoFrom}
          onChange={handleChangeIsoFrom}
          helperText="Select your currency"
          sx={{
            width: "9rem",
          }}
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      <Line {...config} height={1} />
    </Box>
  );
};

export default Graphic;
