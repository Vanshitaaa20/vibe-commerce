const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const axios = require("axios");
const Product = require("./models/Product");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
async function loadProducts() {
  const count = await Product.countDocuments();

  if (count === 0) {
    const res = await axios.get("https://fakestoreapi.com/products?limit=8");
    const items = res.data.map(p => ({
      name: p.title,
      price: p.price,
      image: p.image
    }));
    await Product.insertMany(items);
    console.log("Products loaded from FakeStore ");
  }
}

loadProducts();
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log(" MongoDB Connected"))
  .catch(err => console.error(" DB Error", err));

app.use("/api/products", require("./routes/products"));
app.use("/api/cart", require("./routes/cart"));
app.use("/api/checkout", require("./routes/checkout"));

app.listen(process.env.PORT, () =>
  console.log(` Server running on port ${process.env.PORT}`)
);
app.use((err, req, res, next) => {
  console.error("SERVER ERROR:", err.message);
  res.status(500).json({ success: false, error: "Internal Server Error" });
});
