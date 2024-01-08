const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A product must have a name"],
    unique: true,
    trim: true,
  },
  rating: {
    type: Number,
    required: [true, "A product must have a difficulty"],
    default: 4.5,
    min: 1,
    max: 5,
  },
  price: {
    type: Number,
    required: [true, "A product must have a price"],
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, "A product must have a image cover"],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
