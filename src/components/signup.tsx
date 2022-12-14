import { Box, TextField, Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [nameValue, setNameValue] = useState("");
  const navigate = useNavigate();

  const handleGoToSignIn = () => {
    navigate("/signin");
  };

  const handleEmailChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setEmailValue(event.target.value);
  };

  const handlePasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setPasswordValue(event.target.value);
  };

  const handleNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setNameValue(event.target.value);
  };

  const headers = {
    "Content-Type": "application/json",
  };

  const signUpHandler = async () => {
    const reqBody = {
      email: emailValue,
      username: nameValue,
      password: passwordValue,
    };
    const response = await fetch("/api/users/signup", {
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
        throw e;
      });
    });
    if (response === "ok") {
      navigate("/signin");
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
        className="signupform"
        position={"relative"}
        margin={"0 auto"}
        height={"22rem"}
        width={"25rem"}
        sx={{
          backgroundColor: "#f5f5dc",
          textAlign: "center",
          paddingTop: "2.5rem",
          borderRadius: "1.5rem",
        }}
      >
        <h2 className="text">Sign Up</h2>
        <TextField
          id="email"
          size="small"
          label="email"
          onChange={handleEmailChange}
          variant="outlined"
          sx={{
            width: "75%",
            marginTop: "2.5rem",
            marginLeft: "1rem",
            marginRight: "1rem",
          }}
        />
        <TextField
          id="name"
          size="small"
          label="username"
          onChange={handleNameChange}
          variant="outlined"
          sx={{
            width: "75%",
            marginTop: "1rem",
            marginLeft: "1rem",
            marginRight: "1rem",
          }}
        />
        <TextField
          id="password"
          size="small"
          type="password"
          label="password"
          onChange={handlePasswordChange}
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
          onClick={signUpHandler}
          sx={{
            marginTop: "1rem",
            width: "75%",
            borderRadius: "1rem",
            marginBottom: "1rem",
          }}
        >
          Sign Up
        </Button>
        <h6 className="text">You have account?</h6>
        <Button
          variant="text"
          size="small"
          onClick={handleGoToSignIn}
          sx={{
            borderRadius: "1rem",
            marginTop: "0.2rem",
          }}
        >
          Sign In
        </Button>
      </Box>
    </Box>
  );
};

export default SignUp;
