import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

const initialState = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : {cartItems: []};



const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state,action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((itm) => itm._id === item._id);
      if (existItem) {
        // update the quantity of the existing item in the cart
        state.cartItems = state.cartItems.map((itm) => itm._id === existItem._id ? item : itm);
      }  else {
        // add the new item to the cart
        state.cartItems = [...state.cartItems, item];
      }
      return updateCart(state);
    },
    removeFromCart: (state,action) => {
      state.cartItems = state.cartItems.filter((itm) => itm._id !== action.payload)
      return updateCart(state);
    },
  },
});

export const {addToCart,removeFromCart} = cartSlice.actions;

export default cartSlice.reducer;