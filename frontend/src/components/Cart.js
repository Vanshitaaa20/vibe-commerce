import React from "react";

export default function Cart({ items, total, removeItem, openCheckout }) {
  return (
    <div className="cart">
      <h2>Cart</h2>

      {items.length === 0 && <p>No items in cart</p>}

      {items.map(item => (
        <div className="cart-row" key={item._id}>
          <span>{item.productId.name}</span>
          <span>Qty: {item.qty}</span>
          <span>₹{item.productId.price * item.qty}</span>
          <button onClick={() => removeItem(item._id)}>Remove</button>
        </div>
      ))}

      <h3>Total: ₹{total}</h3>

      {items.length > 0 && (
        <button className="checkout-btn" onClick={openCheckout}>
          Checkout
        </button>
      )}
    </div>
  );
}
