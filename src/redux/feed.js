import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: {
    isLoading: false,
    error: null,
    data: [],
  },
  reducers: {
    fetchFeedStart: (state) => {
      state.isLoading = true;
    },
    feedAdded: (state, action) => {
      state.data.push(action.payload);
    },
    feedDeleted: (state, action) => {
      state.data = state.data.filter((item) => item.id !== action.payload);
    },
  },
});

export const { fetchFeedStart, feedAdded, feedDeleted } = feedSlice.actions;
export default feedSlice.reducer;
