import { Button, IconButton, Box } from "@mui/material";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import AccountMenu from "./account_menu";
import { useNavigate } from "react-router";

const Navbar = () => {
  const navigate = useNavigate();

  const navigateDashboard = () => {
    navigate("/dashboard");
  };

  const navigateTransactions = () => {
    navigate("/transactions");
  };

  return (
    <>
      <Box
        className="Header"
        width={"100%"}
        height={"5vh"}
        sx={{
          position: "fixed",
          top: "0%",
          backgroundColor: "#f5f5dc",
          display: "flex",
        }}
      >
        <Box
          className="logo"
          sx={{
            position: "relative",
            height: "5vh",
            width: "5vh",
            marginLeft: "3rem",
          }}
        >
          <IconButton
            aria-label="logo"
            size="large"
            onClick={navigateDashboard}
          >
            <CurrencyExchangeIcon />
          </IconButton>
        </Box>
        <Button
          size="small"
          variant="text"
          onClick={navigateDashboard}
          sx={{
            position: "relative",
            marginLeft: "1rem",
          }}
        >
          dashboard
        </Button>
        <Button
          size="small"
          variant="text"
          onClick={navigateTransactions}
          sx={{
            position: "relative",
            marginLeft: "1rem",
          }}
        >
          transactions
        </Button>
        <Box
          className="account"
          sx={{
            marginTop: "0.2rem",
            position: "fixed",
            right: "1%",
          }}
        >
          <AccountMenu />
        </Box>
      </Box>
    </>
  );
};

export default Navbar;
