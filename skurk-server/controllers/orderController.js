const asyncHandler = require("express-async-handler");
const Order = require("../models/orderModel");

// @desc    Create new order
// @route   POST /api/orders
// @access  Public
const createOrder = asyncHandler(async (req, res) => {
  const { customer, deliveryDay, paymentMethod, items, totalPrice } = req.body;

  if (!customer || !deliveryDay || !paymentMethod || !items || !totalPrice) {
    res.status(400);
    throw new Error("Alla orderfält måste fyllas i");
  }

  if (!items.length) {
    res.status(400);
    throw new Error("Ordern måste innehålla minst en produkt");
  }

  const order = await Order.create({
    customer,
    deliveryDay,
    paymentMethod,
    items,
    totalPrice,
  });

  res.status(201).json({
    message: "Order skapad",
    orderId: order._id,
  });
});

module.exports = {
  createOrder,
};