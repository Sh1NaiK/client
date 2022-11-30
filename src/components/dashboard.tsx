import { Box, TextField, Button } from "@mui/material";

const Dashboard = () => {
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
    ></Box>
  );
};
export default Dashboard;
