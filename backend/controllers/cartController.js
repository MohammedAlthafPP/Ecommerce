const ErrorHander = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Cart = require("../models/cartModel");
const User = require("../models/userModel");
const Product = require("../models/productModels");

// Create Cart
exports.addToCart = catchAsyncErrors(async (req, res, next) => {
  const isCartExist = await Cart.findOne({ userEmail: req.user.email });

  if (isCartExist) {
    const product = req.body.cartItems.product;

    let isProductExist = await Cart.findOne({
      user: req.user._id,
      "cartItems.product": product,
    });

    if (isProductExist) {
      await Cart.updateOne(
        { user: req.user._id, "cartItems.product": product },
        {
          $set: {
            "cartItems.$.quantity": req.body.cartItems.quantity,
            "cartItems.$.price": req.body.cartItems.price,
          },
        }
      );

      const cart = await Cart.find({ user: req.user.id }).populate({
        path: "user",
        select: "name email -_id",
      });

      if (!cart) {
        return next(new ErrorHander("Cart is Empty", 404));
      }

      let newArray = cart.map((item) => item.cartItems);
      let cartItems = newArray[0].map((item) => item);

      res.status(201).json({
        success: true,
        message: "Already Exist adding quantity",
        cartItems,
      });
    } else {
      await Cart.updateOne(
        { user: req.user._id },
        { $push: { cartItems: req.body.cartItems } }
      );

      const cart = await Cart.find({ user: req.user.id }).populate({
        path: "user",
        select: "name email -_id",
      });

      if (!cart) {
        return next(new ErrorHander("Cart is Empty", 404));
      }
      let newArray = cart.map((item) => item.cartItems);
      let cartItems = newArray[0].map((item) => item);

      res.status(201).json({
        success: true,
        message: "product Added to cart",
        cartItems,
      });
    }
  } else {
    const items = new Cart({
      userEmail: req.user.email,
      user: req.user._id,
      cartItems: req.body.cartItems,
    });

    const carts = await Cart.create(items);

    const cart = await Cart.find({ user: req.user.id }).populate({
      path: "user",
      select: "name email -_id",
    });

    if (!cart) {
      return next(new ErrorHander("Cart is Empty", 404));
    }

    let newArray = cart.map((item) => item.cartItems);
    let cartItems = newArray[0].map((item) => item);

    res.status(201).json({
      success: true,
      message: "product Added to cart",
      cartItems,
    });
  }
});

//GET All cart Items of an User
exports.usersCartItems = catchAsyncErrors(async (req, res, next) => {
  const cart = await Cart.find({ user: req.user.id }).populate({
    path: "user",
    select: "name email -_id",
  });
  
  let newArray = cart.map((item) => item.cartItems);
  let Items = newArray[0].map((item) => item);

  let cartItems = cart === undefined ? [] : Items;
  // console.log(cart,"=================================== cart");
  // console.log(cartItems,"===================================");
  // console.log(cartItems,"================ newCart");

  if (!cart) {
    return next(new ErrorHander("Cart is Empty", 404));
  }
  if (!cartItems) {
    return next(new ErrorHander("Cart is Empty", 404));
  }

  res.status(200).json({
    success: true,
    cartItems,
  });
});

//Remove Cart items
exports.removeCartItem = catchAsyncErrors(async (req, res, next) => {
  const cart = await Cart.findOne({ user: req.user._id });

  const itemExist = cart.cartItems.find(
    (i) => i.product.toString() === req.params.id
  );

  if (!itemExist) {
    return next(new ErrorHander("Item not found with this Id", 404));
  }

  await Cart.findOneAndUpdate(
    { user: req.user._id },
    { $pull: { cartItems: { product: req.params.id } } }
  );

  res.status(200).json({
    success: true,
    message: `Cart item is Deleted Successfully`,
  });
});


// Add Shipping Details
exports.addShippingDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.user.email });
  if(user.shippingInfo.length === 0){
    
    await User.updateOne(
      { _id: req.user._id },
      { $set: { shippingInfo: req.body.shippingData} }
    );


    const user = await User.findOne({ email: req.user.email });
    if (!user) {
      return next(new ErrorHander("User Not Exist", 404));
    }
    let shippingInfo = user.shippingInfo.map((item)=> item )
    res.status(200).json({
      success : true,
      message : "Shipping Details added",
      shippingInfo
    })

    

  } else {
    await User.updateOne(
      { _id: req.user._id },
      { $push: { shippingInfo: req.body.shippingData } }
    );

    const user = await User.findOne({ email: req.user.email });
    if (!user) {
      return next(new ErrorHander("User Not Exist", 404));
    }
    let shippingInfo = user.shippingInfo.map((item)=> item )
    res.status(200).json({
      success : true,
      message : "New Shipping Details Added",
      shippingInfo
    })

  }
  
})

//Remove shipping Deatails
exports.removeShippingAddress = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ _id: req.user._id });

  const itemExist = user.shippingInfo.find(
    (i) => i._id.toString() == req.params.id
  );

  if (!itemExist) {
    return next(new ErrorHander("Item not found with this Id", 404));
  }

  await User.findOneAndUpdate(
    { _id: req.user._id },
    { $pull: { shippingInfo: { _id: req.params.id } } }
  );

  res.status(200).json({
    success: true,
    message: `Shipping Address is Deleted Successfully`,
  });
});

//Get Shipping Item 
exports.getShippingInfo = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.user.email });
    if (!user) {
      return next(new ErrorHander("User Not Exist", 404));
    }
    let shippingInfo = user.shippingInfo.map((item)=> item )
    res.status(200).json({
      success : true,
      shippingInfo
    })

})