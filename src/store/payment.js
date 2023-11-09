import { createSlice } from "@reduxjs/toolkit";

const payment = createSlice({
  name: "payment",
  initialState: "kcp",
  reducers: {
    changePay(state, action) {
      return (state = action.payload);
    },
  },
});

export const { changePay } = payment.actions;

export default payment;
