import { useEffect, useRef, useState } from "react";
import { Table } from "antd";
import { useNavigate } from "react-router";
import { Box } from "@mui/system";

const ListingTable = () => {
  interface DataType {
    sell_iso: string;
    buy_iso: string;
    sell_rate: number;
    buy_rate: string;
    quantity: number;
    name: string;
  }

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
          } else {
            updateData();
          }
        }
      })();
    }
    return () => {
      mountEffectPassed.current = true;
    };
  });

  const headers = {
    "Content-Type": "application/json",
  };

  const [dbData, setDbData] = useState([]);

  const updateData = async () => {
    const response = await fetch("/api/currency/all", {
      method: "GET",
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
  };

  const { Column } = Table;

  const data: DataType[] = dbData.map((e: any, i) => {
    e.id = i;
    return e;
  });

  return (
    <Box
      sx={{
        height: "50%",
      }}
    >
      <Table
        dataSource={data}
        rowKey="id"
        scroll={{ y: 460 }}
        pagination={false}
      >
        <Column title="ISO sell" dataIndex="sell_iso" key="sell_iso" />
        <Column title="Sell rate" dataIndex="sell_rate" key="sell_rate" />
        <Column title="Buy rate" dataIndex="buy_rate" key="buy_rate" />
        <Column title="ISO buy" dataIndex="buy_iso" key="buy_iso" />
        <Column title="bank" dataIndex="name" key="name" />
      </Table>
    </Box>
  );
};

export default ListingTable;
