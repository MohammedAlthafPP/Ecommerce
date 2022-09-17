const mongoose  = require("mongoose");

const cartSchema = new mongoose.Schema({
    timeAndDate:{
        type:Date,
        default:Date.now,  
    },
    userEmail:String,
    product: {
        type: mongoose.Schema.ObjectId,
        ref : "Product",
        required:true,
    },
})



module.exports = mongoose.model("Cart",cartSchema);