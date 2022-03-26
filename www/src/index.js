import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import store from "./Redux/redux-store";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import "react-app-polyfill/ie9";
import "raf/polyfill";

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App state={store.getState()} />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
