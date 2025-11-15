import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../services/fakeStoreApi';
import { useCart } from '../context/CartContext';
import { FiShoppingCart, FiArrowLeft } from 'react-icons/fi';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    alert(`${quantity} item(s) added to cart!`);
  };

  if (loading) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '60px',
        color: 'var(--text-primary)'
      }}>
        <div style={{
          display: 'inline-block',
          width: '40px',
          height: '40px',
          border: '4px solid var(--border-color)',
          borderTopColor: 'var(--primary-color)',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
        <p style={{ marginTop: '20px', color: 'var(--text-muted)' }}>Loading...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-primary)' }}>
        <p style={{ marginBottom: '20px', color: 'var(--text-secondary)' }}>Product not found</p>
        <button onClick={() => navigate('/products')} className="btn btn-primary" style={{ marginTop: '20px' }}>
          Back to Products
        </button>
      </div>
    );
  }

  const isMobile = window.innerWidth <= 768;
  const isSmallMobile = window.innerWidth <= 480;

  return (
    <div style={{ padding: isMobile ? '20px 15px' : '40px 20px', minHeight: '80vh' }}>
      <div className="container">
        <button 
          onClick={() => navigate(-1)} 
          className="btn btn-outline"
          style={{ marginBottom: isMobile ? '20px' : '30px', fontSize: isMobile ? '14px' : '16px' }}
        >
          <FiArrowLeft /> Kembali
        </button>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? '30px' : '40px',
          marginTop: '20px'
        }}>
          <div>
            <img 
              src={product.image || 'https://via.placeholder.com/500x500?text=Product'} 
              alt={product.title}
              style={{
                width: '100%',
                borderRadius: '12px',
                boxShadow: 'var(--shadow-lg)'
              }}
            />
          </div>

          <div>
            <h1 style={{ 
              fontSize: isSmallMobile ? '24px' : isMobile ? '28px' : '36px', 
              marginBottom: '20px',
              lineHeight: '1.3'
            }}>
              {product.title}
            </h1>
            <div style={{ 
              display: 'flex', 
              flexDirection: isMobile ? 'column' : 'row',
              alignItems: isMobile ? 'flex-start' : 'center', 
              gap: '15px', 
              marginBottom: '20px' 
            }}>
              <p style={{ 
                fontSize: isSmallMobile ? '24px' : isMobile ? '28px' : '32px', 
                fontWeight: 'bold', 
                color: 'var(--primary-color)'
              }}>
                ${product.price.toFixed(2)}
              </p>
              {product.rating && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', flexWrap: 'wrap' }}>
                  <span style={{ color: '#fbbf24' }}>★</span>
                  <span>{product.rating.rate}</span>
                  <span style={{ color: 'var(--text-muted)', fontSize: isMobile ? '14px' : '16px' }}>
                    ({product.rating.count} reviews)
                  </span>
                </div>
              )}
            </div>
            
            <div style={{ marginBottom: isMobile ? '20px' : '30px' }}>
              <h3 style={{ marginBottom: '10px', fontSize: isMobile ? '18px' : '20px', color: 'var(--text-primary)' }}>Deskripsi</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: isMobile ? '14px' : '16px' }}>
                {product.description}
              </p>
            </div>

            <div style={{ marginBottom: isMobile ? '20px' : '30px' }}>
              <p style={{ fontSize: isMobile ? '14px' : '16px', color: 'var(--text-secondary)' }}>
                <strong style={{ color: 'var(--text-primary)' }}>Kategori:</strong> {product.category}
              </p>
            </div>

            <div style={{ marginBottom: isMobile ? '20px' : '30px' }}>
              <label style={{ display: 'block', marginBottom: '10px', fontSize: isMobile ? '14px' : '16px', color: 'var(--text-secondary)' }}>Jumlah:</label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                style={{ width: isMobile ? '100%' : '100px', marginBottom: '20px' }}
              />
            </div>

            <button 
              className="btn btn-primary" 
              style={{ width: '100%', padding: isMobile ? '14px' : '16px', fontSize: isMobile ? '14px' : '16px' }}
              onClick={handleAddToCart}
            >
              <FiShoppingCart /> Tambah ke Keranjang
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;

