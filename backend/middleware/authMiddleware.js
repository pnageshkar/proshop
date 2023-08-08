import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import User from '../models/userModel.js';


//Protect routes

const protect = asyncHandler(async(req,res,next) => {
  let token ;
  // Read the JWT from the 'jwt' cookie
  token =  req.cookies.jwt ; // 'jwt' is the name of the cookie set in userController

  if (token) {
    try {
      const decoded = jwt.verify(token,process.env.JWT_SECRET);//get the decoded token 
      req.user = await User.findById(decoded.userId).select('-password');// retrieve the userId ONLY in to req objct
      next();

    } catch (error) {
      res.status(401);
    throw new Error('Not authorized - Token Failed')

    }

  } else {
    res.status(401);
    throw new Error('Not authorized - No Token')
  }

})


// User must be an admin
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as an admin');
  }
};

export { protect, admin };