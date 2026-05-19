// src/pages/HomePage.js
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/productSlice';
import ProductCard from '../components/ProductCard';
import Spinner from '../components/Spinner';

const FEATURES = [
    { icon: '🚚', title: 'Free Shipping', desc: 'On orders over $50' },
    { icon: '↩️', title: 'Easy Returns', desc: '30-day return policy' },
    { icon: '🔒', title: 'Secure Payment', desc: '100% secure checkout' },
    { icon: '🎁', title: 'Gift Cards', desc: 'For every occasion' },
];

function HomePage() {
    const dispatch = useDispatch();
    const { items, loading } = useSelector((state) => state.products);

    useEffect(() => {
        if (items.length === 0) dispatch(fetchProducts());
    }, [dispatch, items.length]);

    // Featured = first 4 items
    const featured = items.slice(0, 4);
    // Best sellers = items 4-8
    const bestSellers = items.slice(4, 8);

    return (
        <>
            {/* Hero */}
            <section className="hero-section">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-7">
                            <div className="hero-title">
                                Discover Products<br />
                                You'll <span className="accent">Love</span>
                            </div>
                            <p className="hero-subtitle">
                                Shop thousands of curated products across electronics, fashion,
                                jewelry and more — all at amazing prices.
                            </p>
                            <Link to="/products" className="btn-hero me-3">
                                Shop Now →
                            </Link>
                            <Link to="/cart" className="btn-hero" style={{ background: 'transparent', border: '2px solid rgba(255,255,255,0.5)' }}>
                                View Cart
                            </Link>
                        </div>
                        <div className="col-md-5 d-none d-md-flex justify-content-center">
                            <div style={{ fontSize: '9rem', filter: 'drop-shadow(0 8px 32px rgba(233,69,96,0.3))' }}>🛍️</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <div className="stats-bar">
                <div className="container">
                    <div className="row">
                        {[
                            { num: '10K+', label: 'Products' },
                            { num: '50K+', label: 'Customers' },
                            { num: '4.8★', label: 'Avg Rating' },
                            { num: '99%', label: 'Satisfaction' },
                        ].map((s) => (
                            <div key={s.label} className="col-3 stat-item">
                                <div className="stat-number">{s.num}</div>
                                <div className="stat-label">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Features */}
            <section style={{ padding: '48px 0', background: '#fff' }}>
                <div className="container">
                    <div className="row g-3">
                        {FEATURES.map((f) => (
                            <div key={f.title} className="col-6 col-md-3">
                                <div style={{ textAlign: 'center', padding: '20px 12px' }}>
                                    <div style={{ fontSize: '2rem', marginBottom: 10 }}>{f.icon}</div>
                                    <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: 4 }}>{f.title}</div>
                                    <div style={{ color: '#888', fontSize: '0.8rem' }}>{f.desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section style={{ padding: '56px 0' }}>
                <div className="container">
                    <div className="d-flex align-items-end justify-content-between mb-2">
                        <div>
                            <div className="section-title">Featured Products</div>
                            <div className="section-subtitle">Handpicked for you</div>
                        </div>
                        <Link to="/products" style={{ color: '#e94560', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}>
                            View All →
                        </Link>
                    </div>

                    {loading ? (
                        <Spinner message="Fetching products from API..." />
                    ) : (
                        <div className="row g-3">
                            {featured.map((p) => (
                                <div key={p.id} className="col-6 col-md-3">
                                    <ProductCard product={p} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Banner */}
            <section style={{ background: 'linear-gradient(135deg, #1a1a2e, #0f3460)', padding: '56px 0' }}>
                <div className="container text-center text-white">
                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
                        Summer Sale — Up to <span style={{ color: '#e94560' }}>40% OFF</span>
                    </h2>
                    <p style={{ opacity: 0.8, marginBottom: 24 }}>Limited time offer on selected items. Don't miss out!</p>
                    <Link to="/products" className="btn-hero">Shop the Sale →</Link>
                </div>
            </section>

            {/* Best Sellers */}
            <section style={{ padding: '56px 0' }}>
                <div className="container">
                    <div className="d-flex align-items-end justify-content-between mb-2">
                        <div>
                            <div className="section-title">Best Sellers</div>
                            <div className="section-subtitle">Most popular this week</div>
                        </div>
                        <Link to="/products" style={{ color: '#e94560', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}>
                            View All →
                        </Link>
                    </div>
                    {loading ? (
                        <Spinner />
                    ) : (
                        <div className="row g-3">
                            {bestSellers.map((p) => (
                                <div key={p.id} className="col-6 col-md-3">
                                    <ProductCard product={p} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}

export default HomePage;