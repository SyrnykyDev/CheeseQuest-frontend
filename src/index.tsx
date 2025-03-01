import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import React, { StrictMode } from "react";
import Routes from "./router/routes.tsx";
import { store } from "./store/store.ts";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  // <GoogleOAuthProvider>.
  <StrictMode>
    {/*---REDUX---*/}
    <Provider store={store}>
      {/*--- REACT ROUTER ---*/}
      <Routes />
    </Provider>
  </StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
