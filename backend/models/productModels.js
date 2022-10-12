const mongoose = require('mongoose');

const prodctSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter Product Name"],
        trim:true
    },
    description:{
        type:String,
        required:[true,"Please Enter Product Description"]
    },
    price:{
        type:Number,
        required:[true,"Please Enter Product Price"],
        maxLength:[8,"Price cannot exceed 8 characters"]
    },
    discount:{
        type:Number,
        default:0
    },
    ratings:{
        type:Number,
        default:0
    },
    images:[
       {
        public_id :{
            type:String,
        required:true
        },
        url:{
            type:String,
        required:true
        }
       }
    ],
    category:{
        type:String,
        required:[true,"Please Enter Product Category"]

    },
    stock:{
        type:Number,
        required :[true,"Please Enter Product Stock"],
        maxLength:[4,"Stock cannot exceed 4 charactors"],
        default:1
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    reviews:[
    {
        name:{
            type:String,
            required:true,
            default: null
        },
        avatar:{
            type:String,
            required:true,
            default: null
        },
        rating:{
            type:Number,
            required:true,
            default: null
        },
        comment:{
            type:String,
            required:true,
            default: null
        },
        user:{
            type:mongoose.Schema.ObjectId,
            ref:"User",
            required:true,
            default: null
        }
    }
    ],
   createdAt:{
        type:Date,
        default:Date.now
    },
    discountAmount:{
        type:Number,
        default: function() {
            return this.price * this.discount / 100
        }
    },
    product_tax:{
        type:Number,
        required:[true,"Please Enter Tax "],
        default:18
    },
    taxedAmount:{
        type:Number,
        default: function() {
            return  this.price*this.product_tax/100
        }
    },
    actualPrice:{
        type:Number,
        default: function() {
            return this.price + this.taxedAmount
        }
    },
    
    crossPriceVsActual:{
        type:Number,
        default:35
    },
    crossPrice:{
        type:Number,
        default: function() {
            return parseInt(this.actualPrice + ((this.actualPrice * this.crossPriceVsActual)/100))
        }
    },
    seller:{
        type:mongoose.Schema.ObjectId,
        ref: "User",
        required:true,

    },
    isRemoved:{
        type:Boolean,
        default:false,
    }

})

module.exports = mongoose.model("Product",prodctSchema);