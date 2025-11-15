import React, { useState, useEffect, useRef } from 'react';
import { getProducts, getProductsByCategory, getCategories } from '../services/fakeStoreApi';
import ProductCard from '../components/ProductCard';
import { FiFilter, FiX, FiStar, FiSearch } from 'react-icons/fi';

const Products = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [rating, setRating] = useState(0);
  const [sortBy, setSortBy] = useState('default');
  const [showFilter, setShowFilter] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const minSliderRef = useRef(null);
  const maxSliderRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setShowFilter(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesData, productsData] = await Promise.all([
          getCategories(),
          getProducts()
        ]);
        setCategories(categoriesData);
        setAllProducts(productsData);
        
        // Calculate price range
        if (productsData.length > 0) {
          const prices = productsData.map(p => p.price);
          const min = Math.floor(Math.min(...prices));
          const max = Math.ceil(Math.max(...prices));
          setMinPrice(min);
          setMaxPrice(max);
          setPriceRange([min, max]);
        }
        
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

    // Sort
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating.rate - a.rating.rate);
        break;
      case 'name':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }

    setProducts(filtered);
  }, [search, category, priceRange, rating, sortBy, allProducts]);

  const isSmallMobile = window.innerWidth <= 480;

  return (
    <div style={{ padding: window.innerWidth <= 768 ? '20px 15px' : '40px 20px', minHeight: '80vh', position: 'relative' }}>
      <div className="container" style={{ maxWidth: '1400px' }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: isMobile ? '24px' : '32px',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <h1 style={{ 
            fontSize: isSmallMobile ? '24px' : isMobile ? '28px' : '36px',
            color: 'var(--text-primary)',
            margin: 0
          }}>
            Semua Produk
            {products.length > 0 && (
              <span style={{
                fontSize: '18px',
                color: 'var(--text-muted)',
                fontWeight: 'normal',
                marginLeft: '12px'
              }}>
                ({products.length} produk)
              </span>
            )}
          </h1>
          
          {/* Mobile Filter Toggle */}
          {isMobile && (
            <button
              onClick={() => setShowFilter(!showFilter)}
              style={{
                padding: '12px 20px',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: '12px',
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'var(--bg-card-hover)';
                e.target.style.borderColor = 'var(--primary-color)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'var(--bg-card)';
                e.target.style.borderColor = 'var(--border-color)';
              }}
            >
              <FiFilter />
              <span>Filter</span>
            </button>
          )}
        </div>

        {/* Search and Sort Bar */}
        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: '16px',
          marginBottom: '32px'
        }}>
          <div style={{
            position: 'relative',
            flex: 1
          }}>
            <FiSearch style={{
              position: 'absolute',
              left: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-muted)',
              fontSize: '20px'
            }} />
            <input
              type="text"
              placeholder="Cari produk..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: '100%',
                padding: '14px 16px 14px 48px',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: '12px',
                color: 'var(--text-primary)',
                fontSize: '16px',
                outline: 'none',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--primary-color)';
                e.target.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'var(--border-color)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              padding: '14px 16px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              color: 'var(--text-primary)',
              fontSize: '16px',
              minWidth: isMobile ? '100%' : '200px',
              cursor: 'pointer',
              outline: 'none'
            }}
          >
            <option value="default">Urutkan: Default</option>
            <option value="price-low">Harga: Rendah ke Tinggi</option>
            <option value="price-high">Harga: Tinggi ke Rendah</option>
            <option value="rating">Rating Tertinggi</option>
            <option value="name">Nama: A-Z</option>
          </select>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '280px 1fr',
          gap: '32px',
          alignItems: 'start'
        }}>
          {/* Filter Sidebar */}
          <div style={{
            display: isMobile && !showFilter ? 'none' : 'block',
            position: isMobile ? 'fixed' : 'sticky',
            top: isMobile ? '0' : '100px',
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1000,
            background: isMobile ? 'rgba(10, 14, 39, 0.98)' : 'transparent',
            backdropFilter: isMobile ? 'blur(20px)' : 'none',
            padding: isMobile ? '20px' : '0',
            overflowY: isMobile ? 'auto' : 'visible',
            maxHeight: isMobile ? '100vh' : 'none'
          }}>
            {isMobile && (
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '24px',
                paddingBottom: '16px',
                borderBottom: '1px solid var(--border-color)'
              }}>
                <h2 style={{ fontSize: '20px', color: 'var(--text-primary)', margin: 0 }}>Filter</h2>
                <button
                  onClick={() => setShowFilter(false)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--text-primary)',
                    fontSize: '24px',
                    cursor: 'pointer',
                    padding: '4px'
                  }}
                >
                  <FiX />
                </button>
              </div>
            )}
            
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: '16px',
              padding: '24px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
            }}>
              {/* Category Filter */}
              <div style={{ marginBottom: '24px' }}>
                <label style={{
                  display: 'block',
                  color: 'var(--text-primary)',
                  fontWeight: '600',
                  marginBottom: '16px',
                  fontSize: '16px'
                }}>
                  Kategori
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 14px',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    background: category === '' ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
                    border: category === '' ? '1px solid rgba(99, 102, 241, 0.3)' : '1px solid transparent'
                  }}
                  onMouseEnter={(e) => {
                    if (category !== '') {
                      e.currentTarget.style.background = 'var(--bg-card-hover)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (category !== '') {
                      e.currentTarget.style.background = 'transparent';
                    }
                  }}
                  >
                    <input
                      type="radio"
                      name="category"
                      value=""
                      checked={category === ''}
                      onChange={(e) => setCategory(e.target.value)}
                      style={{
                        cursor: 'pointer',
                        width: '18px',
                        height: '18px',
                        accentColor: 'var(--primary-color)',
                        margin: 0
                      }}
                    />
                    <span style={{
                      color: category === '' ? 'var(--text-primary)' : 'var(--text-secondary)',
                      fontWeight: category === '' ? '500' : '400',
                      fontSize: '15px',
                      userSelect: 'none'
                    }}>
                      Semua Kategori
                    </span>
                  </label>
                  {categories.map(cat => (
                    <label key={cat} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px 14px',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      background: category === cat ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
                      border: category === cat ? '1px solid rgba(99, 102, 241, 0.3)' : '1px solid transparent'
                    }}
                    onMouseEnter={(e) => {
                      if (category !== cat) {
                        e.currentTarget.style.background = 'var(--bg-card-hover)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (category !== cat) {
                        e.currentTarget.style.background = 'transparent';
                      }
                    }}
                    >
                      <input
                        type="radio"
                        name="category"
                        value={cat}
                        checked={category === cat}
                        onChange={(e) => setCategory(e.target.value)}
                        style={{
                          cursor: 'pointer',
                          width: '18px',
                          height: '18px',
                          accentColor: 'var(--primary-color)',
                          margin: 0
                        }}
                      />
                      <span style={{
                        color: category === cat ? 'var(--text-primary)' : 'var(--text-secondary)',
                        fontWeight: category === cat ? '500' : '400',
                        fontSize: '15px',
                        userSelect: 'none'
                      }}>
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div style={{ marginBottom: '24px' }}>
                <label style={{
                  display: 'block',
                  color: 'var(--text-primary)',
                  fontWeight: '600',
                  marginBottom: '16px',
                  fontSize: '16px'
                }}>
                  Range Harga
                </label>
                
                {/* Min Price Slider */}
                <div style={{ marginBottom: '24px' }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '8px'
                  }}>
                    <label style={{
                      color: 'var(--text-secondary)',
                      fontSize: '14px',
                      fontWeight: '500'
                    }}>
                      Harga Minimum
                    </label>
                    <span style={{
                      color: 'var(--text-primary)',
                      fontSize: '16px',
                      fontWeight: '600',
                      minWidth: '80px',
                      textAlign: 'right'
                    }}>
                      ${priceRange[0].toFixed(2)}
                    </span>
                  </div>
                  <input
                    ref={minSliderRef}
                    type="range"
                    min={minPrice}
                    max={priceRange[1]}
                    step="0.01"
                    value={priceRange[0]}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value);
                      if (val <= priceRange[1]) {
                        setPriceRange([val, priceRange[1]]);
                      }
                    }}
                    style={{
                      width: '100%',
                      height: '6px',
                      borderRadius: '3px',
                      background: 'var(--bg-tertiary)',
                      outline: 'none',
                      cursor: 'pointer',
                      zIndex: priceRange[0] > priceRange[1] - 10 ? 1 : 0
                    }}
                  />
                </div>
                
                {/* Max Price Slider */}
                <div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '8px'
                  }}>
                    <label style={{
                      color: 'var(--text-secondary)',
                      fontSize: '14px',
                      fontWeight: '500'
                    }}>
                      Harga Maksimum
                    </label>
                    <span style={{
                      color: 'var(--text-primary)',
                      fontSize: '16px',
                      fontWeight: '600',
                      minWidth: '80px',
                      textAlign: 'right'
                    }}>
                      ${priceRange[1].toFixed(2)}
                    </span>
                  </div>
                  <input
                    ref={maxSliderRef}
                    type="range"
                    min={priceRange[0]}
                    max={maxPrice}
                    step="0.01"
                    value={priceRange[1]}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value);
                      if (val >= priceRange[0]) {
                        setPriceRange([priceRange[0], val]);
                      }
                    }}
                    style={{
                      width: '100%',
                      height: '6px',
                      borderRadius: '3px',
                      background: 'var(--bg-tertiary)',
                      outline: 'none',
                      cursor: 'pointer',
                      zIndex: priceRange[1] < priceRange[0] + 10 ? 1 : 0
                    }}
                  />
                </div>
              </div>

              {/* Rating Filter */}
              <div style={{ marginBottom: '24px' }}>
                <label style={{
                  display: 'block',
                  color: 'var(--text-primary)',
                  fontWeight: '600',
                  marginBottom: '12px',
                  fontSize: '16px'
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
                        e.currentTarget.style.background = 'var(--bg-card-hover)';
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
                          color: starValue <= rating ? '#fbbf24' : 'var(--text-muted)',
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
                    width: '100%',
                    padding: '12px',
                    background: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '12px',
                    color: 'var(--text-primary)',
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
                    e.target.style.background = 'var(--bg-card-hover)';
                    e.target.style.borderColor = 'var(--primary-color)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'var(--bg-tertiary)';
                    e.target.style.borderColor = 'var(--border-color)';
                  }}
                >
                  <FiX style={{ fontSize: '16px' }} />
                  <span>Reset Filter</span>
                </button>
              )}
            </div>
          </div>

          {/* Products Grid */}
          <div>
            {loading ? (
              <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-primary)' }}>
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
            ) : products.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px' }}>
                <FiSearch style={{ fontSize: '64px', color: 'var(--text-muted)', marginBottom: '20px' }} />
                <p style={{ color: 'var(--text-muted)', fontSize: '18px' }}>Tidak ada produk ditemukan</p>
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: isSmallMobile 
                  ? '1fr' 
                  : isMobile 
                    ? 'repeat(auto-fill, minmax(200px, 1fr))' 
                    : 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: isMobile ? '20px' : '30px'
              }}>
                {products.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;

