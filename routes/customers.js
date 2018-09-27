const express = require("express");
const routeCustomer = express.Router();
const { customerModel, validate } = require("../model/customer");

//GET
routeCustomer.get("/", async (req, res) => {
  try {
    let getData = await customerModel.find().sort("name");
    res.send(getData);
  } catch (err) {
    res.status(400).send("error");
  }
});

//POST

routeCustomer.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let input_data = new customerModel({
    name: req.body.name,
    isGold: req.body.isGold,
    phone: parseInt(req.body.phone)
  });

  try {
    let result = await input_data.save();
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(400).send("failed to save!!");
  }
});

//PUT

routeCustomer.put("/:id", async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const customer = await customerModel.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      isGold: req.body.isGold,
      phone: req.body.phone
    },
    { new: true }
  );
  res.send(customer);
});

//Delete

routeCustomer.delete("/:id", async (req, res) => {
  try {
    const result = await customerModel.findByIdAndRemove(req.params.id);
    res.send(200).message("Deleted!!");
  } catch (err) {
    res.status(400).send("Error!!");
  }
});

module.exports = routeCustomer;
