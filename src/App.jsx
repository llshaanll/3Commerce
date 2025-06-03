import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Cart from './pages/Cart';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Optional: Redirect base URL to login */}
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path='/cart' element={<Cart/>} />
      </Routes>
    </Router>
  );
};

export default App;
