import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  origin: [],
  user_init: [],
};

const favor = createSlice({
  name: "favor",
  initialState,
  reducers: {
    favorAdd(state, action) {
      const item = state.user_init.findIndex((i) => {
        return i.id === action.payload.data.id;
      });
      if (item === -1) {
        state.origin.push({
          ...action.payload.data,
          email: action.payload.user.email,
        });
      } else {
        state.origin = state.origin.filter(
          (item) => item.id !== action.payload.data.id
        );
      }
    },
    favorCheck(state, action) {
      state.user_init = state.origin.filter(
        (item) => item.email === action.payload
      );
    },
  },
});

export const { favorAdd, favorCheck } = favor.actions;

export default favor;
