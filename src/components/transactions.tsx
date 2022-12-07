import { Box, Button } from "@mui/material";
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

  const addTransactionHandler = async () => {
    await fetch("/api/transactions/add", {
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
    id: React.Key;
    iso_want: string;
    iso_sell: string;
    rate: number;
    amount: number;
    user_id: React.Key;
  }

  const data: DataType[] = dbData;

  const deleteTransactionHandler = async () => {
    console.log("delete");
    // const response = await fetch("/api/transactions/delete", {
    //   method: "DELETE",
    //   body: JSON.stringify({
    //     jwt: localStorage.getItem("auth-token"),
    //   }),
    //   headers: headers,
    // }).then((response) => {
    //   if (response.ok) {
    //     return response.json();
    //   }
    //   return response.text().then((error) => {
    //     const e = new Error("Something wrong...");
    //     e.message = error;
    //     throw e;
    //   });
    // });
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
            backgroundColor: "whitesmoke",
            height: "70%",
            width: "60%",
            margin: "0 auto",
            padding: "0.5rem 1rem 0 1rem",
          }}
        >
          <Table dataSource={data}>
            <Column title="ISO want" dataIndex="iso_want" key="iso_want" />
            <Column title="ISO sell" dataIndex="iso_sell" key="iso_sell" />
            <Column title="Rate" dataIndex="rate" key="rate" />
            <Column title="Amount" dataIndex="amount" key="amount" />
            <Column
              title="Action"
              key="action"
              render={(_: any, record: DataType) => (
                <Space size="middle">
                  <Button onClick={deleteTransactionHandler}>Delete</Button>
                </Space>
              )}
            />
          </Table>
          <Button onClick={addTransactionHandler}>Add</Button>
        </Box>
      </Box>
    </>
  );
};

export default Transactions;
