import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom'
import './App.css'


import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";


function App() {
  

  return (
    <Router>
      <div classname="app">
     <Navbar />

    <main className='app-main'>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/register" element={<Register />} /> */}

       
    
      </Routes>
      </main>

      <Footer />
    </div>
    </Router>
  )
}

export default App
