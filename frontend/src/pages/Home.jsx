import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getProducts, getCategories } from '../services/fakeStoreApi';
import ProductCard from '../components/ProductCard';
import { FiSearch, FiShoppingBag, FiTrendingUp, FiUsers, FiStar, FiPackage, FiArrowRight, FiZap, FiShield, FiFilter, FiX } from 'react-icons/fi';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [rating, setRating] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsData, categoriesData] = await Promise.all([
          getProducts(),
          getCategories()
        ]);
        setAllProducts(productsData);
        setCategories(categoriesData);
        
        // Calculate price range
        if (productsData.length > 0) {
          const prices = productsData.map(p => p.price);
          const min = Math.floor(Math.min(...prices));
          const max = Math.ceil(Math.max(...prices));
          setMinPrice(min);
          setMaxPrice(max);
          setPriceRange([min, max]);
        }
        
        setProducts(productsData.slice(0, 8));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    let filtered = [...allProducts];

    // Category filter
    if (category) {
      filtered = filtered.filter(product => product.category === category);
    }

    // Search filter
    if (search.trim()) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Price filter
    filtered = filtered.filter(product =>
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Rating filter
    if (rating > 0) {
      filtered = filtered.filter(product => product.rating.rate >= rating);
    }

    // Limit to 8 products if no search/filter active
    if (!search.trim() && !category && rating === 0 && priceRange[0] === minPrice && priceRange[1] === maxPrice) {
      setProducts(filtered.slice(0, 8));
    } else {
      setProducts(filtered);
    }
  }, [search, category, priceRange, rating, allProducts, minPrice, maxPrice]);

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
      {/* Hero Section */}
      <section style={{
        background: 'var(--gradient-primary)',
        color: 'white',
        padding: window.innerWidth <= 768 ? '60px 15px' : '120px 20px',
        position: 'relative',
        overflow: 'hidden',
        minHeight: window.innerWidth <= 768 ? 'auto' : '90vh',
        display: 'flex',
        alignItems: 'center'
      }}>
        {/* Animated Background Elements */}
        <div style={{
          position: 'absolute',
          top: '-20%',
          right: '-10%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'pulse 6s ease-in-out infinite',
          zIndex: 0
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-15%',
          left: '-5%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'pulse 8s ease-in-out infinite',
          animationDelay: '2s',
          zIndex: 0
        }} />
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '800px',
          height: '800px',
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'pulse 10s ease-in-out infinite',
          zIndex: 0
        }} />

        <div className="container" style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: window.innerWidth <= 768 ? '1fr' : '1.2fr 1fr',
            gap: window.innerWidth <= 768 ? '50px' : '80px',
            alignItems: 'center'
          }}>
            {/* Left Column - Content */}
            <div style={{
              animation: 'fadeInLeft 0.8s ease-out'
            }}>
              {/* Badge */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                background: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(20px)',
                borderRadius: '50px',
                marginBottom: '24px',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
              }}>
                <FiTrendingUp style={{ fontSize: '18px' }} />
                <span style={{ fontSize: '14px', fontWeight: '600' }}>E-Commerce Terpercaya</span>
              </div>

              {/* Main Heading */}
              <h1 style={{ 
                fontSize: window.innerWidth <= 480 ? '36px' : window.innerWidth <= 768 ? '48px' : '64px', 
                marginBottom: '24px',
                lineHeight: '1.1',
                fontWeight: '800',
                background: 'linear-gradient(135deg, #ffffff 0%, #e0e7ff 50%, #ffffff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                backgroundSize: '200% auto',
                animation: 'gradientShift 3s ease infinite'
              }}>
                Selamat Datang di<br />
                <span style={{
                  background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #fbbf24 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  backgroundSize: '200% auto',
                  animation: 'gradientShift 3s ease infinite'
                }}>
                  TokoApaIni
                </span>
              </h1>

              {/* Tagline */}
              <p style={{ 
                fontSize: window.innerWidth <= 480 ? '18px' : window.innerWidth <= 768 ? '20px' : '24px', 
                opacity: 0.95,
                marginBottom: '40px',
                lineHeight: '1.6',
                fontWeight: '300',
                maxWidth: '600px'
              }}>
                Temukan produk terbaik dengan harga terbaik.<br />
                <span style={{ fontWeight: '500' }}>Belanja sekarang, puas selamanya!</span>
              </p>

              {/* Stats Cards */}
              <div style={{
                display: 'flex',
                gap: window.innerWidth <= 480 ? '12px' : '20px',
                marginBottom: '40px',
                flexWrap: 'wrap'
              }}>
                {[
                  { icon: FiPackage, value: '1000+', label: 'Produk', color: '#60a5fa' },
                  { icon: FiUsers, value: '10K+', label: 'Pelanggan', color: '#34d399' },
                  { icon: FiStar, value: '4.8', label: 'Rating', color: '#fbbf24' }
                ].map((stat, idx) => (
                  <div key={idx} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    padding: '16px 24px',
                    background: 'rgba(255, 255, 255, 0.15)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '16px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    minWidth: '120px',
                    transition: 'all 0.3s ease',
                    cursor: 'default'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
                    e.currentTarget.style.transform = 'translateY(-6px) scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  >
                    <stat.icon style={{ fontSize: '28px', marginBottom: '8px', color: stat.color }} />
                    <div style={{ fontSize: '24px', fontWeight: '700', marginBottom: '4px' }}>{stat.value}</div>
                    <div style={{ fontSize: '13px', opacity: 0.9, fontWeight: '500' }}>{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              {!search && (
                <div style={{
                  display: 'flex',
                  gap: '16px',
                  flexWrap: 'wrap'
                }}>
                  <Link 
                    to="/products" 
                    className="explore-products-btn"
                    style={{ 
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: window.innerWidth <= 480 ? '16px 28px' : '18px 36px',
                      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%)',
                      backdropFilter: 'blur(20px)',
                      border: '2px solid rgba(255, 255, 255, 0.5)',
                      borderRadius: '16px',
                      color: '#6366f1',
                      textDecoration: 'none',
                      fontSize: window.innerWidth <= 480 ? '16px' : '18px',
                      fontWeight: '700',
                      boxShadow: '0 8px 32px rgba(99, 102, 241, 0.3)',
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-4px) scale(1.05)';
                      e.currentTarget.style.boxShadow = '0 12px 40px rgba(99, 102, 241, 0.5)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0) scale(1)';
                      e.currentTarget.style.boxShadow = '0 8px 32px rgba(99, 102, 241, 0.3)';
                    }}
                  >
                    <FiShoppingBag style={{ fontSize: '22px' }} />
                    <span>Jelajahi Produk</span>
                    <FiArrowRight style={{ fontSize: '20px', transition: 'transform 0.3s ease' }} />
                  </Link>
                </div>
              )}
            </div>

            {/* Right Column - Modern Search Card */}
            <div style={{
              animation: 'fadeInRight 0.8s ease-out',
              animationDelay: '0.2s'
            }}>
              <div style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%)',
                backdropFilter: 'blur(40px)',
                borderRadius: '40px',
                padding: window.innerWidth <= 480 ? '36px' : '48px',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                boxShadow: '0 25px 80px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.4s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 35px 100px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 25px 80px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
              }}
              >
                {/* Animated Gradient Background */}
                <div style={{
                  position: 'absolute',
                  top: '-100px',
                  right: '-100px',
                  width: '400px',
                  height: '400px',
                  background: 'radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, transparent 70%)',
                  borderRadius: '50%',
                  animation: 'pulse 8s ease-in-out infinite',
                  zIndex: 0
                }} />
                <div style={{
                  position: 'absolute',
                  bottom: '-80px',
                  left: '-80px',
                  width: '300px',
                  height: '300px',
                  background: 'radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, transparent 70%)',
                  borderRadius: '50%',
                  animation: 'pulse 10s ease-in-out infinite',
                  animationDelay: '2s',
                  zIndex: 0
                }} />

                <div style={{
                  position: 'relative',
                  zIndex: 1
                }}>
                  {/* Modern Header */}
                  <div style={{
                    textAlign: 'center',
                    marginBottom: '40px'
                  }}>
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '72px',
                      height: '72px',
                      borderRadius: '24px',
                      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.15) 100%)',
                      border: '2px solid rgba(255, 255, 255, 0.3)',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.4)',
                      marginBottom: '20px',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'rotate(5deg) scale(1.1)';
                      e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.5)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'rotate(0deg) scale(1)';
                      e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.4)';
                    }}
                    >
                      <FiSearch style={{ fontSize: '32px', color: 'white' }} />
                    </div>
                    <h3 style={{ 
                      fontSize: '28px', 
                      fontWeight: '800', 
                      marginBottom: '8px',
                      background: 'linear-gradient(135deg, #ffffff 0%, #e0e7ff 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}>
                      Cari Produk
                    </h3>
                    <p style={{ 
                      fontSize: '16px', 
                      opacity: 0.9,
                      fontWeight: '400'
                    }}>
                      Temukan produk impian Anda
                    </p>
                  </div>

                  {/* Modern Search Form */}
                  <form onSubmit={handleSearchSubmit} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px'
                  }}>
                    {/* Enhanced Search Input */}
                    <div style={{
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                      <div style={{
                        position: 'absolute',
                        left: '24px',
                        zIndex: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '24px',
                        height: '24px'
                      }}>
                        <FiSearch style={{
                          fontSize: '24px',
                          color: 'rgba(255, 255, 255, 0.8)',
                          pointerEvents: 'none',
                          transition: 'all 0.3s ease'
                        }} />
                      </div>
                      <input
                        type="text"
                        placeholder="Ketik nama produk, kategori, atau brand..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '22px 24px 22px 64px',
                          borderRadius: '20px',
                          border: '2px solid rgba(255, 255, 255, 0.3)',
                          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.15) 100%)',
                          backdropFilter: 'blur(20px)',
                          color: 'white',
                          fontSize: '17px',
                          fontWeight: '500',
                          outline: 'none',
                          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                        }}
                        onFocus={(e) => {
                          e.target.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0.25) 100%)';
                          e.target.style.borderColor = 'rgba(255, 255, 255, 0.6)';
                          e.target.style.boxShadow = '0 8px 40px rgba(0, 0, 0, 0.25), 0 0 0 4px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.3)';
                          e.target.style.transform = 'scale(1.02)';
                        }}
                        onBlur={(e) => {
                          e.target.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.15) 100%)';
                          e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                          e.target.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
                          e.target.style.transform = 'scale(1)';
                        }}
                      />
                    </div>

                    {/* Filter Toggle Button */}
                    <button
                      type="button"
                      onClick={() => setShowFilters(!showFilters)}
                      style={{
                        padding: '14px 20px',
                        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.1) 100%)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        color: 'white',
                        borderRadius: '16px',
                        fontWeight: '600',
                        fontSize: '15px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer',
                        width: '100%'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.15) 100%)';
                        e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.1) 100%)';
                        e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                      }}
                    >
                      <FiFilter style={{ fontSize: '18px' }} />
                      <span>{showFilters ? 'Sembunyikan Filter' : 'Tampilkan Filter'}</span>
                    </button>

                    {/* Filters Section */}
                    {showFilters && (
                      <div style={{
                        padding: '24px',
                        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.08) 100%)',
                        backdropFilter: 'blur(20px)',
                        borderRadius: '20px',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px',
                        marginTop: '8px',
                        animation: 'fadeIn 0.3s ease-out',
                        boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                      }}>
                        {/* Category Filter */}
                        <div>
                          <label style={{
                            display: 'block',
                            color: 'rgba(255, 255, 255, 0.95)',
                            fontSize: '14px',
                            fontWeight: '600',
                            marginBottom: '12px'
                          }}>
                            Kategori
                          </label>
                          <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            style={{
                              width: '100%',
                              padding: '12px 16px',
                              borderRadius: '12px',
                              border: '1px solid rgba(255, 255, 255, 0.25)',
                              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.15) 100%)',
                              backdropFilter: 'blur(10px)',
                              color: 'white',
                              fontSize: '15px',
                              outline: 'none',
                              cursor: 'pointer',
                              appearance: 'none',
                              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='white' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                              backgroundRepeat: 'no-repeat',
                              backgroundPosition: 'right 16px center',
                              paddingRight: '40px'
                            }}
                            onFocus={(e) => {
                              e.target.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.2) 100%)';
                              e.target.style.borderColor = 'rgba(255, 255, 255, 0.4)';
                            }}
                            onBlur={(e) => {
                              e.target.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.15) 100%)';
                              e.target.style.borderColor = 'rgba(255, 255, 255, 0.25)';
                            }}
                          >
                            <option value="" style={{ background: '#1a1f3a', color: '#e2e8f0' }}>Semua Kategori</option>
                            {categories.map(cat => (
                              <option key={cat} value={cat} style={{ background: '#1a1f3a', color: '#e2e8f0' }}>
                                {cat.charAt(0).toUpperCase() + cat.slice(1)}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Price Range */}
                        <div>
                          <label style={{
                            display: 'block',
                            color: 'rgba(255, 255, 255, 0.95)',
                            fontSize: '14px',
                            fontWeight: '600',
                            marginBottom: '12px'
                          }}>
                            Harga: ${priceRange[0].toFixed(2)} - ${priceRange[1].toFixed(2)}
                          </label>
                          <div style={{ display: 'flex', gap: '10px' }}>
                            <input
                              type="number"
                              min={minPrice}
                              max={maxPrice}
                              step="0.01"
                              value={priceRange[0]}
                              onChange={(e) => {
                                const val = parseFloat(e.target.value);
                                if (!isNaN(val) && val >= minPrice && val <= priceRange[1]) {
                                  setPriceRange([val, priceRange[1]]);
                                }
                              }}
                              placeholder="Min"
                              style={{
                                flex: 1,
                                padding: '12px 14px',
                                borderRadius: '12px',
                                border: '1px solid rgba(255, 255, 255, 0.25)',
                                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.15) 100%)',
                                backdropFilter: 'blur(10px)',
                                color: 'white',
                                fontSize: '14px',
                                outline: 'none',
                                fontWeight: '500'
                              }}
                            />
                            <input
                              type="number"
                              min={minPrice}
                              max={maxPrice}
                              step="0.01"
                              value={priceRange[1]}
                              onChange={(e) => {
                                const val = parseFloat(e.target.value);
                                if (!isNaN(val) && val >= priceRange[0] && val <= maxPrice) {
                                  setPriceRange([priceRange[0], val]);
                                }
                              }}
                              placeholder="Max"
                              style={{
                                flex: 1,
                                padding: '12px 14px',
                                borderRadius: '12px',
                                border: '1px solid rgba(255, 255, 255, 0.25)',
                                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.15) 100%)',
                                backdropFilter: 'blur(10px)',
                                color: 'white',
                                fontSize: '14px',
                                outline: 'none',
                                fontWeight: '500'
                              }}
                            />
                          </div>
                        </div>

                        {/* Rating Filter */}
                        <div>
                          <label style={{
                            display: 'block',
                            color: 'rgba(255, 255, 255, 0.95)',
                            fontSize: '14px',
                            fontWeight: '600',
                            marginBottom: '12px'
                          }}>
                            Rating Minimum
                          </label>
                          <div style={{
                            display: 'flex',
                            gap: '8px',
                            justifyContent: 'center'
                          }}>
                            {[1, 2, 3, 4, 5].map((starValue) => (
                              <button
                                key={starValue}
                                type="button"
                                onClick={() => {
                                  if (rating === starValue) {
                                    setRating(0);
                                  } else {
                                    setRating(starValue);
                                  }
                                }}
                                style={{
                                  background: 'transparent',
                                  border: 'none',
                                  cursor: 'pointer',
                                  padding: '6px',
                                  borderRadius: '8px',
                                  transition: 'all 0.2s ease',
                                  outline: 'none'
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                                  e.currentTarget.style.transform = 'scale(1.15)';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background = 'transparent';
                                  e.currentTarget.style.transform = 'scale(1)';
                                }}
                              >
                                <FiStar
                                  style={{
                                    fontSize: '24px',
                                    color: starValue <= rating ? '#fbbf24' : 'rgba(255, 255, 255, 0.5)',
                                    fill: starValue <= rating ? '#fbbf24' : 'transparent',
                                    strokeWidth: starValue <= rating ? 0 : 1.5,
                                    transition: 'all 0.2s ease',
                                    filter: starValue <= rating ? 'drop-shadow(0 2px 4px rgba(251, 191, 36, 0.4))' : 'none'
                                  }}
                                />
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Reset Filter Button */}
                        {(category || rating > 0 || priceRange[0] !== minPrice || priceRange[1] !== maxPrice) && (
                          <button
                            type="button"
                            onClick={() => {
                              setCategory('');
                              setRating(0);
                              setPriceRange([minPrice, maxPrice]);
                            }}
                            style={{
                              padding: '12px',
                              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.1) 100%)',
                              backdropFilter: 'blur(10px)',
                              border: '1px solid rgba(255, 255, 255, 0.2)',
                              color: 'white',
                              borderRadius: '12px',
                              fontSize: '14px',
                              fontWeight: '600',
                              cursor: 'pointer',
                              transition: 'all 0.2s ease',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '8px'
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.15) 100%)';
                              e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.1) 100%)';
                              e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                            }}
                          >
                            <FiX style={{ fontSize: '16px' }} />
                            <span>Reset Filter</span>
                          </button>
                        )}
                      </div>
                    )}

                    {/* Modern Gradient Button */}
                    <button
                      type="submit"
                      style={{
                        padding: '20px 32px',
                        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%)',
                        backdropFilter: 'blur(20px)',
                        border: '2px solid rgba(255, 255, 255, 0.4)',
                        color: '#6366f1',
                        borderRadius: '20px',
                        fontWeight: '700',
                        fontSize: '18px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '12px',
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        cursor: 'pointer',
                        boxShadow: '0 8px 32px rgba(99, 102, 241, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
                        position: 'relative',
                        overflow: 'hidden'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.95) 100%)';
                        e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
                        e.currentTarget.style.boxShadow = '0 12px 48px rgba(99, 102, 241, 0.5), 0 0 0 4px rgba(99, 102, 241, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.6)';
                        e.currentTarget.style.color = '#4f46e5';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%)';
                        e.currentTarget.style.transform = 'translateY(0) scale(1)';
                        e.currentTarget.style.boxShadow = '0 8px 32px rgba(99, 102, 241, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.5)';
                        e.currentTarget.style.color = '#6366f1';
                      }}
                    >
                      <FiSearch style={{ fontSize: '20px', transition: 'transform 0.3s ease' }} />
                      <span>Cari Sekarang</span>
                      <FiArrowRight style={{ 
                        fontSize: '18px', 
                        transition: 'transform 0.3s ease',
                        marginLeft: '4px'
                      }} />
                    </button>
                  </form>

                  {/* Modern Features Grid */}
                  <div style={{
                    marginTop: '40px',
                    paddingTop: '32px',
                    borderTop: '1px solid rgba(255, 255, 255, 0.15)',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '16px'
                  }}>
                    {[
                      { icon: FiZap, text: 'Cepat & Mudah', color: '#fbbf24' },
                      { icon: FiShield, text: 'Aman & Terpercaya', color: '#34d399' }
                    ].map((feature, idx) => (
                      <div key={idx} style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '16px',
                        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%)',
                        borderRadius: '16px',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        transition: 'all 0.3s ease',
                        cursor: 'default'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.15) 100%)';
                        e.currentTarget.style.transform = 'translateY(-4px)';
                        e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.2)';
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%)';
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                      }}
                      >
                        <feature.icon style={{ 
                          fontSize: '24px', 
                          color: feature.color,
                          filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))'
                        }} />
                        <span style={{ 
                          fontSize: '13px', 
                          fontWeight: '600',
                          textAlign: 'center',
                          opacity: 0.95
                        }}>
                          {feature.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
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

