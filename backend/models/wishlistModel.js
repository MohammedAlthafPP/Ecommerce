const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
  timeAndDate: {
    type: Date,
    default: Date.now,
  },
  userEmail: String,

  products: [
    {
      product: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
      },
    },
  ],
});

module.exports = mongoose.model("Wishlist", wishlistSchema);
