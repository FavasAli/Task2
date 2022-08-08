import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../model/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (req.headers.authorization) {
    try {
      token = req.headers.authorization;
      console.log("token", token);
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id);
      console.log(" req.user", req.user)
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized , token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized ,no token");
  }
});

export { protect };
