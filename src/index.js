import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCBhgOAQf8u-ZwO7RXSYPiMAl7vsR-gzWI",
//   authDomain: "food-order-app-d2989.firebaseapp.com",
//   projectId: "food-order-app-d2989",
//   storageBucket: "food-order-app-d2989.appspot.com",
//   messagingSenderId: "764692383750",
//   appId: "1:764692383750:web:d2a1a7fdeb42cd46295b87"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
