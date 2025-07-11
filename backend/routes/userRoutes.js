const express = require("express");
const { signup, login, getAllUsers, getUser, updateUserData, deleteUser } = require("../controllers/userController");
 const userRoutes = express.Router();

userRoutes.post("/signup", signup);
userRoutes.post("/login", login);
userRoutes.get("/users", getAllUsers);
userRoutes.get("/user", getUser);
userRoutes.put("/update-user", updateUserData);
userRoutes.delete("/remove", deleteUser);

module.exports = {
  userRoutes
}