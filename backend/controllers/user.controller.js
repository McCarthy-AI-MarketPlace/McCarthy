import {User} from '../models/user.model.js';
import {ApiError} from '../utils/ApiError.js';
import {ApiResponse} from '../utils/ApiResponse.js';
import {asyncHandler} from '../utils/asyncHandler.js';


export const test = (req, res) => {
  res.json({ message: "API is working!" });
};

export const signup = asyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;

  if (
    !fullName ||
    !email ||
    !password ||
    fullName === '' ||
    email === '' ||
    password === ''
  ) {
    throw new ApiError(400, "all fields are required");
  }

  const existedUser = await User.findOne({ email });

  if (existedUser) {
    throw new ApiError(409, "User already exists");
  }

  // const hashedPassword = bcrypt.hashSync(password, 10);

  const newUser = new User({
    fullName,
    email,
    password,
  });

  try {
    await newUser.save();
    res.status(201).json(new ApiResponse(200,newUser,'Signup successful'));
  } catch (error) {
    throw new ApiError(500, "Internal server error");
  }
});

export const login = asyncHandler(async (req, res) => {
  const {email, password} = req.body;
  if(!email || !password || email === "" || password === ""){
    throw new ApiError(400,"all fields are required");
  }

  const user = await User.findOne({email});
  if(!user){
    throw new ApiError(404,"user not found");
  }
  const isPasswordCorrect = user.isPasswordCorrect(password)
  if(!isPasswordCorrect){
    throw new ApiError(401,"Invalid password");
  }
  const accessToken = user.generateAccessToken();

  const options = { 
  httpOnly: true,
  secure: true,
 }

  res.status(200).cookie("accessToken",accessToken, options).json(new ApiResponse(200,user,"Login successful"));
});

export const signout = asyncHandler(async (req,res) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: true,
  }).status(200).json(new ApiResponse(200, {}, "Signout successful"));
});

export const updateUser = asyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;

  if (
    !fullName ||
    !email ||
    !password ||
    fullName === '' ||
    email === '' ||
    password === ''
  ) {
    throw new ApiError(400, "all fields are required");
  }

  const user = await User.findById(req.user._id);

  if (!user) {
    throw new ApiError(404, "user not found");
  }

  user.fullName = fullName;
  user.email = email;
  user.password = password;

  try {
    await user.save();
    res.status(200).json(new ApiResponse(200, user, "User updated successfully"));
  } catch (error) {
    throw new ApiError(500, "Internal server error");
  }
});

export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndDelete(req.user._id);

  if (!user) {
    throw new ApiError(404, "user not found");
  }

  res.status(200).json(new ApiResponse(200, {}, "User deleted successfully"));
});