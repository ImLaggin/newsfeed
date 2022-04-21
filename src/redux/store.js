import { configureStore } from "@reduxjs/toolkit";
import trend from "./trend";
import feed from "./feed";
import search from "./search";
export const store = configureStore({
  reducer: {
    trend: trend,
    search: search,
    feed: feed,
  },
});
