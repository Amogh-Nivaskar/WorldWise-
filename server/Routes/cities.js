/*
Routes: 
get all cities
get city by id
post new city
delete city by id

*/

const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const City = require("../models/City");

router.get(
  "/",
  catchAsync(async (req, res) => {
    const cities = await City.find({});
    res.send(cities);
  })
);

router.post(
  "/",
  catchAsync(async (req, res) => {
    const city = new City(req.body);
    await city.save();
    res.status(201).send(city);
  })
);

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const city = await City.findById(id);
  res.send(city);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const result = await City.findByIdAndDelete(id);
  res.status(201).send(id);
});

module.exports = router;
