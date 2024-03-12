import { createSlice } from "@reduxjs/toolkit";

const initialCartState = {
    cartItems: [],
    totalQuantity: 0,
    totalAmount: 0,
    isChanged:false
};

const cartSlice = createSlice({
    name: "cart",
    initialState: initialCartState,
    reducers: {
        replaceCart(state, action) {
            state.cartItems = action.payload.cartItems ?? [];
            state.totalQuantity = action.payload.totalQuantity;
            state.totalAmount = action.payload.totalAmount;
        },
        addItem(state, action) {
            const newItem = action.payload;

            const existingItem = state.cartItems.find(
                (item) => item.id === newItem.id
            );

            if (!existingItem) {
                state.cartItems.push({
                    ...newItem,
                    quantity: 1,
                    total: newItem.price,
                });
            } else {
                existingItem.quantity += 1;
                existingItem.total += existingItem.price;
            }

            state.totalQuantity += 1;
            state.totalAmount += newItem.price;
            state.isChanged=true;
        },
        removeItem(state, action) {
            const itemIdx = state.cartItems.findIndex(
                (item) => item.id === action.payload
            );

            const existingItem = state.cartItems[itemIdx];

            if (existingItem.quantity === 1) {
                state.cartItems.splice(itemIdx, 1);
            } else {
                existingItem.quantity -= 1;
                existingItem.total -= existingItem.price;
            }

            state.totalQuantity -= 1;
            state.totalAmount -= existingItem.price;
            state.isChanged=true;
        },
    },
});

export default cartSlice.reducer;
export const cartActions = cartSlice.actions;
