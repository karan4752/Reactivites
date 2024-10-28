import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./app/layout/App";
import "semantic-ui-css/semantic.min.css";
import "react-calendar/dist/Calendar.css";
import "./app/layout/styles.css";
import { store, StoreContext } from "./app/stores/Store";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/router/Routers";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StoreContext.Provider value={store}>
      <RouterProvider router={router} />
      {/* <App /> */}
    </StoreContext.Provider>
  </React.StrictMode>
);
