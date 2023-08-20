const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CitySchema = new Schema({
  cityName: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  emoji: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
    required: false,
  },
  position: {
    lat: {
      type: String,
      required: true,
    },
    lng: {
      type: String,
      required: true,
    },
  },
});

module.exports = mongoose.model("City", CitySchema);
