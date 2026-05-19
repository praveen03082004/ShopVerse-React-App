// src/components/Navbar.js
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Navbar() {
    const totalQuantity = useSelector((state) => state.cart.totalQuantity);
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="navbar-custom">
            <div className="container">
                <div className="d-flex align-items-center justify-content-between">
                    {/* Brand */}
                    <Link to="/" className="navbar-brand-custom">
                        Shop<span>Verse</span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="d-none d-md-flex align-items-center gap-1">
                        <NavLink to="/" className={({ isActive }) => 'nav-link-custom' + (isActive ? ' active' : '')} end>Home</NavLink>
                        <NavLink to="/products" className={({ isActive }) => 'nav-link-custom' + (isActive ? ' active' : '')}>Products</NavLink>
                        <NavLink to="/cart" className={({ isActive }) => 'nav-link-custom' + (isActive ? ' active' : '')}>
                            🛒 Cart
                            {totalQuantity > 0 && (
                                <span className="cart-badge">{totalQuantity}</span>
                            )}
                        </NavLink>
                    </div>

                    {/* Mobile Hamburger */}
                    <button
                        className="d-md-none"
                        style={{ background: 'none', border: 'none', color: '#fff', fontSize: '1.5rem', cursor: 'pointer' }}
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        {menuOpen ? '✕' : '☰'}
                    </button>
                </div>

                {/* Mobile Menu */}
                {menuOpen && (
                    <div className="d-md-none mt-2 pb-2" style={{ borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: '12px' }}>
                        <NavLink to="/" className="nav-link-custom d-block mb-1" onClick={() => setMenuOpen(false)} end>Home</NavLink>
                        <NavLink to="/products" className="nav-link-custom d-block mb-1" onClick={() => setMenuOpen(false)}>Products</NavLink>
                        <NavLink to="/cart" className="nav-link-custom d-block" onClick={() => setMenuOpen(false)}>
                            🛒 Cart {totalQuantity > 0 && <span className="cart-badge">{totalQuantity}</span>}
                        </NavLink>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;