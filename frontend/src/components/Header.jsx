import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { FiShoppingCart, FiUser, FiMenu, FiX } from 'react-icons/fi';

const Header = () => {
  const { user, logout } = useAuth();
  const { getTotalItems } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header style={{
      background: 'rgba(26, 31, 58, 0.85)',
      backdropFilter: 'blur(30px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '15px 20px'
      }}>
        <Link to="/" style={{
          fontSize: '20px',
          fontWeight: 'bold',
          color: 'var(--primary-color)',
          textDecoration: 'none'
        }}>
          TokoApaIni
        </Link>

        {/* Desktop Navigation */}
        <nav className="desktop-nav" style={{ 
          display: 'flex', 
          gap: '24px', 
          alignItems: 'center',
          '@media (max-width: 768px)': { display: 'none' }
        }}>
          <Link to="/products" style={{ textDecoration: 'none', color: 'var(--text-secondary)', fontSize: '14px', transition: 'color 0.3s ease' }}>
            Products
          </Link>
          <Link to="/cart" style={{ textDecoration: 'none', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '8px', position: 'relative', fontSize: '14px', transition: 'color 0.3s ease' }}>
            <FiShoppingCart /> 
            <span style={{ '@media (max-width: 480px)': { display: 'none' } }}>Cart</span>
            {getTotalItems() > 0 && (
              <span style={{
                background: 'var(--primary-color)',
                color: 'white',
                borderRadius: '50%',
                width: '20px',
                height: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: 'bold',
                position: 'absolute',
                top: '-8px',
                right: '-8px'
              }}>
                {getTotalItems()}
              </span>
            )}
          </Link>
          {user ? (
            <>
              <Link to="/profile" style={{ textDecoration: 'none', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', transition: 'color 0.3s ease' }}>
                <FiUser /> <span style={{ '@media (max-width: 480px)': { display: 'none' } }}>{user.name?.firstname || user.username || 'Profile'}</span>
              </Link>
              <button onClick={logout} className="btn btn-outline" style={{ fontSize: '14px', padding: '8px 16px' }}>Logout</button>
            </>
          ) : (
            <Link to="/login" className="btn btn-primary" style={{ fontSize: '14px', padding: '8px 16px', textDecoration: 'none' }}>Login</Link>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer',
            color: 'var(--text-primary)',
            display: isMobile ? 'block' : 'none'
          }}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu" style={{
          background: 'var(--bg-secondary)',
          borderTop: '1px solid var(--border-color)',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
          backdropFilter: 'blur(20px)'
        }}>
          <Link 
            to="/products" 
            onClick={() => setMenuOpen(false)}
            style={{ textDecoration: 'none', color: 'var(--text-secondary)', padding: '10px 0', fontSize: '16px', transition: 'color 0.3s ease' }}
          >
            Products
          </Link>
          <Link 
            to="/cart" 
            onClick={() => setMenuOpen(false)}
            style={{ textDecoration: 'none', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 0', fontSize: '16px', transition: 'color 0.3s ease' }}
          >
            <FiShoppingCart /> Cart
            {getTotalItems() > 0 && (
              <span style={{
                background: 'var(--primary-color)',
                color: 'white',
                borderRadius: '50%',
                width: '20px',
                height: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: 'bold'
              }}>
                {getTotalItems()}
              </span>
            )}
          </Link>
          {user ? (
            <>
              <Link 
                to="/profile" 
                onClick={() => setMenuOpen(false)}
                style={{ textDecoration: 'none', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 0', fontSize: '16px', transition: 'color 0.3s ease' }}
              >
                <FiUser /> {user.name?.firstname || user.username || 'Profile'}
              </Link>
              <button 
                onClick={() => { logout(); setMenuOpen(false); }} 
                className="btn btn-outline" 
                style={{ width: '100%', marginTop: '10px' }}
              >
                Logout
              </button>
            </>
          ) : (
            <Link 
              to="/login" 
              onClick={() => setMenuOpen(false)}
              className="btn btn-primary" 
              style={{ width: '100%', marginTop: '10px', textAlign: 'center', textDecoration: 'none' }}
            >
              Login
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;

