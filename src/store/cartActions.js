import { cartActions } from "./cartSlice";
import { uiActions } from "./uiSlice";

export const sendCartData = (cart) => {
    return async (dispatch) => {
        dispatch(
            uiActions.showNotification({
                status: "pending",
                title: "Sending...",
                message: "Sending cart data",
            })
        );

        try {
            const response = await fetch(
                "https://food-order-app-d2989-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json",
                {
                    method: "PUT",
                    body: JSON.stringify({
                        cartItems: cart.cartItems,
                        totalQuantity: cart.totalQuantity,
                        totalAmount: cart.totalAmount,
                    }),
                }
            );

            if (!response.ok) throw new Error("Sending cart data failed");

            dispatch(
                uiActions.showNotification({
                    status: "success",
                    title: "Success!!",
                    message: "Sent cart data successfully",
                })
            );
        } catch (error) {
            dispatch(
                uiActions.showNotification({
                    status: "error",
                    title: "Error!!",
                    message: "Sending cart data failed",
                })
            );
        }
    };
};

export const fetchCartData = () => {
    return async (dispatch) => {
        try {
            const response = await fetch(
                "https://food-order-app-d2989-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json"
            );

            const resData = await response.json();

            if (!response.ok) throw new Error("Fetching cart data failed");

            dispatch(cartActions.replaceCart(resData));
        } catch (error) {
            dispatch(
                uiActions.showNotification({
                    status: "error",
                    title: "Error!!",
                    message: "Fetching cart data failed",
                })
            );
        }
    };
};
