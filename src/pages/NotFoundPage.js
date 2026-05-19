// src/pages/NotFoundPage.js
import React from 'react';
import { Link } from 'react-router-dom';

function NotFoundPage() {
    return (
        <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <div style={{ fontSize: '6rem', marginBottom: 16 }}>🔍</div>
                <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', fontWeight: 800, color: '#1a1a2e', marginBottom: 8 }}>
                    404
                </h1>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: 12 }}>
                    Page Not Found
                </h2>
                <p style={{ color: '#888', marginBottom: 28 }}>
                    The page you're looking for doesn't exist or has been moved.
                </p>
                <Link to="/" className="btn-hero me-3">Go Home</Link>
                <Link to="/products" className="btn-hero" style={{ background: 'transparent', border: '2px solid #1a1a2e', color: '#1a1a2e' }}>
                    Browse Products
                </Link>
            </div>
        </div>
    );
}

export default NotFoundPage;