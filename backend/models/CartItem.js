const mongoose = require("mongoose");

const CartItemSchema = new mongoose.Schema({
  uid: String,
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  qty: Number,
});

module.exports = mongoose.model("CartItem", CartItemSchema);
