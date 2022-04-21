import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSearch = createAsyncThunk(
  "search/fetchSearchStatus",
  async (search, thunkAPI) => {
    const response = await axios
      .get(
        `https://api.giphy.com/v1/gifs/search?api_key=ulCltMjjtwcC2x3VJ4ryDROs0PeKEBFn&limit=5&q=${search}`
      )
      .catch((err) => {
        console.log(err);
      });
    const json = await response.data;
    return json;
  }
);

export const someSlice = createSlice({
  name: "search",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    startSearch: (state) => {
      state.isLoading = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSearch.fulfilled, (state, action) => {
      state.data = action.payload;
      console.log(state.data);
    });
  },
});

export default someSlice.reducer;
