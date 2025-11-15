import React, { useState, useEffect } from 'react';
import { getProducts, getProductsByCategory, getCategories } from '../services/fakeStoreApi';
import ProductCard from '../components/ProductCard';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

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
        
        // Filter by search term
        if (search) {
          data = data.filter(product => 
            product.title.toLowerCase().includes(search.toLowerCase()) ||
            product.description.toLowerCase().includes(search.toLowerCase())
          );
        }
        
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, [search, category]);

  const isMobile = window.innerWidth <= 768;
  const isSmallMobile = window.innerWidth <= 480;

  return (
    <div style={{ padding: isMobile ? '20px 15px' : '40px 20px', minHeight: '80vh' }}>
      <div className="container">
        <h1 style={{ 
          marginBottom: isMobile ? '20px' : '30px', 
          fontSize: isSmallMobile ? '24px' : isMobile ? '28px' : '36px',
          color: 'var(--text-primary)'
        }}>
          Semua Produk
        </h1>
        
        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: '15px',
          marginBottom: isMobile ? '20px' : '40px'
        }}>
          <input
            type="text"
            placeholder="Cari produk..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ flex: 1, minWidth: isMobile ? '100%' : '200px' }}
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{ minWidth: isMobile ? '100%' : '150px' }}
          >
            <option value="">Semua Kategori</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>

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
            <p style={{ color: 'var(--text-muted)' }}>Tidak ada produk ditemukan</p>
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
  );
};

export default Products;

