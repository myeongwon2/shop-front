import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cart from "./cartSlice";
import { user, search } from "./userSlice";
import loading from "./loadingSlice";
import favor from "./favorSlice";
import payment from "./payment";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";

const reducers = combineReducers({
  user: user.reducer,
  search: search.reducer,
  cart: cart.reducer,
  favor: favor.reducer,
  payment: payment.reducer,
  loading: loading.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart", "user", "favor"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
