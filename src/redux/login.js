import { createSlice } from "@reduxjs/toolkit";
import { AES } from "crypto-js";
var SHA256 = require("crypto-js/sha256");

const initialState = {
  isLoggedIn: false,
  user: {},
  error: null,
  isLoading: false,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    login: (state, action) => {
      console.log(action.payload);
      if (
        action.payload.username === SHA256("admin").toString() &&
        action.payload.password === SHA256("admin").toString()
      ) {
        state.isLoggedIn = true;
        state.user = action.payload;
        state.error = null;
      } else {
        state.isLoggedIn = false;
        state.user = {};
        state.error = "Invalid username or password";
      }
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = {};
    },
  },
});

export const { login, logout } = loginSlice.actions;

export default loginSlice.reducer;
