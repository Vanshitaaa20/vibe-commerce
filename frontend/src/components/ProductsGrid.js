import React from "react";

export default function ProductsGrid({ products, addToCart }) {
  return (
    <div className="grid">
      {products.map(p => (
        <div className="card" key={p._id}>
          <img src={p.image} alt={p.name} />
          <h3>{p.name}</h3>
          <p>₹{p.price}</p>
          <button onClick={() => addToCart(p)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}
