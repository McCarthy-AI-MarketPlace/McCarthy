import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import bcrypt from "bcrypt";

export const test = (req, res) => {
  res.json({ message: "API is working!" });
};

export const signup = asyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;

  if (
    !fullName ||
    !email ||
    !password ||
    fullName === "" ||
    email === "" ||
    password === ""
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
    res.status(201).json(new ApiResponse(200, newUser, "Signup successful"));
  } catch (error) {
    throw new ApiError(500, "Internal server error");
  }
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password || email === "" || password === "") {
    throw new ApiError(400, "all fields are required");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, "user not found");
  }
  const isPasswordCorrect = await user.isPasswordCorrect(password);

  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid password");
  }
  const accessToken = user.generateAccessToken();

  const options = {
    httpOnly: true,
    secure: true,
  };

  res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .json(new ApiResponse(200, user, "Login successful"));
});

export const signout = asyncHandler(async (req, res) => {
  res
    .clearCookie("accessToken", {
      httpOnly: true,
      secure: true,
    })
    .status(200)
    .json(new ApiResponse(200, {}, "Signout successful"));
});

export const updateUser = asyncHandler(async (req, res) => {
  const { fullName, email, password, avatar } = req.body;

  if (!fullName && !email && !password && !avatar) {
    throw new ApiError(400, "At least one field is required");
  }

  const user = await User.findById(req.user._id);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (fullName) user.fullName = fullName;
  if (email) user.email = email;
  if (password) user.password = password;
  if (avatar) user.avatar = avatar;

  try {
    await user.save();
    res
      .status(200)
      .json(new ApiResponse(200, user, "User updated successfully"));
  } catch (error) {
    throw new ApiError(500, "Internal server error: " + error.message);
  }
});

export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndDelete(req.user._id);

  if (!user) {
    throw new ApiError(404, "user not found");
  }

  res.status(200).json(new ApiResponse(200, {}, "User deleted successfully"));
});

export const getUserProfile = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    res.json({
      _id: user._id,
      email: user.email,
      fullName: user.fullName,
      avatar: user.avatar,
      isAdmin: user.isAdmin,
    });
  } catch (error) {
    throw new ApiError(500, "Server error");
  }
};

export const google = asyncHandler(async (req, res) => {
  const { email, fullName, avatar } = req.body;

  if (!email || !fullName) {
    throw new ApiError(400, "Email and full name are required");
  }

  let user = await User.findOne({ email });

  if (user) {
    const accessToken = user.generateAccessToken();

    const { password, ...userWithoutPassword } = user._doc;

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, cookieOptions)
      .json(new ApiResponse(200, userWithoutPassword, "Login successful"));
  } else {
    const generatedPassword =
      Math.random().toString(36).slice(-8) +
      Math.random().toString(36).slice(-8);

    const hashedPassword = await bcrypt.hash(generatedPassword, 10);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      avatar:
        avatar ||
        "https://as2.ftcdn.net/jpg/03/40/12/49/1000_F_340124934_bz3pQTLrdFpH92ekknuaTHy8JuXgG7fi.webp",
    });

    await newUser.save();

    const accessToken = newUser.generateAccessToken();

    const { password, ...newUserWithoutPassword } = newUser._doc;

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    };

    return res
      .status(201)
      .cookie("accessToken", accessToken, cookieOptions)
      .json(
        new ApiResponse(
          201,
          newUserWithoutPassword,
          "User created and logged in"
        )
      );
  }
});
