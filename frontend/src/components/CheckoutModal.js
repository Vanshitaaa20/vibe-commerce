import React, { useState } from "react";

export default function CheckoutModal({ checkout, close }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const submit = () => {
    if (!name || !email) return alert("Fill all fields");
    checkout(name, email);
  };

  return (
    <div className="modal">
      <div className="modal-box">
        <h2>Checkout</h2>
        <input
          placeholder="Your Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          placeholder="Your Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <button onClick={submit}>Confirm Order</button>
        <button onClick={close}>Cancel</button>
      </div>
    </div>
  );
}
