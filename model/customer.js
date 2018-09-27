const mongoose = require("mongoose");
const Joi = require("joi");

const customerModel = mongoose.model(
  "Customer",
  new mongoose.Schema({
    name: { type: String, required: true, minlength: 5, maxlength: 50 },
    isGold: { type: Boolean, required: true },
    phone: { type: Number, required: true }
  })
);

function validate(arg) {
  const schema = {
    name: Joi.string()
      .min(5)
      .max(50)
      .required(),
    isGold: Joi.boolean(),
    phone: Joi.number().min(5)
  };

  return Joi.validate(arg, schema);
}

module.exports.customerModel = customerModel;
module.exports.validate = validate;
