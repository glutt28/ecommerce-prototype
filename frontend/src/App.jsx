import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import Login from './pages/Login';
import UserProfile from './pages/UserProfile';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div style={{ 
            minHeight: '100vh', 
            display: 'flex', 
            flexDirection: 'column',
            position: 'relative',
            zIndex: 1
          }}>
            <Header />
            <main style={{ flex: 1, position: 'relative', zIndex: 1 }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ProductDetailPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<UserProfile />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;

