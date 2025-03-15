import React from "react";
import ReactDOM from "react-dom/client"; // <-- Correct import
import { Provider } from "react-redux";
import { store } from "./store";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root")); // <-- Correct usage
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
