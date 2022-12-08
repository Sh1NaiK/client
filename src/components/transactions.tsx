import {
  Box,
  Button,
  FormControl,
  Input,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Navbar from "./navbar";
import { Space, Table } from "antd";

const Transactions = () => {
  const navigate = useNavigate();

  const headers = {
    "Content-Type": "application/json",
  };

  const [dbData, setDbData] = useState([]);

  useEffect(() => {
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
        } else {
          const response = await fetch("/api/transactions/data", {
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
          setDbData(response.rows);
        }
      }
    })();
  });

  const addTransactionHandler = () => {
    fetch("/api/transactions/add", {
      method: "POST",
      body: JSON.stringify({
        jwt: localStorage.getItem("auth-token"),
        iso_want: "USD",
        iso_sell: "BYN",
        rate: 2.5,
        amount: 100,
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
  };

  const { Column } = Table;

  interface DataType {
    id: string;
    iso_want: string;
    iso_sell: string;
    rate: number;
    amount: number;
    user_id: string;
  }

  const data: DataType[] = dbData;

  const deleteTransactionHandler = async (id: string) => {
    await fetch("/api/transactions/delete", {
      method: "DELETE",
      body: JSON.stringify({
        jwt: localStorage.getItem("auth-token"),
        id: id,
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
  };

  const currencies = [
    {
      value: "USD",
      label: "USD",
    },
    {
      value: "EUR",
      label: "EUR",
    },
    {
      value: "RUB",
      label: "RUB",
    },
    {
      value: "BYN",
      label: "BYN",
    },
  ];

  const [isoWant, setIsoWant] = useState("");
  const [isoSell, setIsoSell] = useState("");
  const [rate, setRate] = useState("");
  const [amount, setAmount] = useState("");

  // const regex = /^\D*\.?\D*$/;
  // const regex = /((\d+)((\.\d{1,2}?))$/;

  const handleChangeRate = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    // setRate(value.replace(/[^\d.]/g, ""));
    setRate(value.replace(regex, ""));
  };

  const handleChangeAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setAmount(value.replace(/\D/g, ""));
  };

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
            display: "flex",
            backgroundColor: "whitesmoke",
            height: "84%",
            width: "60%",
            margin: "0 auto",
            padding: "0.5rem 1rem 0 1rem",
          }}
        >
          <Box
            className="tableContainer"
            sx={{
              width: "70%",
            }}
          >
            <Table dataSource={data} rowKey="id">
              <Column title="ISO want" dataIndex="iso_want" key="iso_want" />
              <Column title="ISO sell" dataIndex="iso_sell" key="iso_sell" />
              <Column title="Rate" dataIndex="rate" key="rate" />
              <Column title="Amount" dataIndex="amount" key="amount" />
              <Column
                title="Action"
                key="action"
                render={(_: any, record: DataType) => (
                  <Space size="middle">
                    <Button onClick={() => deleteTransactionHandler(record.id)}>
                      Delete
                    </Button>
                  </Space>
                )}
              />
            </Table>
          </Box>
          <Box
            className="addContainer"
            sx={{
              textAlign: "center",
              margin: "auto 0 auto 2rem",
              padding: "1rem 0 1rem 0",
              width: "26%",
              borderRadius: "1rem",
              backgroundColor: "white",
            }}
          >
            <FormControl fullWidth>
              <Typography
                variant="h5"
                sx={{
                  margin: "0 auto 1rem auto",
                }}
              >
                Add new transaction
              </Typography>
              <TextField
                id="outlined-select-currency"
                select
                label="Wanted ISO"
                value={isoWant}
                helperText="Select wanted currency"
                sx={{
                  margin: "0 auto 0.5rem auto",
                  width: "10.1rem",
                }}
              >
                {currencies.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="outlined-select-currency"
                select
                label="Sell ISO"
                value={isoSell}
                helperText="Select sell currency"
                sx={{
                  margin: "0 auto 0.5rem auto",
                  width: "10.1rem",
                }}
              >
                {currencies.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="rate"
                label="Rate"
                value={rate}
                onChange={handleChangeRate}
                variant="outlined"
                sx={{
                  margin: "0 auto 0.5rem auto",
                  width: "10.1rem",
                }}
              />
              <TextField
                id="amount"
                label="Amount"
                value={amount}
                onChange={handleChangeAmount}
                variant="outlined"
                sx={{
                  margin: "0 auto 0.5rem auto",
                  width: "10.1rem",
                }}
              />
            </FormControl>
            <Button
              onClick={addTransactionHandler}
              sx={{
                borderRadius: "1rem",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              Add Transaction
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Transactions;
