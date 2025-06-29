import { createRoot } from "react-dom/client";
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import "./index.css";

import App from "./App.jsx";
import Layout from "./Layout.jsx";
import CartPage from "./components/CartPage.jsx";
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";
import AuthProvider from "./context/AuthContext.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<App></App>} />
      <Route path="cart" element={<CartPage />} />
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
    </Route>
  )
);
createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <CartProvider>
      <RouterProvider router={router}></RouterProvider>
    </CartProvider>
  </AuthProvider>
);
