import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,

  RouterProvider,

} from "react-router-dom";
import "./index.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { UserProvider } from "./context/userContext";
import Register from "./pages/Register";
import NewTask from "./pages/NewTask";

import PrivateRouteLoggin from "./PrivateRoute";




const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    index: true
  },

  {
    path: "/Register",
    element: <Register />,

  },
  {
    path: "/home",
    element: <PrivateRouteLoggin>
      <Home />,
    </PrivateRouteLoggin>

  },
  {
    path: "/NewTask",

    element:

      <PrivateRouteLoggin>
        <NewTask />
      </PrivateRouteLoggin>





  },


]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>

    <UserProvider>

      <RouterProvider router={router} />
    </UserProvider>

  </React.StrictMode>
);