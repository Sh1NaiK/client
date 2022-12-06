import { useEffect } from "react";
import { useNavigate } from "react-router";
import Navbar from "./navbar";

const Transactions = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("auth-token")) {
      navigate("/signin");
    }
  }, []);

  return (
    <>
      <Navbar />
    </>
  );
};

export default Transactions;
