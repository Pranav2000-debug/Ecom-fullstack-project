const { USER } = require("../models/usersSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();


const signup = async (req, res) => {
  const { username, email, contact, password } = req.body;

  if (!username || !email || !contact || !password) {
    return res.status(401).json({ message: "Fill all the fields", status: 401, success: false });
  }

  try {
    const existingUser = await USER.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: "User already exists", status: 409, success: false });
    }

    const saltValue = 10;
    const encryptedPassword = await bcrypt.hash(password, saltValue);

    const newUser = new USER({
      username,
      email: email.toLowerCase(),
      contact,
      password: encryptedPassword,
    });

    await newUser.save();
    return res.status(200).json({ message: "Data saved successfully", status: 200, success: true, user: newUser });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error", status: 500, success: false });
  }
};

const login = async (req, res) => {
  const { username, contact, password } = req.body;
  const email = req.body.email?.toLowerCase();

  if (!email || !password) {
    return res.status(401).json({ message: "login failed", status: 401, success: false });
  }
  try {
    const user = await USER.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "No user found, please check credentials or register", status: 404, success: false });
    }

    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return res.status(409).json({ message: "Password incorrect", status: 409, success: false });
    }

    // CREATING JWT TOKEN
    const payload = {
      username: user.username,
      email: user.email,
      contact: user.contact,
    };

    const accessToken = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "1hr" });
    const refreshToken = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "7d" });

    // SENDING TOKENS TO FRONTEND
    return res.status(200).json({ message: "Login Successful", status: 200, success: true, accessToken, refreshToken, activeUser: user.username });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

const getAllUsers = async (req, res) => {
  const users = await USER.find();
  if (!users) {
    return res.status(404).json({ message: "no users found", status: 404, success: false });
  }

  return res.status(200).json({ message: "users found successfully", status: 200, success: true, users });
};

const getUser = async (req, res) => {
  const  email  = req.query.email?.toLowerCase();
  const user = await USER.findOne({ email });

  if (!user) return res.status(404).json({ message: "no user found", status: 404, success: false });

  return res.status(200).json({ message: "users found", status: 200, success: true, user });
};

const updateUserData = async (req, res) => {
  const  email  = req.query.email?.twoLowerCase();
  const { password } = req.body;

  // const user = await USER.findOneAndUpdate({ email }, { $set: { password: password } });
  const user = await USER.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "no user found", status: 404, success: false });
  }
  user.password = password;

  await user.save();

  return res.status(200).json({ message: "user data updated", status: 200, success: true, user });
};

const deleteUser = async (req, res) => {
  const email = req.query.email?.toLowerCase();

  await USER.findOneAndDelete({ email });

  return res.status(200).json({ message: "user deleted successfully", status: 200, message: true });
};

module.exports = {
  signup,
  login,
  getAllUsers,
  getUser,
  updateUserData,
  deleteUser,
};
