import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import useProducts from './hooks/useProducts';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import About from './pages/About';
import { CartProvider } from './context/CartContext';

function App() {
  const { products, loading, error, ask, askLoading, askError, askResult } = useProducts();

  return (
    <BrowserRouter>
      <CartProvider>
        <div className="App">
          <div className="site-container">
            <Header />

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/about" element={<About />} />
            </Routes>

            <Footer />
          </div>
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
