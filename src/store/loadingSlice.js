import { createSlice } from "@reduxjs/toolkit";

const loading = createSlice({
  name: "loading",
  initialState: true,
  reducers: {
    falseLoading() {
      return false;
    },
    trueLoading() {
      return true;
    },
  },
});

export const { falseLoading, trueLoading } = loading.actions;

export default loading;
