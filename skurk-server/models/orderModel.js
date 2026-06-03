const mongoose = require("mongoose");

const orderItemSchema = mongoose.Schema(
  {
    productId: {
      type: String,
      required: [true, "Produkt-id krävs"],
    },
    name: {
      type: String,
      required: [true, "Produktnamn krävs"],
    },
    quantity: {
      type: Number,
      required: [true, "Antal krävs"],
      min: [1, "Antal måste vara minst 1"],
    },
    price: {
      type: Number,
      required: [true, "Pris krävs"],
    },
  },
  {
    _id: false,
  }
);

const orderSchema = mongoose.Schema(
  {
    customer: {
      name: {
        type: String,
        required: [true, "Namn krävs"],
      },
      email: {
        type: String,
        required: [true, "Email krävs"],
      },
      phone: {
        type: String,
        required: [true, "Telefonnummer krävs"],
      },
      address: {
        type: String,
        required: [true, "Adress krävs"],
      },
      postalCode: {
        type: String,
        required: [true, "Postnummer krävs"],
      },
      city: {
        type: String,
        required: [true, "Stad krävs"],
      },
    },
    deliveryDay: {
      type: String,
      required: [true, "Leveransdag krävs"],
    },
    paymentMethod: {
      type: String,
      required: [true, "Betalningsmetod krävs"],
    },
    items: {
      type: [orderItemSchema],
      required: true,
      validate: {
        validator: function (items) {
          return items.length > 0;
        },
        message: "Ordern måste innehålla minst en produkt",
      },
    },
    totalPrice: {
      type: Number,
      required: [true, "Totalpris krävs"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);