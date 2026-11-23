
import { Routes, Route } from "react-router-dom";

import Nav from "./components/Layout/Nav";
import Footer from "./components/Layout/Footer";
import Main from "./components/Layout/Main";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Login from "./pages/Login";
import MyAccount from "./pages/MyAccount";
import Register from "./pages/Register";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import OrderHistory from "./pages/OrderHistory";

function App() {
  return (
    <>
      <Nav />

      <Main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/account" element={<MyAccount />} />
          <Route path="/register" element={<Register />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/orders" element={<OrderHistory />} />
        </Routes>
      </Main>

      <Footer />
    </>
  );
}

export default App;

