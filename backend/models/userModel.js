const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter your Name"],
    maxLength: [30, "Name cannot exceed 30 charectors"],
    minLength: [3, "Name should have more than 3 charectors"],
  },
  email: {
    type: String,
    required: [true, "Please Enter your Email"],
    unique: true,
    validate: [validator.isEmail, "Please Enter a valid Email"],
  },
  phone: {
    type: Number,
    required: [true, "Please Enter your Mobile Number"],
   
    minLength: [10, "Mobile Number should have 10 charectors"],
  },
  password: {
    type: String,
    required: [true, "Please Enter your Password"],
    minLength: [8, "Password should have more than 8 charectors"],
    select: false,
  },
  avatar: [
    {
      public_id: {
        type: String,
        required:true,
       
        
      },
      url: {
        type: String,
        required:true,
      
        
      },
    },
  ],
  role:{
    type:String,
    default : "user"
  },
  power : {
    type:String,
    default: null,
  },
  joinedOn:{
    type: Date,
    default: Date.now()

  },
  shippingInfo : 
  [
      {
          address: {
              type: String,
              required:true,
          },
          city:{
              type:String,
              required: true,
          },
          state : {
              type:String,
              required: true,

          },
          country : {
              type:String,
              required: true,
          },
          pincode: Number,
          createdOn :{
              type : Date,
              default: Date.now,
          }
      }

  ],

  resetpasswordToken :String,
  resetPaswordExpire:Date,
  verified: {
    email: {
        type: Boolean,
        default: false
    },
    phone: {
        type: Boolean,
        default: false
    }
},

});

userSchema.pre("save", async function(next){

  if(!this.isModified("password")){
      next();
  }

  this.password = await bcrypt.hash(this.password,10);
});

//JWT TOKEN
userSchema.methods.getJWTToken = function(){
  return jwt.sign({id:this._id},process.env.JWT_SECRET,{
    expiresIn: process.env.JWT_EXPIRE,
  })
}

//Compare Password
userSchema.methods.comparePassword = async function(enteredPassword){
  return await bcrypt.compare(enteredPassword,this.password)

};

//Generating Password Reset Token
userSchema.methods.getResetPasswordToken = function(){

  // Generating Token 
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hashing and adding resetPasswordToken to userSchema
  this.resetpasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

  this.resetPaswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;

}

module.exports = mongoose.model("user",userSchema);