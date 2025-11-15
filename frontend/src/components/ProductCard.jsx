import React from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
  };

  return (
    <div className="card" style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      overflow: 'hidden'
    }}>
      <Link to={`/products/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <img 
          src={product.image || 'https://via.placeholder.com/300x300?text=Product'} 
          alt={product.title}
          style={{
            width: '100%',
            height: '250px',
            objectFit: 'cover',
            borderRadius: '12px',
            marginBottom: '16px',
            transition: 'transform 0.3s ease',
            background: 'var(--bg-tertiary)'
          }}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        />
        <h3 style={{ marginBottom: '8px', color: 'var(--text-primary)', fontSize: '18px' }}>
          {product.title}
        </h3>
        <p style={{ 
          color: 'var(--text-muted)', 
          fontSize: '14px',
          marginBottom: '16px',
          flexGrow: 1,
          lineHeight: '1.6'
        }}>
          {product.description.substring(0, 100)}...
        </p>
      </Link>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 'auto'
      }}>
        <span style={{
          fontSize: '24px',
          fontWeight: 'bold',
          color: 'var(--primary-color)'
        }}>
          ${product.price.toFixed(2)}
        </span>
        <button 
          className="btn btn-primary" 
          style={{ padding: '8px 16px' }}
          onClick={handleAddToCart}
        >
          <FiShoppingCart /> Add
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

