import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetch = createAsyncThunk("some/fetchStatus", async (thunkAPI) => {
  const response = await axios
    .get(
      "https://api.giphy.com/v1/gifs/trending?api_key=ulCltMjjtwcC2x3VJ4ryDROs0PeKEBFn&limit=5"
    )
    .catch((err) => {
      console.log(err);
    });
  const json = await response.data;
  console.log(response.data);
  return json;
});

export const trendSlice = createSlice({
  name: "some",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetch.fulfilled, (state, action) => {
      state = action.payload;
    });
  },
});

export default trendSlice.reducer;
