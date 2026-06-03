const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});


  const formattedProducts = products.map((product) => ({
    id: product._id,
    name: product.name,
    category: product.category,
    kcal: product.kcal,
    protein: product.protein,
    price: product.price,
    image: product.image,
    popular: product.popular,
    showCase: product.showCase,
  }));

  res.status(200).json(formattedProducts);
});

module.exports = {
  getProducts,
};