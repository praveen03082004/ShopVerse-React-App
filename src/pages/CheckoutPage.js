// src/pages/CheckoutPage.js
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { clearCart } from '../store/CartSlice';
import OrderSummary from '../components/OrderSummary';

const INITIAL_FORM = {
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', state: '', zip: '', country: 'US',
    cardName: '', cardNumber: '', expiry: '', cvv: '',
    paymentMethod: 'card',
};

function validate(form) {
    const errors = {};
    if (!form.firstName.trim()) errors.firstName = 'First name is required';
    if (!form.lastName.trim()) errors.lastName = 'Last name is required';
    if (!form.email.trim()) errors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Invalid email address';
    if (!form.phone.trim()) errors.phone = 'Phone is required';
    if (!form.address.trim()) errors.address = 'Address is required';
    if (!form.city.trim()) errors.city = 'City is required';
    if (!form.state.trim()) errors.state = 'State is required';
    if (!form.zip.trim()) errors.zip = 'ZIP code is required';
    if (form.paymentMethod === 'card') {
        if (!form.cardName.trim()) errors.cardName = 'Cardholder name is required';
        if (!form.cardNumber.trim()) errors.cardNumber = 'Card number is required';
        else if (form.cardNumber.replace(/\s/g, '').length < 16) errors.cardNumber = 'Enter a valid 16-digit card number';
        if (!form.expiry.trim()) errors.expiry = 'Expiry is required';
        if (!form.cvv.trim()) errors.cvv = 'CVV is required';
        else if (form.cvv.length < 3) errors.cvv = 'CVV must be 3 digits';
    }
    return errors;
}

function Field({ label, name, type = 'text', placeholder, form, errors, onChange, ...rest }) {
    return (
        <div className="mb-3">
            <label className="form-label-custom">{label}</label>
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={form[name]}
                onChange={onChange}
                className={`form-control-custom ${errors[name] ? 'error' : ''}`}
                {...rest}
            />
            {errors[name] && <div className="form-error">{errors[name]}</div>}
        </div>
    );
}

function CheckoutPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { items } = useSelector((state) => state.cart);
    const [form, setForm] = useState(INITIAL_FORM);
    const [errors, setErrors] = useState({});
    const [showSuccess, setShowSuccess] = useState(false);
    const [orderId] = useState(() => 'ORD-' + Math.random().toString(36).slice(2, 8).toUpperCase());

    function handleChange(e) {
        const { name, value } = e.target;
        let formatted = value;
        // Auto-format card number
        if (name === 'cardNumber') {
            formatted = value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
        }
        // Auto-format expiry
        if (name === 'expiry') {
            formatted = value.replace(/\D/g, '').slice(0, 4).replace(/^(\d{2})(\d)/, '$1/$2');
        }
        setForm((prev) => ({ ...prev, [name]: formatted }));
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        const errs = validate(form);
        if (Object.keys(errs).length > 0) {
            setErrors(errs);
            const first = document.querySelector('.form-control-custom.error');
            if (first) first.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }
        setShowSuccess(true);
    }

    function handleSuccessClose() {
        dispatch(clearCart());
        setShowSuccess(false);
        navigate('/');
    }

    if (items.length === 0 && !showSuccess) {
        return (
            <div className="checkout-page">
                <div className="container text-center py-5">
                    <div style={{ fontSize: '4rem', marginBottom: 20 }}>🛒</div>
                    <h2 style={{ fontFamily: 'var(--font-display)', marginBottom: 12 }}>Nothing to Checkout</h2>
                    <p style={{ color: '#888', marginBottom: 24 }}>Add some items to your cart first.</p>
                    <Link to="/products" className="btn-hero">Shop Now →</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="checkout-page">
            <div className="container">
                <div className="mb-4">
                    <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 700 }}>Checkout</h1>
                    <div style={{ color: '#888', fontSize: '0.9rem' }}>
                        <Link to="/" style={{ color: '#e94560', textDecoration: 'none' }}>Home</Link> ›{' '}
                        <Link to="/cart" style={{ color: '#e94560', textDecoration: 'none' }}>Cart</Link> › Checkout
                    </div>
                </div>

                <div className="row g-4">
                    {/* Left: Form */}
                    <div className="col-lg-8">
                        <form onSubmit={handleSubmit} noValidate>

                            {/* Shipping */}
                            <div className="form-card mb-4">
                                <div className="form-section-title">📦 Shipping Information</div>
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <Field label="First Name *" name="firstName" placeholder="John" form={form} errors={errors} onChange={handleChange} />
                                    </div>
                                    <div className="col-md-6">
                                        <Field label="Last Name *" name="lastName" placeholder="Doe" form={form} errors={errors} onChange={handleChange} />
                                    </div>
                                    <div className="col-md-6">
                                        <Field label="Email Address *" name="email" type="email" placeholder="john@example.com" form={form} errors={errors} onChange={handleChange} />
                                    </div>
                                    <div className="col-md-6">
                                        <Field label="Phone Number *" name="phone" type="tel" placeholder="+1 (555) 000-0000" form={form} errors={errors} onChange={handleChange} />
                                    </div>
                                    <div className="col-12">
                                        <Field label="Street Address *" name="address" placeholder="123 Main Street, Apt 4B" form={form} errors={errors} onChange={handleChange} />
                                    </div>
                                    <div className="col-md-5">
                                        <Field label="City *" name="city" placeholder="New York" form={form} errors={errors} onChange={handleChange} />
                                    </div>
                                    <div className="col-md-3">
                                        <Field label="State *" name="state" placeholder="NY" form={form} errors={errors} onChange={handleChange} />
                                    </div>
                                    <div className="col-md-4">
                                        <Field label="ZIP Code *" name="zip" placeholder="10001" form={form} errors={errors} onChange={handleChange} />
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label-custom">Country</label>
                                        <select
                                            name="country"
                                            value={form.country}
                                            onChange={handleChange}
                                            className="form-control-custom"
                                        >
                                            <option value="US">United States</option>
                                            <option value="CA">Canada</option>
                                            <option value="GB">United Kingdom</option>
                                            <option value="AU">Australia</option>
                                            <option value="IN">India</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Payment */}
                            <div className="form-card">
                                <div className="form-section-title">💳 Payment Method</div>

                                {/* Payment Options */}
                                <div className="d-flex flex-wrap gap-3 mb-4">
                                    {[
                                        { value: 'card', label: '💳 Credit / Debit Card' },
                                        { value: 'paypal', label: '🅿️ PayPal' },
                                        { value: 'cod', label: '💵 Cash on Delivery' },
                                    ].map((opt) => (
                                        <label key={opt.value} className={`payment-option ${form.paymentMethod === opt.value ? 'selected' : ''}`}>
                                            <input
                                                type="radio"
                                                name="paymentMethod"
                                                value={opt.value}
                                                checked={form.paymentMethod === opt.value}
                                                onChange={handleChange}
                                            />
                                            <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{opt.label}</span>
                                        </label>
                                    ))}
                                </div>

                                {/* Card Fields */}
                                {form.paymentMethod === 'card' && (
                                    <div className="row g-3">
                                        <div className="col-12">
                                            <Field label="Cardholder Name *" name="cardName" placeholder="John Doe" form={form} errors={errors} onChange={handleChange} />
                                        </div>
                                        <div className="col-12">
                                            <Field label="Card Number *" name="cardNumber" placeholder="1234 5678 9012 3456" form={form} errors={errors} onChange={handleChange} maxLength={19} />
                                        </div>
                                        <div className="col-md-6">
                                            <Field label="Expiry Date *" name="expiry" placeholder="MM/YY" form={form} errors={errors} onChange={handleChange} maxLength={5} />
                                        </div>
                                        <div className="col-md-6">
                                            <Field label="CVV *" name="cvv" type="password" placeholder="•••" form={form} errors={errors} onChange={handleChange} maxLength={4} />
                                        </div>
                                        <div className="col-12">
                                            <div style={{ background: '#f0f4ff', border: '1px solid #c3d0e6', borderRadius: 8, padding: '10px 14px', fontSize: '0.8rem', color: '#666', display: 'flex', alignItems: 'center', gap: 8 }}>
                                                🔒 Your payment info is encrypted and secure. This is a demo — no real charges.
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {form.paymentMethod === 'paypal' && (
                                    <div style={{ background: '#fff8f0', border: '1px dashed #ffd6a5', borderRadius: 8, padding: '20px', textAlign: 'center', color: '#888' }}>
                                        You'll be redirected to PayPal after placing the order.
                                    </div>
                                )}
                                {form.paymentMethod === 'cod' && (
                                    <div style={{ background: '#f0fff4', border: '1px dashed #c3e6cb', borderRadius: 8, padding: '20px', textAlign: 'center', color: '#555' }}>
                                        Pay with cash when your order arrives. A small COD fee may apply.
                                    </div>
                                )}

                                {/* Submit */}
                                <button
                                    type="submit"
                                    className="btn-checkout mt-4"
                                    style={{ fontWeight: 700 }}
                                >
                                    🎉 Place Order
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Right: Summary */}
                    <div className="col-lg-4">
                        <OrderSummary showCheckoutBtn={false} />

                        {/* Items preview */}
                        <div className="form-card mt-3" style={{ padding: 20 }}>
                            <div style={{ fontWeight: 700, marginBottom: 12, fontSize: '0.95rem' }}>Items in Cart</div>
                            {items.map((item) => (
                                <div key={item.id} className="d-flex align-items-center gap-2 mb-2">
                                    <img src={item.image} alt={item.title} style={{ width: 40, height: 40, objectFit: 'contain', background: '#fafafa', borderRadius: 6, padding: 4 }} />
                                    <div style={{ flex: 1, fontSize: '0.8rem' }}>
                                        <div style={{ fontWeight: 600, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', maxWidth: 160 }}>{item.title}</div>
                                        <div style={{ color: '#888' }}>× {item.quantity}</div>
                                    </div>
                                    <div style={{ fontWeight: 700, color: '#e94560', fontSize: '0.875rem' }}>
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Success Modal */}
            {showSuccess && (
                <div className="success-overlay" onClick={handleSuccessClose}>
                    <div className="success-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="success-icon">✓</div>
                        <div className="success-title">Order Placed!</div>
                        <p className="success-msg">
                            Thank you, {form.firstName}! Your order <strong>{orderId}</strong> has been confirmed.
                            A confirmation email will be sent to <strong>{form.email}</strong>.
                        </p>
                        <button className="btn-checkout" onClick={handleSuccessClose}>
                            Back to Home
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CheckoutPage;