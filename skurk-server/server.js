const express = require('express');
const dotenv = require('dotenv').config();


const authRoutes = require('./routes/authRoutes');
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");

const connectDB = require('./config/dbConnection');
const cors = require("cors")


const app = express();


// Middleware
app.use(
    cors({
        origin: "http://localhost:5173",
        }),
);

app.use(express.json());


// ROUTES
app.use('/api/auth', authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

// STARTA servern
const port = process.env.PORT || 3000;

const startServer = async () => {
    await connectDB();
    app.listen(port, () => {
    console.log(`Servern körs på port ${port}`);
});
};
startServer();