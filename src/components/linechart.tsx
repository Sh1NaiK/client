import React, { useState, useEffect, useRef } from "react";
import { Line } from "@ant-design/plots";

const Graphic = () => {
  const [data, setData] = useState([]);

  const headers = {
    "Content-Type": "application/json",
  };

  const mountEffectPassed = useRef(false);

  useEffect(() => {
    if (!mountEffectPassed.current) {
      asyncFetch();
    }
    return () => {
      mountEffectPassed.current = true;
    };
  });

  const asyncFetch = async () => {
    const response = await fetch("/api/history", {
      method: "POST",
      body: JSON.stringify({
        jwt: localStorage.getItem("auth-token"),
        iso_sell: "USD",
        iso_buy: "BYN",
      }),
      headers: headers,
    }).then((response) => {
      if (response.ok) {
        console.log(response);
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

  return (
    <>
      <Line {...config} height={1} />
    </>
  );
};

export default Graphic;