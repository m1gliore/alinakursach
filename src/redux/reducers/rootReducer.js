import {combineReducers} from "@reduxjs/toolkit";
import cartSlice from "./cartReducer";

export default combineReducers({
    cart: cartSlice.reducer
})