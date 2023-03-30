import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  redirect,
  Route,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import "./index.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { UserProvider } from "./context/userContext";
import Register from "./pages/Register";
import NewTask from "./pages/NewTask";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";

const PrivateRouteLoggin = ({ children }) => {
  const navigate = useNavigate();
  useEffect(() => {
   
  }, [navigate]);

  return  children
}

export default PrivateRouteLoggin