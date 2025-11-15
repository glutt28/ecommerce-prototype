import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../services/fakeStoreApi';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data.slice(0, 8)); // Show first 8 products
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

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

  return (
    <div>
      <section style={{
        background: 'var(--gradient-primary)',
        color: 'white',
        padding: window.innerWidth <= 768 ? '40px 15px' : '80px 20px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <h1 style={{ 
          fontSize: window.innerWidth <= 480 ? '28px' : window.innerWidth <= 768 ? '36px' : '48px', 
          marginBottom: '20px',
          lineHeight: '1.2'
        }}>
          Selamat Datang di TokoWebMurah
        </h1>
        <p style={{ 
          fontSize: window.innerWidth <= 480 ? '16px' : '20px', 
          opacity: 0.9,
          padding: window.innerWidth <= 768 ? '0 10px' : '0'
        }}>
          Temukan produk terbaik dengan harga terbaik
        </p>
        <Link to="/products" className="btn btn-primary" style={{ marginTop: '30px', background: 'rgba(255, 255, 255, 0.2)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.3)', color: 'white' }}>
          Jelajahi Produk
        </Link>
      </section>

      <section style={{ padding: window.innerWidth <= 768 ? '30px 15px' : '60px 20px' }}>
        <div className="container">
          <h2 style={{ 
            marginBottom: window.innerWidth <= 768 ? '20px' : '40px', 
            fontSize: window.innerWidth <= 480 ? '24px' : window.innerWidth <= 768 ? '28px' : '32px', 
            textAlign: 'center',
            color: 'var(--text-primary)'
          }}>
            Produk Terbaru
          </h2>
          {products.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <p style={{ color: 'var(--text-muted)' }}>Belum ada produk tersedia</p>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: window.innerWidth <= 480 
                ? '1fr' 
                : window.innerWidth <= 768 
                  ? 'repeat(auto-fill, minmax(200px, 1fr))' 
                  : 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: window.innerWidth <= 768 ? '20px' : '30px'
            }}>
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;

