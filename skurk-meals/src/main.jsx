import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CartProvider } from "./context/CartContext.jsx";
import { FavoritesProvider } from "./context/FavoritesContext.jsx";
import './index.css'
import "./styles/buttons.css";
import App from './App.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
      <FavoritesProvider>
        <App />
      </FavoritesProvider>
    </CartProvider>
  </StrictMode>,
)
