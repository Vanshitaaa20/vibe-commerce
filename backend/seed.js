const mongoose = require("mongoose");
const axios = require("axios");
require("dotenv").config();
const Product = require("./models/Product");

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB");

    console.log("Fetching products from Fake Store API...");
    const { data } = await axios.get("https://fakestoreapi.com/products");

    const formatted = data.slice(0, 10).map(item => ({
      name: item.title,
      price: item.price,
      image: item.image
    }));

    await Product.deleteMany();
    await Product.insertMany(formatted);

    console.log(" Seeded with Fake Store products!");
    process.exit();
  } catch (err) {
    console.error(" Error:", err);
    process.exit(1);
  }
})();
