import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Button,
} from "@mui/material";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function App() {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

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
        className="signform"
        position={"relative"}
        margin={"0 auto"}
        height={"20rem"}
        width={"25rem"}
        sx={{
          backgroundColor: "#f5f5dc",
          textAlign: "center",
          paddingTop: "2.5rem",
          borderRadius: "1.5rem",
        }}
      >
        <h2 className="text">Sign In</h2>
        <TextField
          id="outlined-basic"
          size="small"
          label="email"
          variant="outlined"
          sx={{
            width: "75%",
            marginTop: "2.5rem",
            marginLeft: "1rem",
            marginRight: "1rem",
          }}
        />
        <TextField
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          id="outlined-basic"
          size="small"
          label="password"
          variant="outlined"
          sx={{
            width: "75%",
            marginTop: "1rem",
            marginLeft: "1rem",
            marginRight: "1rem",
          }}
        />
        <Button
          variant="contained"
          sx={{
            marginTop: "1rem",
            width: "75%",
            borderRadius: "1rem",
            marginBottom: "2rem",
          }}
        >
          Sign In
        </Button>
        <h6 className="text">Or Sign Up Using</h6>
        <Button
          variant="text"
          size="small"
          href="./signup"
          sx={{
            borderRadius: "1rem",
            marginTop: "0.2rem",
          }}
        >
          Sign Up
        </Button>
      </Box>
    </Box>
  );
}

export default App;
