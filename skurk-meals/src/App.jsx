import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom'
import './App.css'


import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Menu from "./pages/Menu";


function App() {
  

  return (
    <Router>
      <div className="app">
     <Navbar />

    <main className='app-main'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Menu" element={<Menu />} />

       
    
      </Routes>
      </main>

      <Footer />
    </div>
    </Router>
  )
}

export default App
