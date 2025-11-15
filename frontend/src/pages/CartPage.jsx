import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FiShoppingCart, FiTrash2, FiPlus, FiMinus } from 'react-icons/fi';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice, getTotalItems, clearCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <div style={{ padding: '40px 20px', minHeight: '80vh' }}>
        <div className="container">
          <h1 style={{ marginBottom: '30px', fontSize: '36px', color: 'var(--text-primary)' }}>Keranjang Belanja</h1>
          <div style={{ textAlign: 'center', padding: '60px' }}>
            <FiShoppingCart style={{ fontSize: '64px', color: 'var(--text-muted)', marginBottom: '20px' }} />
            <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>Keranjang Anda kosong</p>
            <Link to="/products" className="btn btn-primary">
              Mulai Belanja
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const isMobile = window.innerWidth <= 768;

  return (
    <div style={{ padding: isMobile ? '20px 15px' : '40px 20px', minHeight: '80vh' }}>
      <div className="container">
        <div style={{ 
          display: 'flex', 
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between', 
          alignItems: isMobile ? 'flex-start' : 'center', 
          gap: isMobile ? '15px' : '0',
          marginBottom: isMobile ? '20px' : '30px' 
        }}>
          <h1 style={{ fontSize: isMobile ? '24px' : '36px', color: 'var(--text-primary)' }}>Keranjang Belanja</h1>
          <button onClick={clearCart} className="btn btn-outline" style={{ 
            color: 'var(--error-color)', 
            borderColor: 'var(--error-color)',
            width: isMobile ? '100%' : 'auto'
          }}>
            <FiTrash2 /> Hapus Semua
          </button>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 350px',
          gap: isMobile ? '20px' : '30px',
          marginBottom: isMobile ? '20px' : '40px'
        }}>
          {/* Cart Items */}
          <div>
            {cartItems.map((item) => (
              <div key={item.productId} className="card" style={{ 
                marginBottom: '20px', 
                display: 'flex', 
                flexDirection: isMobile ? 'column' : 'row',
                gap: isMobile ? '15px' : '20px' 
              }}>
                <img 
                  src={item.image} 
                  alt={item.title}
                  style={{
                    width: isMobile ? '100%' : '120px',
                    height: isMobile ? '200px' : '120px',
                    objectFit: 'cover',
                    borderRadius: '8px'
                  }}
                />
                <div style={{ flex: 1 }}>
                  <h3 style={{ marginBottom: '10px', fontSize: isMobile ? '16px' : '18px', color: 'var(--text-primary)' }}>{item.title}</h3>
                  <p style={{ fontSize: isMobile ? '18px' : '20px', fontWeight: 'bold', color: 'var(--primary-color)', marginBottom: '15px' }}>
                    ${item.price.toFixed(2)}
                  </p>
                  <div style={{ 
                    display: 'flex', 
                    flexDirection: isMobile ? 'column' : 'row',
                    alignItems: isMobile ? 'stretch' : 'center', 
                    gap: '15px' 
                  }}>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '10px', 
                      border: '1px solid var(--border-color)', 
                      borderRadius: '8px', 
                      padding: '5px',
                      justifyContent: isMobile ? 'space-between' : 'flex-start'
                    }}>
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          padding: '5px 10px',
                          fontSize: '18px',
                          color: 'var(--text-primary)'
                        }}
                      >
                        <FiMinus />
                      </button>
                      <span style={{ minWidth: '30px', textAlign: 'center', color: 'var(--text-primary)' }}>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          padding: '5px 10px',
                          fontSize: '18px',
                          color: 'var(--text-primary)'
                        }}
                      >
                        <FiPlus />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.productId)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--error-color)',
                        cursor: 'pointer',
                        padding: '5px 10px',
                        fontSize: isMobile ? '16px' : '18px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        width: isMobile ? '100%' : 'auto',
                        justifyContent: isMobile ? 'center' : 'flex-start'
                      }}
                    >
                      <FiTrash2 /> Hapus
                    </button>
                  </div>
                </div>
                {!isMobile && (
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--text-primary)' }}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                )}
                {isMobile && (
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    paddingTop: '15px',
                    borderTop: '1px solid var(--border-color)'
                  }}>
                    <span style={{ fontWeight: 'bold' }}>Total:</span>
                    <p style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--primary-color)' }}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="card" style={{ height: 'fit-content', position: 'sticky', top: '100px' }}>
            <h2 style={{ marginBottom: '20px', color: 'var(--text-primary)' }}>Ringkasan Pesanan</h2>
            <div style={{ marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', color: 'var(--text-secondary)' }}>
                <span>Subtotal ({getTotalItems()} items)</span>
                <span>${getTotalPrice().toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', color: 'var(--text-secondary)' }}>
                <span>Shipping</span>
                <span>$10.00</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', color: 'var(--text-secondary)' }}>
                <span>Tax</span>
                <span>${(getTotalPrice() * 0.1).toFixed(2)}</span>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px', fontSize: '24px', fontWeight: 'bold' }}>
              <span style={{ color: 'var(--text-primary)' }}>Total</span>
              <span style={{ color: 'var(--primary-color)' }}>
                ${(getTotalPrice() + 10 + getTotalPrice() * 0.1).toFixed(2)}
              </span>
            </div>
            <button className="btn btn-primary" style={{ width: '100%', padding: '16px' }}>
              Checkout
            </button>
            <Link to="/products" style={{ display: 'block', textAlign: 'center', marginTop: '15px', color: 'var(--primary-color)', textDecoration: 'none' }}>
              Lanjutkan Belanja
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
