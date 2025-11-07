const router = require("express").Router();
const Product = require("../models/Product");

// GET ALL PRODUCTS
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();

    if (!products || products.length === 0) {
      return res.status(404).json({ error: "No products found" });
    }

    res.json(products);

  } catch (err) {
    console.error("Product fetch error:", err); // LOG IT, don’t hide it
    res.status(500).json({ error: "Server failed to fetch products" });
  }
});

module.exports = router;
