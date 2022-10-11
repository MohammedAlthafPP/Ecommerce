const ErrorHander = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Wishlist = require("../models/wishlistModel");

exports.createWishlist = catchAsyncErrors(async (req, res, next) => {
  //productId = req.params.id  ,

  const isWishlist = await Wishlist.findOne({ userEmail: req.user.email });
  if (isWishlist) {
    let isProductExist = await Wishlist.findOne({
      userEmail: req.user.email,
      "products.product": req.params.id,
    });
    if (isProductExist) {
      res.status(201).json({
        success: true,
        message: "Product Already Exist",
      });
    } else {
      await Wishlist.findOneAndUpdate(
        { userEmail: req.user.email },
        {
          $push: {
            products: {
              product: req.params.id,
            },
          },
        }
      );

      res.status(201).json({
        success: true,
        message: "Product Added to Wishlist",
      });
    }
  } else {
    let wishlistData = await new Wishlist({
      products: {
        product: req.params.id,
      },

      userEmail: req.user.email,
    });
    await wishlistData.save({ validateBeforeSave: false });

    res.status(201).json({
      success: true,
      message: "Product Added to Wishlist",
    });
  }
});

// Get Wishlist Items
exports.getUserWishlistItems = catchAsyncErrors(async (req, res, next) => {
  const wishlists = await Wishlist.findOne({
    userEmail: req.user.email,
  }).populate("products.product");

  if (!wishlists) {
    return next(new ErrorHander("Wishlist not found", 404));
  }
  const wishlistItems = wishlists.products.map((product)=>product.product)
  res.status(201).json({
    success: true,
    wishlistItems,
  });
});

// Remove Wishlist Item
exports.deleteWishlistItem = catchAsyncErrors(async (req, res, next) => {
  // req.params.id
  let product = await Wishlist.findOne({
    userEmail: req.user.email,
    "products.product": req.params.id,
  });

  if (!product) {
    return next(new ErrorHander("Item not found with this Id", 404));
  }

  await Wishlist.findOneAndUpdate(
    { userEmail: req.user.email },
    { $pull: { products: { product: req.params.id } } }
  );

  res.status(201).json({
    success: true,
    message: "Product removed Successfully",
  });
});
