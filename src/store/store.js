import { configureStore, createSlice } from "@reduxjs/toolkit";
import cart from "./cartSlice";

//useState랑 비슷
const user = createSlice({
  name: "user",
  initialState: "kim",
  reducers: {
    changeName(state) {
      return state + " min";
    },
  },
});

export const { changeName } = user.actions;

const loading = createSlice({
  name: "loading",
  initialState: true,
  reducers: {
    changeLoading(state) {
      return false;
    },
  },
});

export const { changeLoading } = loading.actions;

export default configureStore({
  reducer: {
    user: user.reducer,
    cart: cart.reducer,
    loading: loading.reducer,
  },
});
