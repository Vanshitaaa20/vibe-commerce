const router = require("express").Router();

router.post("/", (req, res) => {
  const { cartItems } = req.body;
  const total = cartItems.reduce(
    (sum, item) => sum + item.productId.price * item.qty,
    0
  );
  res.json({
    total,
    timestamp: new Date().toISOString(),
    status: "Success"
  });
});

module.exports = router;
