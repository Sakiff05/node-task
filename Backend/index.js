const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

app.use(bodyParser.json());
app.use(cors());
dotenv.config();

app.get("/", (req, res) => {
  res.send("Welcome");
});

let CarSchema = mongoose.Schema({
  brandName: String,
  modelName: String,
  year: Number,
  color: String,
  isNew: Boolean,
});

let CarModel = mongoose.model("cars", CarSchema);

app.get("/cars", async (req, res) => {
  let cars = await CarModel.find();
  res.send(cars);
});

app.get("/cars/:id", async (req, res) => {
  let { id } = req.params;
  let cars = await CarModel.findById(id);
  res.send({
    cars,
  });
});

app.post("/cars", async (req, res) => {
  let newCar = CarModel(req.body);
  await newCar.save();
  res.send({
    message: "Data sent",
    data: req.body,
  });
});

app.delete("/cars/:id", async (req, res) => {
  let { id } = req.params;
  await CarModel.findByIdAndDelete(id);
  res.send({
    message: "Data deleted",
  });
});

mongoose.connect(process.env.ConnectionString).then(() => {
  console.log("connected");
});

app.listen(3000, () => {
  console.log("Listening in port 3000");
});
