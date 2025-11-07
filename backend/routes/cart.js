const router = require("express").Router();
const CartItem = require("../models/CartItem");

// GET CART ITEMS
router.get("/", async (req, res, next) => {
  try {
    const uid = req.query.uid;
    if (!uid) {
      return res.status(400).json({ success: false, error: "UID required" });
    }

    const items = await CartItem.find({ uid }).populate("productId");

    // Avoid crashing if product is missing
    const valid = items.filter(i => i.productId);

    const total = valid.reduce(
      (sum, item) => sum + item.productId.price * item.qty,
      0
    );

    res.json({ success: true, items: valid, total });

  } catch (err) {
    next(err); // Pass to global error handler
  }
});

// ADD ITEM TO CART
router.post("/", async (req, res, next) => {
  try {
    const { productId, qty, uid } = req.body;

    if (!productId || !qty || !uid) {
      return res.status(400).json({ success: false, error: "Missing productId/qty/uid" });
    }

    const item = await CartItem.create({ productId, qty, uid });

    res.json({ success: true, item });

  } catch (err) {
    next(err);
  }
});

// DELETE CART ITEM
router.delete("/:id", async (req, res, next) => {
  try {
    const deleted = await CartItem.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ success: false, error: "Item not found" });
    }

    res.json({ success: true, message: "Deleted" });

  } catch (err) {
    next(err);
  }
});

module.exports = router;
