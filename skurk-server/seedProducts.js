const dotenv = require("dotenv");
const connectDB = require("./config/dbConnection");
const Product = require("./models/productModel");
const products = require("./data/products");

dotenv.config();

const seedProducts = async () => {
  try {
    await connectDB();

    await Product.deleteMany();
    await Product.insertMany(products);

    console.log("Produkter seedade i databasen");
    process.exit();
  } catch (error) {
    console.error("Fel vid seedning av produkter:", error);
    process.exit(1);
  }
};

seedProducts();