import { useDispatch, useSelector } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useEffect } from "react";
// import { uiActions } from "./store/uiSlice";
import Notification from "./components/UI/Notification";
import { fetchCartData, sendCartData } from "./store/cartActions";

// let isInitial = true; (ALTERNATIVE BELOW => isChanged property of cart state)

function App() {
    const showCart = useSelector((state) => state.ui.showCart);
    const cart = useSelector((state) => state.cart);
    const notification = useSelector((state) => state.ui.notification);
    const dispatch = useDispatch();

    useEffect(() => {
        // fetching cart data and setting it to state only once on loading
        dispatch(fetchCartData());
    }, [dispatch]);

    useEffect(() => {
        // const sendCartData = async () => {
        //     dispatch(
        //         uiActions.showNotification({
        //             status: "pending",
        //             title: "Sending...",
        //             message: "Sending cart data",
        //         })
        //     );

        //     const response = await fetch(
        //         "https://food-order-app-d2989-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json",
        //         {
        //             method: "PUT",
        //             body: JSON.stringify(cart),
        //         }
        //     );

        //     if (!response.ok) throw new Error("Sending cart data failed");

        //     dispatch(
        //         uiActions.showNotification({
        //             status: "success",
        //             title: "Success!!",
        //             message: "Sent cart data successfully",
        //         })
        //     );
        // };

        // overwrite the state to the backend only on subsequent renders (not on 1st render) bcz on overwriting on loading (rendering 1st time) the existind data in backend will be overwrite by newly initialised empty state (ALTERNATIVE BELOW => isChanged property of cart state)
        // if (isInitial) {
        //     isInitial = false;
        //     return;
        // }

        // sendCartData().catch((error) => {
        //     dispatch(
        //         uiActions.showNotification({
        //             status: "error",
        //             title: "Error!!",
        //             message: "Sending cart data failed",
        //         })
        //     );
        // });

        // sendCartData() runs after re rendering the App with new state containing fetched data (cart change) so to prevent sendCartData() from running by state change due to fetching on loading we maintain isChanged property in cart state... and make it true only when local operations (addItem, removeItem) made on cart otherwise keep it false initially or on replaceCart (which execute on fetching)
        if (cart.isChanged) dispatch(sendCartData(cart)); // sendCartData is a custom action creater which return a func instead of action oject on dispatching a func redux will execute that returned func. 
    }, [cart, dispatch]);

    return (
        <>
            {notification && (
                <Notification
                    status={notification.status}
                    title={notification.title}
                    message={notification.message}
                />
            )}

            <Layout>
                {showCart && <Cart />}
                <Products />
            </Layout>
        </>
    );
}

export default App;
