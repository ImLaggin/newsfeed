import React, { useState, useEffect } from "react";
import { Button, Container, TextField, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/login";
import { useDispatch, useSelector } from "react-redux";
var SHA256 = require("crypto-js/sha256");
var MD5 = require("crypto-js/md5");
var AES = require("crypto-js/aes");

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const loginError = useSelector((state) => state.login.error);
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  // console.log(MD5("admin"));
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/home");
    }
  }, [isLoggedIn]);

  const handleSubmit = () => {
    const hashPassword = SHA256(password).toString();
    const hashUsername = SHA256(username).toString();
    dispatch(
      login({
        username: hashUsername,
        password: hashPassword,
      })
    );
  };
  return (
    <Container maxWidth='md' sx={{ py: 10 }}>
      <Stack spacing={3}>
        <h1>Login</h1>
        <TextField
          label='Username'
          variant='outlined'
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label='Password'
          variant='outlined'
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant='contained'
          color='primary'
          fullWidth
          onClick={() => {
            handleSubmit();
          }}
        >
          Login
        </Button>
        {loginError && <div>{loginError}</div>}
      </Stack>
    </Container>
  );
};

export default Login;
