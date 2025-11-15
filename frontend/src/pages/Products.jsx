import React, { useState, useEffect, useRef } from 'react';
import { getProducts, getProductsByCategory, getCategories } from '../services/fakeStoreApi';
import ProductCard from '../components/ProductCard';
import { FiFilter, FiX, FiStar } from 'react-icons/fi';

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
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        let data;
        if (category) {
          data = await getProductsByCategory(category);
        } else {
          data = await getProducts();
        }
        setAllProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, [category]);

  useEffect(() => {
    // Calculate price range from all products
    if (allProducts.length > 0) {
      const prices = allProducts.map(p => p.price);
      const min = Math.floor(Math.min(...prices));
      const max = Math.ceil(Math.max(...prices));
      setMinPrice(min);
      setMaxPrice(max);
      setPriceRange([min, max]);
    }
  }, [allProducts]);

  useEffect(() => {
    // Apply all filters
    let filtered = [...allProducts];

    // Search filter
    if (search) {
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
  }, [search, priceRange, rating, sortBy, allProducts]);

  const handlePriceRangeChange = (index, value) => {
    const newRange = [...priceRange];
    newRange[index] = parseFloat(value);
    
    // Ensure min doesn't exceed max and vice versa
    if (index === 0 && newRange[0] > newRange[1]) {
      newRange[0] = newRange[1];
    }
    if (index === 1 && newRange[1] < newRange[0]) {
      newRange[1] = newRange[0];
    }
    
    setPriceRange(newRange);
  };

  const resetFilters = () => {
    setSearch('');
    setCategory('');
    setRating(0);
    setSortBy('default');
    if (allProducts.length > 0) {
      const prices = allProducts.map(p => p.price);
      const min = Math.floor(Math.min(...prices));
      const max = Math.ceil(Math.max(...prices));
      setPriceRange([min, max]);
    }
  };

  const FilterSidebar = () => (
    <div style={{
      background: 'var(--bg-card)',
      border: '1px solid var(--border-color)',
      borderRadius: '16px',
      padding: '24px',
      marginBottom: isMobile ? '20px' : 0,
      position: isMobile ? 'fixed' : 'sticky',
      top: isMobile ? 0 : '100px',
      maxHeight: isMobile ? '100vh' : 'calc(100vh - 120px)',
      overflowY: 'auto',
      zIndex: isMobile ? 1000 : 1,
      width: isMobile ? '100%' : '280px',
      left: isMobile ? 0 : 'auto',
      right: isMobile ? 0 : 'auto',
      animation: isMobile ? 'slideIn 0.3s ease-out' : 'none'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px'
      }}>
        <h3 style={{ color: 'var(--text-primary)', fontSize: '20px', fontWeight: '600' }}>
          Filter Produk
        </h3>
        {isMobile && (
          <button
            onClick={() => setShowFilter(false)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-primary)',
              fontSize: '24px',
              cursor: 'pointer',
              padding: '4px'
            }}
          >
            <FiX />
          </button>
        )}
      </div>

      {/* Price Range */}
      <div style={{ marginBottom: '24px' }}>
        <label style={{
          display: 'block',
          color: 'var(--text-primary)',
          fontWeight: '500',
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
            className="price-slider price-slider-min"
            style={{
              width: '100%',
              height: '8px',
              cursor: 'pointer'
            }}
          />
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '4px',
            fontSize: '12px',
            color: 'var(--text-muted)'
          }}>
            <span>${minPrice.toFixed(2)}</span>
            <span>${priceRange[1].toFixed(2)}</span>
          </div>
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
            className="price-slider price-slider-max"
            style={{
              width: '100%',
              height: '8px',
              cursor: 'pointer'
            }}
          />
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '4px',
            fontSize: '12px',
            color: 'var(--text-muted)'
          }}>
            <span>${priceRange[0].toFixed(2)}</span>
            <span>${maxPrice.toFixed(2)}</span>
          </div>
        </div>

        {/* Current Range Display */}
        <div style={{
          marginTop: '20px',
          padding: '12px',
          background: 'var(--bg-secondary)',
          borderRadius: '8px',
          border: '1px solid var(--border-color)',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '12px',
            color: 'var(--text-muted)',
            marginBottom: '4px'
          }}>
            Range yang dipilih
          </div>
          <div style={{
            fontSize: '18px',
            fontWeight: '600',
            color: 'var(--text-primary)'
          }}>
            ${priceRange[0].toFixed(2)} - ${priceRange[1].toFixed(2)}
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div style={{ marginBottom: '24px' }}>
        <label style={{
          display: 'block',
          color: 'var(--text-primary)',
          fontWeight: '500',
          marginBottom: '12px',
          fontSize: '16px'
        }}>
          Kategori
        </label>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          maxHeight: '200px',
          overflowY: 'auto'
        }}>
          <label style={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            padding: '8px',
            borderRadius: '8px',
            transition: 'background 0.2s',
            color: 'var(--text-secondary)'
          }}
          onMouseEnter={(e) => e.target.style.background = 'var(--bg-secondary)'}
          onMouseLeave={(e) => e.target.style.background = 'transparent'}
          >
            <input
              type="radio"
              name="category"
              value=""
              checked={category === ''}
              onChange={(e) => setCategory(e.target.value)}
              style={{ marginRight: '8px', cursor: 'pointer' }}
            />
            Semua Kategori
          </label>
          {categories.map(cat => (
            <label
              key={cat}
              style={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                padding: '8px',
                borderRadius: '8px',
                transition: 'background 0.2s',
                color: 'var(--text-secondary)'
              }}
              onMouseEnter={(e) => e.target.style.background = 'var(--bg-secondary)'}
              onMouseLeave={(e) => e.target.style.background = 'transparent'}
            >
              <input
                type="radio"
                name="category"
                value={cat}
                checked={category === cat}
                onChange={(e) => setCategory(e.target.value)}
                style={{ marginRight: '8px', cursor: 'pointer' }}
              />
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </label>
          ))}
        </div>
      </div>

      {/* Rating Filter */}
      <div style={{ marginBottom: '24px' }}>
        <label style={{
          display: 'block',
          color: 'var(--text-primary)',
          fontWeight: '500',
          marginBottom: '12px',
          fontSize: '16px'
        }}>
          Rating Minimum
        </label>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          flexWrap: 'wrap'
        }}>
          {[1, 2, 3, 4, 5].map((starValue) => (
            <button
              key={starValue}
              onClick={() => {
                // Jika klik bintang yang sama, reset ke 0
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
                padding: '4px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                transition: 'all 0.2s ease',
                outline: 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--bg-secondary)';
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.transform = 'scale(1)';
              }}
              title={`Rating ${starValue} ke atas`}
            >
              <FiStar
                style={{
                  fontSize: '28px',
                  color: starValue <= rating ? '#fbbf24' : 'var(--text-muted)',
                  fill: starValue <= rating ? '#fbbf24' : 'transparent',
                  strokeWidth: starValue <= rating ? 0 : 1.5,
                  transition: 'all 0.2s ease',
                  filter: starValue <= rating ? 'drop-shadow(0 2px 4px rgba(251, 191, 36, 0.4))' : 'none'
                }}
              />
            </button>
          ))}
          {rating > 0 && (
            <button
              onClick={() => setRating(0)}
              style={{
                marginLeft: '8px',
                padding: '6px 12px',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                color: 'var(--text-secondary)',
                fontSize: '12px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                outline: 'none'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'var(--bg-tertiary)';
                e.target.style.borderColor = 'var(--primary-color)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'var(--bg-secondary)';
                e.target.style.borderColor = 'var(--border-color)';
              }}
            >
              Reset
            </button>
          )}
        </div>
        {rating > 0 && (
          <div style={{
            marginTop: '8px',
            fontSize: '14px',
            color: 'var(--text-secondary)'
          }}>
            Menampilkan produk dengan rating {rating} bintang ke atas
          </div>
        )}
      </div>

      {/* Reset Button */}
      <button
        onClick={resetFilters}
        className="btn btn-outline"
        style={{
          width: '100%',
          marginTop: '8px'
        }}
      >
        Reset Filter
      </button>
    </div>
  );

  return (
    <div style={{ padding: isMobile ? '20px 15px' : '40px 20px', minHeight: '80vh' }}>
      <div className="container">
        {/* Header with Search and Filter Toggle */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
          flexWrap: 'wrap',
          gap: '15px'
        }}>
          <h1 style={{
            fontSize: isMobile ? '24px' : '36px',
            color: 'var(--text-primary)',
            margin: 0
          }}>
            Semua Produk
          </h1>
          <div style={{
            display: 'flex',
            gap: '12px',
            alignItems: 'center',
            width: isMobile ? '100%' : 'auto'
          }}>
            <input
              type="text"
              placeholder="Cari produk..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                flex: 1,
                minWidth: isMobile ? '100%' : '250px',
                padding: '12px 16px',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: '12px',
                color: 'var(--text-primary)',
                fontSize: '14px'
              }}
            />
            {isMobile && (
              <button
                onClick={() => setShowFilter(!showFilter)}
                className="btn btn-primary"
                style={{
                  padding: '12px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <FiFilter />
                Filter
              </button>
            )}
          </div>
        </div>

        {/* Sort By */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
              Urutkan:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: '8px 12px',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                color: 'var(--text-primary)',
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              <option value="default">Default</option>
              <option value="price-low">Harga: Rendah ke Tinggi</option>
              <option value="price-high">Harga: Tinggi ke Rendah</option>
              <option value="rating">Rating Tertinggi</option>
              <option value="name">Nama A-Z</option>
            </select>
          </div>
          <div style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
            {products.length} produk ditemukan
          </div>
        </div>

        {/* Mobile Filter Overlay */}
        {isMobile && showFilter && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.7)',
            zIndex: 999,
            animation: 'fadeIn 0.3s ease-out'
          }} onClick={() => setShowFilter(false)} />
        )}

        {/* Main Content */}
        <div style={{
          display: 'flex',
          gap: '24px',
          alignItems: 'flex-start'
        }}>
          {/* Desktop Filter Sidebar */}
          {!isMobile && <FilterSidebar />}

          {/* Mobile Filter Sidebar */}
          {isMobile && showFilter && <FilterSidebar />}

          {/* Products Grid */}
          <div style={{ flex: 1 }}>
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
                <p style={{ color: 'var(--text-muted)', fontSize: '18px' }}>
                  Tidak ada produk ditemukan
                </p>
                <button
                  onClick={resetFilters}
                  className="btn btn-outline"
                  style={{ marginTop: '20px' }}
                >
                  Reset Filter
                </button>
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile
                  ? '1fr'
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
