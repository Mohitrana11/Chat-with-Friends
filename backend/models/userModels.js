const mongoose =require('mongoose');
const validator  = require('validator');
const bcrypt=require('bcrypt');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({

    username: {
      type: String,
      required: [true, "Please Enter Your Name"],
      maxLength: [30, "Name cannot exceed 30 characters"],
      minLength: [3, "Name should have more than 4 characters"],
      // unique:true
    },
    email: {
      type: String,
      required: [true, "Please Enter Your Email"],
      unique: true,
      validate: [validator.isEmail, "Please Enter a valid Email"],
    },
    password: {
      type: String,
      required: [true, "Please Enter Your Password"],
      minLength: [6, "Password should be greater than 6 characters"],
      select: false
    },
    avatar: {
        type: String,
        default:'',
        default:'',
        // required:true
    },
   
},{timestamps:true});


userSchema.pre("save", async function (next) {
  if(!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// JWT TOKEN
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Compare Password
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};


const User = mongoose.model('user',userSchema);
module.exports = User;
