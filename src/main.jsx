import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { UserProvider } from "./context/userContext";
import Register from "./pages/Register";
import NewTask from "./pages/NewTask";
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
    element: <Home />,

  },
  {
    path: "/NewTask",
    element: <NewTask />,

  },


]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>

      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>
);