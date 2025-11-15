import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getUserById, getCarts } from '../services/fakeStoreApi';
import { FiUser, FiMail, FiPhone, FiMapPin, FiShoppingBag } from 'react-icons/fi';

const UserProfile = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user?.id) {
        try {
          const data = await getUserById(user.id);
          setUserData(data);
          
          // Fetch user orders/carts
          const carts = await getCarts(user.id);
          setOrders(carts);
        } catch (error) {
          console.error('Error fetching user data:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [user]);

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

  if (!user) {
    return (
      <div style={{ textAlign: 'center', padding: '60px' }}>
        <p style={{ marginBottom: '20px', color: 'var(--text-secondary)' }}>Please login to view your profile</p>
        <Link to="/login" className="btn btn-primary">Login</Link>
      </div>
    );
  }

  const isMobile = window.innerWidth <= 768;
  const isSmallMobile = window.innerWidth <= 480;

  return (
    <div style={{ padding: isMobile ? '20px 15px' : '40px 20px', minHeight: '80vh' }}>
      <div className="container">
        <h1 style={{ 
          marginBottom: isMobile ? '20px' : '30px', 
          fontSize: isSmallMobile ? '24px' : isMobile ? '28px' : '36px' 
        }}>
          Profil Saya
        </h1>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '350px 1fr',
          gap: isMobile ? '20px' : '30px'
        }}>
          {/* User Info Card */}
          <div className="card">
            <div style={{ textAlign: 'center', marginBottom: isMobile ? '20px' : '30px' }}>
              <div style={{
                width: isMobile ? '80px' : '120px',
                height: isMobile ? '80px' : '120px',
                borderRadius: '50%',
                background: 'var(--primary-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
                fontSize: isMobile ? '36px' : '48px',
                color: 'var(--text-primary)'
              }}>
                <FiUser />
              </div>
              <h2 style={{ fontSize: isMobile ? '18px' : '20px', color: 'var(--text-primary)' }}>
                {userData?.name?.firstname} {userData?.name?.lastname}
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: isMobile ? '14px' : '16px' }}>
                @{userData?.username || user.username}
              </p>
            </div>

            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
              <div style={{ marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: isMobile ? '14px' : '16px', color: 'var(--text-secondary)' }}>
                <FiMail style={{ color: 'var(--text-muted)' }} />
                <span style={{ wordBreak: 'break-word' }}>{userData?.email || user.email}</span>
              </div>
              {userData?.phone && (
                <div style={{ marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: isMobile ? '14px' : '16px', color: 'var(--text-secondary)' }}>
                  <FiPhone style={{ color: 'var(--text-muted)' }} />
                  <span>{userData.phone}</span>
                </div>
              )}
              {userData?.address && (
                <div style={{ marginBottom: '15px', display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: isMobile ? '14px' : '16px', color: 'var(--text-secondary)' }}>
                  <FiMapPin style={{ color: 'var(--text-muted)', marginTop: '5px' }} />
                  <div>
                    <p>{userData.address.street}, {userData.address.number}</p>
                    <p>{userData.address.city}, {userData.address.zipcode}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Orders Section */}
          <div>
            <h2 style={{ 
              marginBottom: isMobile ? '15px' : '20px', 
              fontSize: isMobile ? '20px' : '24px',
              color: 'var(--text-primary)'
            }}>
              Riwayat Pesanan
            </h2>
            
            {orders.length === 0 ? (
              <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
                <FiShoppingBag style={{ fontSize: '48px', color: 'var(--text-muted)', marginBottom: '15px' }} />
                <p style={{ color: 'var(--text-muted)' }}>Belum ada pesanan</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {orders.map((order) => (
                  <div key={order.id} className="card">
                    <div style={{ 
                      display: 'flex', 
                      flexDirection: isMobile ? 'column' : 'row',
                      justifyContent: 'space-between', 
                      marginBottom: '15px',
                      gap: isMobile ? '10px' : '0'
                    }}>
                      <div>
                        <h3 style={{ marginBottom: '5px', fontSize: isMobile ? '16px' : '18px', color: 'var(--text-primary)' }}>Order #{order.id}</h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: isMobile ? '12px' : '14px' }}>
                          {new Date(order.date).toLocaleDateString('id-ID', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                      <div style={{ textAlign: isMobile ? 'left' : 'right' }}>
                        <p style={{ fontSize: isMobile ? '18px' : '20px', fontWeight: 'bold', color: 'var(--primary-color)' }}>
                          ${order.products?.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2) || '0.00'}
                        </p>
                        <p style={{ color: 'var(--text-muted)', fontSize: isMobile ? '12px' : '14px' }}>
                          {order.products?.length || 0} items
                        </p>
                      </div>
                    </div>
                    <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '15px' }}>
                      {order.products?.slice(0, 3).map((item, idx) => (
                        <div key={idx} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                          <img 
                            src={item.image} 
                            alt={item.title}
                            style={{ 
                              width: isMobile ? '40px' : '50px', 
                              height: isMobile ? '40px' : '50px', 
                              objectFit: 'cover', 
                              borderRadius: '4px' 
                            }}
                          />
                          <div style={{ flex: 1 }}>
                            <p style={{ fontSize: isMobile ? '12px' : '14px', marginBottom: '5px', color: 'var(--text-primary)' }}>{item.title}</p>
                            <p style={{ fontSize: isMobile ? '11px' : '12px', color: 'var(--text-muted)' }}>
                              Qty: {item.quantity} × ${item.price.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                      {order.products?.length > 3 && (
                        <p style={{ color: 'var(--text-muted)', fontSize: isMobile ? '12px' : '14px', marginTop: '10px' }}>
                          +{order.products.length - 3} more items
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

