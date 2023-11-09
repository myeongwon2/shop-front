import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  origin: [],
  user_init: [],
};

const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    cartTrue(state, action) {
      state.user_init = state.origin.filter(
        (item) => item.email === action.payload
      );
    },
    buyNow(state, action) {
      state.user_init = [
        {
          ...action.payload.data,
          count: 1,
          check: true,
          email: action.payload.user.email,
        },
      ];
    },
    addItem(state, action) {
      const item = state.user_init.findIndex((i) => {
        return i.id === action.payload.data.id;
      });
      if (item === -1) {
        state.origin.push({
          ...action.payload.data,
          count: 1,
          check: false,
          email: action.payload.user ? action.payload.user.email : "admin",
        });
      } else {
        alert("중복");
      }
    },
    increase: (state, action) => {
      const item = state.user_init.find((item) => item.id === action.payload);
      if (item) {
        item.count++;
      }
    },
    decrease(state, action) {
      const item = state.user_init.find((item) => item.id === action.payload);
      if (item.count === 1) {
        alert("최소 1개 이상 주문 하셔야 합니다");
      } else {
        item.count--;
      }
    },
    itemCheck(state, action) {
      if (action.payload.type === "주문") {
        const item = state.user_init.find(
          (item) => item.id === action.payload.id
        );
        item.check = true;
      } else {
        const item = state.user_init.find(
          (item) => item.id === action.payload.id
        );
        if (item) {
          item.check = !item.check;
        }
      }
    },
    allCheck(state) {
      const allAreChecked = state.user_init.every((item) => item.check);
      // 만약 모든 아이템이 이미 true라면, 모두 false로 바꿉니다.
      if (allAreChecked) {
        state.origin = state.origin.map((item) => ({
          ...item,
          check: false,
        }));
      } else {
        // 그렇지 않으면 모두 true로 바꿉니다.
        state.origin = state.origin.map((item) => ({
          ...item,
          check: true,
        }));
      }
    },
    remove(state) {
      state.origin = state.origin.filter((item) => item.check !== true);
    },
  },
});

export const {
  cartTrue,
  increase,
  decrease,
  addItem,
  remove,
  itemCheck,
  allCheck,
  buyNow,
} = cart.actions;

export default cart;
