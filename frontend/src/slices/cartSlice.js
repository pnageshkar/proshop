import { createSlice } from '@reduxjs/toolkit';
import { updateCart } from '../utils/cartUtils';

const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : { cartItems:[] , shippingAddress:{}, paymentMethod: 'Paypal' };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((itm) => itm._id === item._id);
      if (existItem) {
        // update the quantity of the existing item in the cart
        state.cartItems = state.cartItems.map((itm) =>
          itm._id === existItem._id ? item : itm
        );
      } else {
        // add the new item to the cart
        state.cartItems = [...state.cartItems, item];
      }
      return updateCart(state,item);
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (itm) => itm._id !== action.payload
      );
      return updateCart(state);
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      localStorage.setItem('cart', JSON.stringify(state));
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      localStorage.setItem('cart', JSON.stringify(state));
    },
    clearCartItems: (state, action) => {
      state.cartItems = [];
      localStorage.setItem('cart', JSON.stringify(state));
    },
    // NOTE: here we need to reset state for when a user logs out so the next
    // user doesn't inherit the previous users cart and shipping
    resetCart: (state) => (state = initialState),
  },
});

export const { addToCart, removeFromCart,saveShippingAddress,savePaymentMethod,clearCartItems } = cartSlice.actions;

export default cartSlice.reducer;
