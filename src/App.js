import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Layout from "./pages/Layout";
import ProductDetails from "./pages/ProductDetails";
import Home from "./pages/Home";
import NotfountPage from "./pages/NotfountPage";
import ContactUs from "./pages/ContactUs";
import AboutUs from "./pages/AboutUs";

import WishList from "./pages/WishList";

import Cart from "./pages/Cart";

import ConfirmEmail from "./pages/ConfirmEmail";

import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

import Shop from "./pages/shop";
import HeroSection from "./components/workshop/HeroSection";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="product-details/:id" element={<ProductDetails />} />
          <Route path="shop" element={<Shop />} />
          <Route path="contactus" element={<ContactUs />} />
          <Route path="aboutus" element={<AboutUs />} />
          <Route path="wishlist" element={<WishList />} />
          <Route path="workshop" element={<HeroSection />} />

          <Route path="cart" element={<Cart />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/confirmemail" element={<ConfirmEmail />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotfountPage />} />
      </Routes>
    </Router>
  );
}

export default App;
