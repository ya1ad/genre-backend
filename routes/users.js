const bcrypt = require("bcrypt");
const _ = require("lodash");
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");
const userRoute = express.Router();
const auth = require("../middleware/authorize");
const { userModel, validateUser } = require("../model/user");

userRoute.get("/me", auth, async (req, res) => {
  const getUser = await userModel.findById(req.user._id).select("-password");
  res.send(getUser);
});

userRoute.post("/", async (req, res) => {
  const { error } = validateUser(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  let user = await userModel.findOne({
    email: req.body.email
  });
  if (user) return res.status(400).send("Usr already");
  /** 
  user = new userModel({

    name: req.body.name,
    email: req.body.email,
    password: req.body.password*

  });*/

  user = new userModel(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  const token = user.generateAuthToken();
  res.header("x-auth-token", token).send(_.pick(user, ["name", "email"]));
});

module.exports = userRoute;
