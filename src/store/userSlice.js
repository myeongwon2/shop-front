import { createSlice } from "@reduxjs/toolkit";

export const user = createSlice({
  name: "user",
  initialState: { email: "admin" },
  reducers: {
    setUserData(state, action) {
      return (state = action.payload);
    },
    logout() {
      return { email: "admin" };
    },
  },
});
export const { setUserData, logout } = user.actions;

export const search = createSlice({
  name: "search",
  initialState: [],
  reducers: {
    getData(state, action) {
      return (state = action.payload);
    },
  },
});

export const { getData } = search.actions;
