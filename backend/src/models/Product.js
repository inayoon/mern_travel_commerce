const { default: mongoose } = require("mongoose");

const productSchema = mongoose.Schema({
  writer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    maxLength: 30,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    default: 0,
  },
  images: {
    type: Array,
    default: [],
  },
  sold: {
    type: Number,
    default: 0,
  },
  continents: {
    type: Number,
    default: 1,
  },
  views: {
    type: Number,
    default: 0,
  },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
