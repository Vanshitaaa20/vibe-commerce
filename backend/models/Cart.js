const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  qty: Number
});

module.exports = mongoose.model('Cart', CartSchema);
