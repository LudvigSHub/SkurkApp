# SKURK Meals

SKURK Meals is a full-stack e-commerce web application built as a final project for the Interface Development course.

The application simulates a modern meal-prep webshop where users can browse protein-rich ready meals, filter products by category, add meals to favorites, manage a shopping cart, complete a checkout flow, and receive an order confirmation.

The project includes a React frontend and a Node.js/Express backend connected to MongoDB Atlas.

---

## Features

- Landing page with hero section, featured meal, product showcase and call-to-action
- Product menu with category filtering
- Favorites functionality
- Shopping cart with quantity controls and remove functionality
- Checkout form with validation
- Delivery day and payment method selection
- Order confirmation page
- User registration and login
- JWT-based authentication
- Products and orders handled through a backend API
- Responsive design for desktop and mobile

---

## Tech Stack

### Frontend

- React
- Vite
- React Router
- Context API
- CSS

### Backend

- Node.js
- Express
- MongoDB Atlas
- Mongoose
- JWT
- bcrypt
- dotenv
- CORS
- Nodemon

---

## Project Structure

```text
SkurkApp/
│
├── skurk-meals/              # React frontend
│   ├── public/
│   ├── src/
│   │   ├── assets/           # Images, logo, mascot and animations
│   │   ├── components/       # Reusable React components
│   │   ├── context/          # Cart, favorites and auth context
│   │   ├── data/             # Local product fallback/data
│   │   ├── pages/            # Page components
│   │   ├── services/         # API service functions
│   │   ├── styles/           # Shared CSS files
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
└── skurk-server/             # Node.js / Express backend
    ├── config/               # Database connection
    ├── controllers/          # Backend route logic
    ├── data/                 # Seed data
    ├── middleware/           # JWT validation middleware
    ├── models/               # Mongoose models
    ├── routes/               # API routes
    ├── seedProducts.js       # Seeds products to MongoDB
    ├── server.js             # Main backend server file
    ├── package.json
    └── .env
```
## Getting started

The project has two separate parts:

Frontend: skurk-meals
Backend: skurk-server

The backend must be running for the frontend to fetch products, handle login/register and create orders.

### Backend setup
Open a terminal and navigate to the backend folder:
cd skurk-server

#### Install dependencies:
npm install

Create a .env file inside the skurk-server folder.

The .env file should contain:

PORT=5001

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

#### Start the backend server:

npm run dev

The backend runs on:
http://localhost:5001

The API base URL is:
http://localhost:5001/api

### Frontend setup
Open a new terminal and navigate to the frontend folder:
cd skurk-meals

#### Install dependencies:
npm install

#### Start the frontend development server:
npm run dev

The frontend usually runs on:
http://localhost:5173

### Test User

The application includes a standard test user for login.
Username: user
Password: password

### Seed Products

If the products are missing from the database, run the seed script from the backend folder:

cd skurk-server

node seedProducts.js

This will reset and insert the product data into MongoDB.
