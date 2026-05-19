// src/components/OrderSummary.js
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function OrderSummary({ showCheckoutBtn = true }) {
    const { items, totalPrice, totalQuantity } = useSelector((state) => state.cart);
    const shipping = totalPrice > 50 ? 0 : 4.99;
    const tax = parseFloat((totalPrice * 0.08).toFixed(2));
    const grandTotal = parseFloat((totalPrice + shipping + tax).toFixed(2));

    return (
        <div className="order-summary-card">
            <div className="summary-title">Order Summary</div>

            <div className="summary-row">
                <span>Items ({totalQuantity})</span>
                <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="summary-row">
                <span>Shipping</span>
                <span style={{ color: shipping === 0 ? '#28a745' : undefined }}>
                    {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                </span>
            </div>
            <div className="summary-row">
                <span>Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
            </div>
            {shipping === 0 && (
                <div style={{ background: '#f0fff4', border: '1px solid #c3e6cb', borderRadius: 6, padding: '8px 12px', fontSize: '0.8rem', color: '#28a745', marginBottom: 8 }}>
                    🎉 You qualify for FREE shipping!
                </div>
            )}
            {shipping > 0 && totalPrice > 0 && (
                <div style={{ background: '#fff8f0', border: '1px solid #ffd6a5', borderRadius: 6, padding: '8px 12px', fontSize: '0.8rem', color: '#e07b00', marginBottom: 8 }}>
                    Add ${(50 - totalPrice).toFixed(2)} more for free shipping
                </div>
            )}

            <div className="summary-row summary-total">
                <span>Total</span>
                <span>${grandTotal.toFixed(2)}</span>
            </div>

            {showCheckoutBtn && items.length > 0 && (
                <Link to="/checkout" className="btn-checkout">
                    Proceed to Checkout →
                </Link>
            )}
            {showCheckoutBtn && items.length === 0 && (
                <button className="btn-checkout" disabled style={{ opacity: 0.5, cursor: 'not-allowed' }}>
                    Cart is Empty
                </button>
            )}
        </div>
    );
}

export default OrderSummary;