const express = require("express");

const { register,login,logout} = require("../controllers/authController");


const authrouter = express.Router();

authrouter.post("/signup",signup);

authrouter.post("/login",login);

authrouter.post("/logout",logout);

module.exports = authrouter;