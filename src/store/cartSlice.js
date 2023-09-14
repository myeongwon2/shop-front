import { createSlice } from "@reduxjs/toolkit";

const cart = createSlice({
  name: "cart",
  initialState: [
    { id: 0, name: "White and Black", count: 2 },
    { id: 2, name: "Grey Yordan", count: 1 },
  ],
  reducers: {
    increase(state, action) {
      const id = state.findIndex((i) => {
        return i.id === action.payload;
      });
      state[id].count += 1;
    },
    decrease(state, action) {
      return state.filter((i) => {
        return i.id !== action.payload;
      });
    },
    addItem(state, action) {
      const id = state.findIndex((i) => {
        return i.id === action.payload.id;
      });
      console.log(id);
      if (id === -1) {
        state.push(action.payload);
      } else {
        alert("중복");
      }
    },
  },
});

export const { increase, decrease, addItem } = cart.actions;

export default cart;
