const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  image: {
    type: String,
  },
  cloudinary_id: {
    type: String,
  },
  description: {
    type: String,
  },
  quantity: {
    type: Number,
  },
  type: {
    type: String,
  },
  locationIndex:{
    type: Number,
  },
  price:{
    type: Number,
  },
});

module.exports = mongoose.model("item", userSchema);
