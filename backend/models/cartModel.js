const mongoose  = require("mongoose");

const cartSchema = new mongoose.Schema({
    timeAndDate:{
        type:Date,
        default:Date.now,  
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref : "user",
        
    },
    userEmail : String,
    cartItems : 
    [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref : "Product",
                required:true,
            },
            quantity:{
                type:Number,
                default: 1
            },
            price : {
                type:Number,
                required: true,

            },
            subtotal : {
                type:Number,
                default: function() {
                    return parseInt(this.price * this.quantity)
                }
            },
            name: String,
            image: String,
            stock :{
                type : Number,
                required: true,
            }
        }

    ]
    
},{timestamps:true})



module.exports = mongoose.model("Cart",cartSchema);