import { configureStore } from '@reduxjs/toolkit'
import authslice from "./slice1";
import cartslicer from "./slice2";
export  const store = configureStore({
  reducer:{
    auth:authslice,
    cart:cartslicer,
  },
})