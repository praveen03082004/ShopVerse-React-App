// src/components/CartItem.js
import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart, decreaseQuantity, removeFromCart } from '../store/cartSlice';
import { showToast } from './ToastContainer';

function CartItem({ item }) {
    const dispatch = useDispatch();

    return (
        <div className="cart-item-card">
            <img src={item.image} alt={item.title} className="cart-item-img" />

            <div className="cart-item-info">
                <div className="cart-item-title">{item.title}</div>
                <div style={{ color: '#888', fontSize: '0.8rem', textTransform: 'capitalize', marginBottom: 4 }}>
                    {item.category}
                </div>
                <div className="cart-item-price">${item.price.toFixed(2)} each</div>
            </div>

            {/* Qty Controls */}
            <div className="qty-controls">
                <button
                    className="qty-btn"
                    onClick={() => dispatch(decreaseQuantity(item.id))}
                    title="Decrease"
                >−</button>
                <span className="qty-value">{item.quantity}</span>
                <button
                    className="qty-btn"
                    onClick={() => dispatch(addToCart(item))}
                    title="Increase"
                >+</button>
            </div>

            {/* Item subtotal */}
            <div style={{ minWidth: 80, textAlign: 'right' }}>
                <div style={{ fontWeight: 700, color: '#e94560', fontSize: '1.05rem' }}>
                    ${(item.price * item.quantity).toFixed(2)}
                </div>
                <div style={{ fontSize: '0.78rem', color: '#aaa' }}>subtotal</div>
            </div>

            {/* Remove */}
            <button
                className="btn-remove"
                onClick={() => {
                    dispatch(removeFromCart(item.id));
                    showToast('Item removed from cart', '🗑️');
                }}
                title="Remove item"
            >
                ✕
            </button>
        </div>
    );
}

export default CartItem;