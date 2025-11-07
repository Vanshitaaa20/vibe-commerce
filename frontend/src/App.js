import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductsGrid from "./components/ProductsGrid";
import Cart from "./components/Cart";
import CheckoutModal from "./components/CheckoutModal";
import "./App.css";

// Backend URL
const API = process.env.REACT_APP_API_BASE || "http://localhost:5000";

function App() {

  // Create UID once
  if (!localStorage.getItem("uid")) {
    localStorage.setItem("uid", crypto.randomUUID());
  }

  const uid = localStorage.getItem("uid");

  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [showCheckout, setShowCheckout] = useState(false);
  const [receipt, setReceipt] = useState(null);

  // Load products
  useEffect(() => {
    axios.get(`${API}/api/products`)
      .then(res => setProducts(res.data))
      .catch(() => alert("Failed to load products"));
  }, []);

  // Load cart
  const refreshCart = () => {
  const uid = localStorage.getItem("uid");
  axios.get(`${API}/api/cart?uid=${localStorage.getItem("uid")}`)
    .then(res => setCart(res.data))
    .catch(err => console.log("Cart error:", err.response.data));
};


  useEffect(() => {
    refreshCart();
  }, []);

 const addToCart = async (product) => {
  console.log("sending:", {
    productId: product._id,
    qty: 1,
    uid: localStorage.getItem("uid")
  });

  await axios.post(`${API}/api/cart`, {
    productId: product._id,
    qty: 1,
    uid: localStorage.getItem("uid")
  });
  refreshCart();
};


  const removeItem = (id) => {
    axios.delete(`${API}/api/cart/${id}`)
      .then(() => refreshCart());
  };

  const checkout = (name, email) => {
    axios.post(`${API}/api/checkout`, { cartItems: cart.items, name, email })
      .then(res => {
        setReceipt(res.data);
        setShowCheckout(false);
      });
  };

  return (
    <div className="container">
      <h1>Vibe Commerce Cart</h1>

      <ProductsGrid products={products} addToCart={addToCart} />

      <Cart
        items={cart.items}
        total={cart.total}
        removeItem={removeItem}
        openCheckout={() => setShowCheckout(true)}
      />

      {showCheckout && (
        <CheckoutModal
          close={() => setShowCheckout(false)}
          checkout={checkout}
        />
      )}

      {receipt && (
        <div className="receipt">
          <h3>Order Successful </h3>
          <p>Total: ₹{receipt.total}</p>
          <p>Time: {receipt.timestamp}</p>
        </div>
      )}
    </div>
  );
}

export default App;
