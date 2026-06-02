// Express är ett populärt webbramverk för Node.js som gör det enkelt att bygga webbapplikationer och API:er. I det här exemplet skapar vi en enkel server som hanterar kontakter och användare, och vi ansluter till en databas innan servern startas.
// Nodemon är ett verktyg som övervakar ändringar i koden och automatiskt startar om servern när en ändring sker, vilket underlättar utvecklingsprocessen.


const express = require('express');
const dotenv = require('dotenv').config();

const contactRoutes = require('./routes/contactRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require("./routes/productRoutes");

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
app.use('/api/contacts', contactRoutes);
app.use('/api/users', userRoutes);
app.use("/api/products", productRoutes);


// STARTA servern
const port = process.env.PORT || 3000;

const startServer = async () => {
    await connectDB();
    app.listen(port, () => {
    console.log(`Servern körs på port ${port}`);
});
};
startServer();