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
import Cart from "./pages/Cart";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="product-details" element={<ProductDetails />} />
          <Route path="contactus" element={<ContactUs />} />
          <Route path="aboutus" element={<AboutUs />} />
          <Route path="cart" element={<Cart />} />
        </Route>
        <Route path="/signin" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotfountPage />} />
      </Routes>
    </Router>
  );
}

export default App;
