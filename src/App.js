import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import QRCode from './pages/qrCode';
import Products from './pages/products/products';
import Product from './pages/products/product';
import Home from './pages/home';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Products" element={<Products />} />
        <Route path="/Products/:id" element={<Product />} />
        <Route path="/qr-code" element={<QRCode />} />
      </Routes>
    </Router>
  );
};

export default App;
