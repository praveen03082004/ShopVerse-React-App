// src/pages/CartPage.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearCart } from '../store/cartSlice';
import CartItem from '../components/CartItem';
import OrderSummary from '../components/OrderSummary';
import { showToast } from '../components/ToastContainer';

function CartPage() {
    const dispatch = useDispatch();
    const { items } = useSelector((state) => state.cart);

    function handleClearCart() {
        if (window.confirm('Remove all items from cart?')) {
            dispatch(clearCart());
            showToast('Cart cleared', '🗑️');
        }
    }

    if (items.length === 0) {
        return (
            <div className="cart-page">
                <div className="container">
                    <div className="empty-cart">
                        <div className="empty-cart-icon">🛒</div>
                        <h2 className="cart-header">Your Cart is Empty</h2>
                        <p style={{ color: '#888', marginBottom: 28 }}>
                            Looks like you haven't added anything yet!
                        </p>
                        <Link to="/products" className="btn-hero">
                            Start Shopping →
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-page">
            <div className="container">
                {/* Header */}
                <div className="d-flex align-items-center justify-content-between mb-4">
                    <div className="cart-header mb-0">
                        Your Cart <span style={{ color: '#888', fontSize: '1.1rem', fontWeight: 400 }}>({items.length} {items.length === 1 ? 'item' : 'items'})</span>
                    </div>
                    <button
                        onClick={handleClearCart}
                        style={{
                            background: 'none',
                            border: '1px solid #dc3545',
                            color: '#dc3545',
                            padding: '8px 18px',
                            borderRadius: 8,
                            cursor: 'pointer',
                            fontSize: '0.875rem',
                            fontWeight: 600,
                        }}
                    >
                        🗑️ Clear Cart
                    </button>
                </div>

                <div className="row g-4">
                    {/* Cart Items */}
                    <div className="col-lg-8">
                        {items.map((item) => (
                            <CartItem key={item.id} item={item} />
                        ))}
                        <div className="mt-3">
                            <Link to="/products" style={{ color: '#e94560', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}>
                                ← Continue Shopping
                            </Link>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="col-lg-4">
                        <OrderSummary />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartPage;