import React from 'react'
import { motion } from 'framer-motion'
import { Link, useLocation } from 'wouter'
import '../index.css'
import '../refined_theme.css'

const Login = () => {
    const [, setLocation] = useLocation();

    const handleLogin = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Login success:', result);
                
                // Save user info
                localStorage.setItem('user', JSON.stringify(result.user));

                // Redirect based on role
                if (result.user.role === 'creator') {
                    setLocation('/dashboard/creator');
                } else {
                    setLocation('/dashboard/fan');
                }
            } else {
                const error = await response.json();
                alert(error.message || 'Login failed');
            }
        } catch (err) {
            console.error('Login error:', err);
            alert('An error occurred. Please try again.');
        }
    }

    return (
        <div className="modern-app" style={{ overflow: 'hidden', minHeight: '100vh', position: 'relative' }}>
            {/* Background Elements */}
            <div className="bg-blob blob-1"></div>
            <div className="bg-blob blob-2"></div>

            {/* Navigation */}
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
                        transform: 'none',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1.5rem',
                        margin: '1rem'
                    }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div style={{ textAlign: 'center' }}>
                        <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Welcome Back</h2>
                        <p style={{ color: 'var(--c-text-muted)' }}>Enter your credentials to access your account</p>
                    </div>

                    <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }} onSubmit={handleLogin}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.9rem' }}>Email</label>
                            <input type="email" name="email" placeholder="you@example.com" className="newsletter-input" required />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.9rem' }}>Password</label>
                            <input type="password" name="password" placeholder="••••••••" className="newsletter-input" required />
                        </div>

                        <button
                            className="btn-primary interactive"
                            style={{
                                background: 'var(--grad-primary)',
                                border: 'none',
                                padding: '12px',
                                marginTop: '0.5rem',
                                width: '100%',
                                fontWeight: 600
                            }}
                        >
                            Sign In
                        </button>
                    </form>

                    <div style={{ textAlign: 'center', fontSize: '0.9rem', color: 'var(--c-text-muted)' }}>
                        Don't have an account? <Link href="/register"><a href="#" style={{ color: 'var(--accent-blue)', textDecoration: 'none', fontWeight: 600 }}>Sign Up</a></Link>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default Login
