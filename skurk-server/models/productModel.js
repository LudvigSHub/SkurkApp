const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Produktnamn krävs"],
    },
    category: {
      type: String,
      required: [true, "Kategori krävs"],
    },
    kcal: {
      type: Number,
      required: [true, "Kcal krävs"],
    },
    protein: {
      type: Number,
      required: [true, "Protein krävs"],
    },
    price: {
      type: Number,
      required: [true, "Pris krävs"],
    },
    image: {
      type: String,
      required: [true, "Bild krävs"],
    },
    popular: {
      type: Boolean,
      default: false,
    },
    showCase: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);