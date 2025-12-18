import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'wouter'
import '../index.css'
import '../refined_theme.css'

const Login = () => {
  return (
    <div className="modern-app" style={{ overflow: 'hidden', minHeight: '100vh', position: 'relative' }}>
        {/* Background Elements */}
      <div className="bg-blob blob-1"></div>
      <div className="bg-blob blob-2"></div>
      
      {/* Navigation - simplified for login */}
      <nav className="glass-nav" style={{ background: 'rgba(255,255,255,0.85)', justifyContent: 'space-between', padding: '1rem 2rem', display: 'flex', alignItems: 'center' }}>
        <Link href="/">
            <div className="logo interactive" style={{ cursor: 'pointer', fontWeight: 'bold', fontSize: '1.5rem' }}>Giftify.</div>
        </Link>
        <Link href="/">
            <button className="nav-item interactive" style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>Back to Home</button>
        </Link>
      </nav>

      {/* Login Container */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 80px)' }}>
        <motion.div 
            className="glass-dashboard"
            style={{ 
                maxWidth: '400px', 
                padding: '2rem', 
                borderRadius: '24px',
                transform: 'none', // Override the rotate from dashboard-mockup
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
                margin: '1rem' // Add margin for mobile responsiveness
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <div style={{ textAlign: 'center' }}>
                <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Experience Giftify</h2>
                <p style={{ color: 'var(--c-text-muted)' }}>Choose a role to explore the platform demo</p>
            </div>

            <div style={{ display: 'grid', gap: '1rem' }}>
                <Link href="/dashboard/fan">
                    <button 
                        className="interactive"
                        style={{ 
                            width: '100%',
                            padding: '1.5rem', 
                            background: '#F0F9FF', 
                            border: '2px solid #BAE6FD', 
                            borderRadius: '16px',
                            cursor: 'pointer',
                            textAlign: 'left',
                            transition: 'all 0.2s'
                        }}
                    >
                        <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🦄</div>
                        <div style={{ fontWeight: 700, color: '#0369A1', fontSize: '1.1rem' }}>Login as Fan</div>
                        <div style={{ fontSize: '0.9rem', color: '#64748B' }}>Browse creators and send secure gifts</div>
                    </button>
                </Link>

                <Link href="/dashboard/creator">
                    <button 
                        className="interactive"
                        style={{ 
                            width: '100%',
                            padding: '1.5rem', 
                            background: '#F0FDF4', 
                            border: '2px solid #BBF7D0', 
                            borderRadius: '16px',
                            cursor: 'pointer',
                            textAlign: 'left',
                            transition: 'all 0.2s'
                        }}
                    >
                        <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🦁</div>
                        <div style={{ fontWeight: 700, color: '#15803D', fontSize: '1.1rem' }}>Login as Creator</div>
                        <div style={{ fontSize: '0.9rem', color: '#64748B' }}>Manage inventory and analytics</div>
                    </button>
                </Link>
            </div>

            <div style={{ textAlign: 'center', fontSize: '0.8rem', color: '#94A3B8', marginTop: '1rem' }}>
                * This is a demo mode connected to mock APIs
            </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Login
