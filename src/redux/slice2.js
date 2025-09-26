import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [], // will store { name, image, basePrice, description }
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // payload = { name, image, basePrice, description }
      state.cartItems.push(action.payload);
    },
    removeFromCart: (state, action) => {
      // payload = index or id (here I'll use index)
      state.cartItems = state.cartItems.filter(
        (_, index) => index !== action.payload
      );
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
