const User = require('../models/userModels');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');




// User Register--------
const register = catchAsyncErrors(async (req, res, next) => {
    const {email, username, password, avatar } = req.body;
    const emailFind = await User.findOne({email});
    if(emailFind){
        return next(new ErrorHandler('Email Already Exist',400));
    }
    const profilePicBoy = avatar|| `https://avatar.iran.liara.run/public/boy/?username${username}`;
    const user = await User.create({ email, username, password,avatar:profilePicBoy
    });
    const token = user.getJWTToken();
    res.cookie('token', token);
    res.status(201).json({
        success: true,
        message: 'Sign in Successful'
    });
});

//User login-----------
const login = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;
    if(!email || !password){
        return next(new ErrorHandler('User Email and password required! ',400));
    }
    const user = await User.findOne({email}).select('+password');
    if(!user){
        return next(new ErrorHandler('Email not found!',400));
    }
    const passwords =await  user.comparePassword(password);
    if(!passwords){
        return next(new ErrorHandler('Wrong Password... ',400));
    }
    const token = user.getJWTToken();
    res.cookie('token', token);
    res.status(200).json({
        success: true,
        message: 'Login in Successful'
    });
});


const logout = catchAsyncErrors(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: 'logout  Successful'
    });
});


//Get user Details

const getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const details = await User.findById(req.params._id);
    res.status(200).json({
        success: true,
        details,
        message: 'Your Data'
    })
});


// Get All user Details:
const userDetails = catchAsyncErrors(async (req, res, next) => {
    const users = await User.find();
    res.status(200).json({
      success: true,
      users,
      message:"All user details"
    });
  });


module.exports = {
    register,login,logout,userDetails,getUserDetails 
};
