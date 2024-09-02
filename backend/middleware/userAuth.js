const jwt = require('jsonwebtoken');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');
const User = require('../models/userModels');


const isAuthenticated = catchAsyncErrors(async (req,res,next)=>{
    const { token } = req.cookies;
    if (!token) {
      return next(new ErrorHandler("Please Login to access this resource", 401));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
    req.user = await User.findById(decoded.id);
    next();
})




module.exports = {
    isAuthenticated
}




