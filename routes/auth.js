const bcrypt = require("bcrypt");
const Joi = require("joi");
const express = require("express");
const mongoose = require("mongoose");
const userRoute = express.Router();
const { userModel } = require("../model/user");

userRoute.post("/", async (req, res) => {
  const { error } = validateUser(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  let user = await userModel.findOne({
    email: req.body.email
  });
  if (!user) return res.status(400).send("Invalid email or password");

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Invalid email or password");

  const token = user.generateAuthToken();
  res.send(token);
});

function validateUser(user) {
  const schema = {
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .max(255)
      .required()
  };

  return Joi.validate(user, schema);
}

module.exports = userRoute;
