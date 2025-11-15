import React from 'react';

const Footer = () => {
  const isMobile = window.innerWidth <= 768;

  return (
    <footer style={{
      background: 'rgba(26, 31, 58, 0.9)',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      color: 'var(--text-primary)',
      padding: isMobile ? '30px 15px' : '40px 20px',
      marginTop: isMobile ? '40px' : '60px',
      backdropFilter: 'blur(30px)',
      boxShadow: '0 -8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
    }}>
      <div className="container" style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: isMobile ? '30px' : '40px'
      }}>
        <div>
          <h3 style={{ marginBottom: isMobile ? '12px' : '16px', fontSize: isMobile ? '18px' : '20px' }}>TokoApaIni</h3>
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
          <p style={{ color: 'var(--text-muted)', fontSize: isMobile ? '14px' : '16px' }}>Email: info@tokoapaini.com</p>
          <p style={{ color: 'var(--text-muted)', fontSize: isMobile ? '14px' : '16px' }}>Phone: +62 XXX XXX XXX</p>
        </div>
      </div>
      <div style={{ textAlign: 'center', marginTop: isMobile ? '30px' : '40px', paddingTop: isMobile ? '15px' : '20px', borderTop: '1px solid var(--border-color)' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: isMobile ? '12px' : '14px' }}>&copy; 2024 TokoApaIni. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

