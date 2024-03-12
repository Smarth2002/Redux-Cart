import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import uiSliceReducer from "./uiSlice";

const store=configureStore({
    reducer: {
        cart: cartReducer,
        ui: uiSliceReducer
    }
})

export default store;