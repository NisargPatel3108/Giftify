import React, { useState } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import { Search, Filter, Star, Gift } from 'lucide-react'

const FanDashboard = () => {
  const categories = ['All', 'Gaming', 'Music', 'Tech', 'Lifestyle']
  const [activeCat, setActiveCat] = useState('All')

  const creators = [
    { id: 1, name: 'Marques Brownlee', handle: '@mkbhd', category: 'Tech', avatar: '📱', verified: true },
    { id: 2, name: 'PewDiePie', handle: '@pewdiepie', category: 'Gaming', avatar: '🎮', verified: true },
    { id: 3, name: 'Taylor Swift', handle: '@taylor', category: 'Music', avatar: '🎤', verified: true },
    { id: 4, name: 'MrBeast', handle: '@mrbeast', category: 'Lifestyle', avatar: '💰', verified: true },
    { id: 5, name: 'TenZ', handle: '@tenz', category: 'Gaming', avatar: '🖱️', verified: true },
    { id: 6, name: 'Casey Neistat', handle: '@casey', category: 'Lifestyle', avatar: '🛹', verified: true },
  ]

  const filteredCreators = activeCat === 'All' 
    ? creators 
    : creators.filter(c => c.category === activeCat)

  const [user, setUser] = useState(null)
  
  React.useEffect(() => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  return (
    <DashboardLayout role="fan">
        {/* Welcome Header */}
        <div style={{ marginBottom: '2rem' }}>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>
                Welcome back, {user ? user.firstName : 'Super Fan'}! 👋
            </h1>
            <p style={{ color: '#64748B' }}>Discover creators and send love instantly.</p>
        </div>
        {/* Search & Filter */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
            <div style={{ position: 'relative', flex: 1 }}>
                <Search size={18} style={{ position: 'absolute', left: 14, top: 12, color: '#94A3B8' }} />
                <input 
                    type="text" 
                    placeholder="Search creators..." 
                    style={{ 
                        width: '100%', 
                        padding: '10px 10px 10px 42px', 
                        borderRadius: '12px', 
                        border: '1px solid #E2E8F0',
                        fontSize: '0.95rem'
                    }} 
                />
            </div>
            <button className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'white' }}>
                <Filter size={18} /> Filters
            </button>
        </div>

        {/* Categories */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
            {categories.map(cat => (
                <button
                    key={cat}
                    onClick={() => setActiveCat(cat)}
                    style={{
                        padding: '8px 16px',
                        borderRadius: '99px',
                        border: 'none',
                        background: activeCat === cat ? '#111' : 'white',
                        color: activeCat === cat ? 'white' : '#64748B',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        fontWeight: 500,
                        boxShadow: activeCat === cat ? '0 4px 12px rgba(0,0,0,0.1)' : 'none',
                        transition: 'all 0.2s'
                    }}
                >
                    {cat}
                </button>
            ))}
        </div>

        {/* Creators Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {filteredCreators.map(creator => (
                <div 
                    key={creator.id} 
                    className="creator-card"
                    style={{
                        background: 'white',
                        padding: '1.5rem',
                        borderRadius: '16px',
                        border: '1px solid #E2E8F0',
                        textAlign: 'center',
                        transition: 'transform 0.2s, box-shadow 0.2s',
                        cursor: 'pointer'
                    }}
                    onMouseEnter={e => {
                        e.currentTarget.style.transform = 'translateY(-4px)'
                        e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(0,0,0,0.1)'
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.transform = 'translateY(0)'
                        e.currentTarget.style.boxShadow = 'none'
                    }}
                >
                    <div style={{ width: 80, height: 80, margin: '0 auto 1rem', background: '#F1F5F9', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem' }}>
                        {creator.avatar}
                    </div>
                    <div style={{ fontWeight: 700, fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                        {creator.name}
                        {creator.verified && <span style={{ color: '#3B82F6', fontSize: '1rem' }}>✓</span>}
                    </div>
                    <div style={{ color: '#64748B', fontSize: '0.9rem', marginBottom: '1.5rem' }}>{creator.handle}</div>
                    
                    <button 
                        style={{
                            width: '100%',
                            padding: '10px',
                            background: '#EFF6FF',
                            color: '#3B82F6',
                            border: 'none',
                            borderRadius: '10px',
                            fontWeight: 600,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            cursor: 'pointer'
                        }}
                    >
                        <Gift size={18} /> Send Gift
                    </button>
                </div>
            ))}
        </div>
    </DashboardLayout>
  )
}

export default FanDashboard
