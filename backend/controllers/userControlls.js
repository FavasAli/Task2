import asyncHandler from "express-async-handler";
import User from "../model/userModel.js";
import generateToken from "../util/generateToken.js";

const register = asyncHandler(async (req, res) => {
  const { name, email, password, place } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("user already exists");
  }
  const user = await User.create({
    name,
    email,
    password,
    place,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      place: user.place,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("new error");
  }
});

//login 

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      place: user.place,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid username or password");
  }
});


const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.json(error);
  }
});

export { register, authUser ,getAllUsers};
