// src/components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="row g-4">
                    <div className="col-md-4">
                        <div className="footer-brand">Shop<span>Verse</span></div>
                        <p className="footer-desc">
                            Your one-stop destination for quality products at great prices.
                            Shop confidently with fast shipping and easy returns.
                        </p>
                    </div>
                    <div className="col-md-2">
                        <div className="footer-heading">Shop</div>
                        <Link to="/products" className="footer-link">All Products</Link>
                        <Link to="/products?cat=electronics" className="footer-link">Electronics</Link>
                        <Link to="/products?cat=jewelery" className="footer-link">Jewelery</Link>
                        <Link to="/products?cat=men's clothing" className="footer-link">Men's</Link>
                    </div>
                    <div className="col-md-2">
                        <div className="footer-heading">Account</div>
                        <Link to="/cart" className="footer-link">My Cart</Link>
                        <Link to="/checkout" className="footer-link">Checkout</Link>
                    </div>
                    <div className="col-md-4">
                        <div className="footer-heading">Newsletter</div>
                        <p className="footer-desc mb-3">Get updates on deals and new arrivals.</p>
                        <div className="d-flex gap-2">
                            <input
                                type="email"
                                placeholder="Your email"
                                style={{
                                    flex: 1,
                                    padding: '9px 14px',
                                    borderRadius: '6px',
                                    border: 'none',
                                    fontSize: '0.875rem',
                                    outline: 'none',
                                }}
                            />
                            <button
                                style={{
                                    background: '#e94560',
                                    color: '#fff',
                                    border: 'none',
                                    padding: '9px 18px',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    fontWeight: 600,
                                    fontSize: '0.875rem',
                                }}
                            >
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    © {new Date().getFullYear()} ShopVerse. Built for interview demo purposes · Powered by FakeStore API
                </div>
            </div>
        </footer>
    );
}

export default Footer;