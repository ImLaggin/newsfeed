import { configureStore } from "@reduxjs/toolkit";
import trend from "./trend";
import feed from "./feed";
import search from "./search";
import login from "./login";

export const store = configureStore({
  reducer: {
    trend: trend,
    search: search,
    feed: feed,
    login: login,
  },
});
