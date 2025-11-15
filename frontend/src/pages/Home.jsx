import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getProducts } from '../services/fakeStoreApi';
import ProductCard from '../components/ProductCard';
import { FiSearch, FiArrowRight, FiShoppingBag, FiTrendingUp, FiUsers, FiPackage, FiStar } from 'react-icons/fi';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setAllProducts(data);
        setProducts(data.slice(0, 8)); // Show first 8 products
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (search.trim()) {
      const filtered = allProducts.filter(product =>
        product.title.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase())
      );
      setProducts(filtered);
    } else {
      setProducts(allProducts.slice(0, 8));
    }
  }, [search, allProducts]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/products?search=${encodeURIComponent(search)}`);
    }
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

  return (
    <div>
      <section style={{
        background: 'var(--gradient-primary)',
        color: 'white',
        padding: window.innerWidth <= 768 ? '40px 15px' : '100px 20px',
        position: 'relative',
        overflow: 'hidden',
        minHeight: window.innerWidth <= 768 ? 'auto' : '600px',
        display: 'flex',
        alignItems: 'center'
      }}>
        {/* Decorative Background Elements */}
        <div style={{
          position: 'absolute',
          top: '-50%',
          right: '-10%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'pulse 4s ease-in-out infinite'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-30%',
          left: '-5%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'pulse 3s ease-in-out infinite',
          animationDelay: '1s'
        }} />

        <div className="container" style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {/* Modern Grid Layout */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: window.innerWidth <= 768 ? '1fr' : '1fr 1fr',
            gap: window.innerWidth <= 768 ? '40px' : '60px',
            alignItems: 'center'
          }}>
            {/* Left Column - Content */}
            <div style={{
              textAlign: window.innerWidth <= 768 ? 'center' : 'left',
              animation: 'fadeInLeft 0.8s ease-out'
            }}>
              {/* Badge */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                background: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                borderRadius: '20px',
                marginBottom: '20px',
                border: '1px solid rgba(255, 255, 255, 0.3)'
              }}>
                <FiTrendingUp style={{ fontSize: '16px' }} />
                <span style={{ fontSize: '14px', fontWeight: '600' }}>E-Commerce Terpercaya</span>
              </div>

              {/* Main Heading with Gradient */}
              <h1 style={{ 
                fontSize: window.innerWidth <= 480 ? '32px' : window.innerWidth <= 768 ? '42px' : '56px', 
                marginBottom: '20px',
                lineHeight: '1.2',
                fontWeight: '800',
                background: 'linear-gradient(135deg, #ffffff 0%, #e0e7ff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: '0 4px 20px rgba(255, 255, 255, 0.3)'
              }}>
                Selamat Datang di<br />
                <span style={{
                  background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  TokoApaIni
                </span>
              </h1>

              {/* Tagline */}
              <p style={{ 
                fontSize: window.innerWidth <= 480 ? '16px' : window.innerWidth <= 768 ? '18px' : '22px', 
                opacity: 0.95,
                marginBottom: '30px',
                lineHeight: '1.6',
                fontWeight: '300'
              }}>
                Temukan produk terbaik dengan harga terbaik.<br />
                <span style={{ fontWeight: '500' }}>Belanja sekarang, puas selamanya!</span>
              </p>

              {/* Stats */}
              <div style={{
                display: 'flex',
                gap: window.innerWidth <= 480 ? '16px' : '24px',
                marginBottom: '40px',
                flexWrap: 'wrap',
                justifyContent: window.innerWidth <= 768 ? 'center' : 'flex-start'
              }}>
                {[
                  { icon: FiPackage, value: '1000+', label: 'Produk' },
                  { icon: FiUsers, value: '10K+', label: 'Pelanggan' },
                  { icon: FiStar, value: '4.8', label: 'Rating' }
                ].map((stat, idx) => (
                  <div key={idx} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '12px 20px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    minWidth: '100px',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                    e.currentTarget.style.transform = 'translateY(-4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                  >
                    <stat.icon style={{ fontSize: '24px', marginBottom: '8px', opacity: 0.9 }} />
                    <div style={{ fontSize: '20px', fontWeight: '700', marginBottom: '4px' }}>{stat.value}</div>
                    <div style={{ fontSize: '12px', opacity: 0.8 }}>{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              {!search && (
                <Link 
                  to="/products" 
                  className="explore-products-btn"
                  style={{ 
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: window.innerWidth <= 480 ? '16px 24px' : '20px 36px',
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%)',
                    backdropFilter: 'blur(20px)',
                    border: '2px solid rgba(255, 255, 255, 0.5)',
                    borderRadius: '16px',
                    color: '#6366f1',
                    textDecoration: 'none',
                    fontSize: window.innerWidth <= 480 ? '16px' : '18px',
                    fontWeight: '700',
                    boxShadow: '0 8px 32px rgba(99, 102, 241, 0.3), 0 0 0 0 rgba(99, 102, 241, 0.4)',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px) scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 12px 40px rgba(99, 102, 241, 0.5), 0 0 0 8px rgba(99, 102, 241, 0.2)';
                    e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.95) 100%)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = '0 8px 32px rgba(99, 102, 241, 0.3), 0 0 0 0 rgba(99, 102, 241, 0.4)';
                    e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%)';
                  }}
                >
                  <FiShoppingBag style={{ fontSize: '24px' }} />
                  <span>Jelajahi Semua Produk</span>
                  <FiArrowRight style={{ 
                    fontSize: '20px',
                    transition: 'transform 0.3s ease'
                  }} />
                </Link>
              )}
            </div>

            {/* Right Column - Search */}
            <div style={{
              animation: 'fadeInRight 0.8s ease-out',
              animationDelay: '0.2s'
            }}>
              {/* Search Card */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(20px)',
                borderRadius: '24px',
                padding: window.innerWidth <= 480 ? '24px' : '32px',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '20px'
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid rgba(255, 255, 255, 0.3)'
                  }}>
                    <FiSearch style={{ fontSize: '24px' }} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '4px' }}>
                      Cari Produk
                    </h3>
                    <p style={{ fontSize: '14px', opacity: 0.8 }}>
                      Temukan apa yang Anda cari
                    </p>
                  </div>
                </div>

                {/* Search Form */}
                <form onSubmit={handleSearchSubmit} style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}>
                  <div style={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    <FiSearch style={{
                      position: 'absolute',
                      left: '16px',
                      fontSize: '20px',
                      color: 'rgba(255, 255, 255, 0.7)',
                      zIndex: 1,
                      pointerEvents: 'none'
                    }} />
                    <input
                      type="text"
                      placeholder="Cari produk..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '16px 16px 16px 48px',
                        borderRadius: '12px',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        background: 'rgba(255, 255, 255, 0.2)',
                        backdropFilter: 'blur(10px)',
                        color: 'white',
                        fontSize: '16px',
                        outline: 'none',
                        transition: 'all 0.3s ease'
                      }}
                      onFocus={(e) => {
                        e.target.style.background = 'rgba(255, 255, 255, 0.3)';
                        e.target.style.borderColor = 'rgba(255, 255, 255, 0.5)';
                        e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
                      }}
                      onBlur={(e) => {
                        e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                        e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                  <button
                    type="submit"
                    style={{
                      padding: '16px',
                      background: 'rgba(255, 255, 255, 0.25)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      color: 'white',
                      borderRadius: '12px',
                      fontWeight: '600',
                      fontSize: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = 'rgba(255, 255, 255, 0.35)';
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'rgba(255, 255, 255, 0.25)';
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = 'none';
                    }}
                  >
                    <FiSearch />
                    <span>Cari Sekarang</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: window.innerWidth <= 768 ? '30px 15px' : '60px 20px' }}>
        <div className="container">
          <h2 style={{ 
            marginBottom: window.innerWidth <= 768 ? '20px' : '40px', 
            fontSize: window.innerWidth <= 480 ? '24px' : window.innerWidth <= 768 ? '28px' : '32px', 
            textAlign: 'center',
            color: 'var(--text-primary)'
          }}>
            {search ? `Hasil Pencarian "${search}"` : 'Produk Terbaru'}
            {search && products.length > 0 && (
              <span style={{ 
                fontSize: '18px', 
                color: 'var(--text-muted)', 
                fontWeight: 'normal',
                display: 'block',
                marginTop: '10px'
              }}>
                ({products.length} produk ditemukan)
              </span>
            )}
          </h2>
          {products.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <FiSearch style={{ fontSize: '64px', color: 'var(--text-muted)', marginBottom: '20px' }} />
              <p style={{ color: 'var(--text-muted)', fontSize: '18px', marginBottom: '10px' }}>
                {search ? `Tidak ada produk ditemukan untuk "${search}"` : 'Belum ada produk tersedia'}
              </p>
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="btn btn-outline"
                  style={{ marginTop: '20px' }}
                >
                  Hapus Pencarian
                </button>
              )}
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

