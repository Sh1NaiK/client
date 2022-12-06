import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const handleEmailChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setEmailValue(event.target.value);
  };

  const handleClear = (message: string) => {
    window.location.reload();
    alert(message);
  };

  const handlePasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setPasswordValue(event.target.value);
  };

  const handleGoToSignUp = () => {
    navigate("/signup");
  };

  const headers = {
    "Content-Type": "application/json",
  };

  const signInHandler = async () => {
    const reqBody = {
      email: emailValue,
      password: passwordValue,
    };
    const responseJWT = await fetch("/api/users/signin", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: headers,
    }).then((response) => {
      if (response.ok) {
        return response.json();
      }
      return response.text().then((error) => {
        const e = new Error("Something wrong...");
        e.message = error;
        handleClear(e.message);
        throw e;
      });
    });
    if (responseJWT !== "Incorrect username or password") {
      localStorage.setItem("auth-token", responseJWT.jwt);
      navigate("/dashboard");
    }
  };

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
        <form id="inputForm">
          <h2 className="text">Sign In</h2>
          <TextField
            onChange={handleEmailChange}
            id="email"
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
            onChange={handlePasswordChange}
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
            onClick={signInHandler}
            sx={{
              marginTop: "1rem",
              width: "75%",
              borderRadius: "1rem",
              marginBottom: "2rem",
            }}
          >
            Sign In
          </Button>
          <h6 className="text">Still no account?</h6>
          <Button
            variant="text"
            size="small"
            onClick={handleGoToSignUp}
            sx={{
              borderRadius: "1rem",
              marginTop: "0.2rem",
            }}
          >
            Sign Up
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default SignIn;
