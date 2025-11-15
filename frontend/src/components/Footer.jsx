import React from 'react';

const Footer = () => {
  const isMobile = window.innerWidth <= 768;

  return (
    <footer style={{
      background: 'var(--bg-secondary)',
      borderTop: '1px solid var(--border-color)',
      color: 'var(--text-primary)',
      padding: isMobile ? '30px 15px' : '40px 20px',
      marginTop: isMobile ? '40px' : '60px',
      backdropFilter: 'blur(20px)'
    }}>
      <div className="container" style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: isMobile ? '30px' : '40px'
      }}>
        <div>
          <h3 style={{ marginBottom: isMobile ? '12px' : '16px', fontSize: isMobile ? '18px' : '20px' }}>TokoWebMurah</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: isMobile ? '14px' : '16px' }}>
            Platform ecommerce terpercaya untuk kebutuhan Anda.
          </p>
        </div>
        <div>
          <h4 style={{ marginBottom: isMobile ? '12px' : '16px', fontSize: isMobile ? '16px' : '18px', color: 'var(--text-primary)' }}>Quick Links</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li><a href="/products" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: isMobile ? '14px' : '16px', transition: 'color 0.3s ease' }}>Products</a></li>
            <li><a href="/about" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: isMobile ? '14px' : '16px', transition: 'color 0.3s ease' }}>About</a></li>
            <li><a href="/contact" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: isMobile ? '14px' : '16px', transition: 'color 0.3s ease' }}>Contact</a></li>
          </ul>
        </div>
        <div>
          <h4 style={{ marginBottom: isMobile ? '12px' : '16px', fontSize: isMobile ? '16px' : '18px', color: 'var(--text-primary)' }}>Contact</h4>
          <p style={{ color: 'var(--text-muted)', fontSize: isMobile ? '14px' : '16px' }}>Email: info@tokowebmurah.com</p>
          <p style={{ color: 'var(--text-muted)', fontSize: isMobile ? '14px' : '16px' }}>Phone: +62 XXX XXX XXX</p>
        </div>
      </div>
      <div style={{ textAlign: 'center', marginTop: isMobile ? '30px' : '40px', paddingTop: isMobile ? '15px' : '20px', borderTop: '1px solid var(--border-color)' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: isMobile ? '12px' : '14px' }}>&copy; 2024 TokoWebMurah. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

