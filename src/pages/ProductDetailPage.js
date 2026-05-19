// src/pages/ProductDetailPage.js
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById, clearSelectedProduct } from '../store/ProductSlice';
import { addToCart } from '../store/CartSlice';
import { showToast } from '../components/ToastContainer';
import Spinner from '../components/Spinner';

function StarRating({ rate }) {
    const full = Math.round(rate);
    return (
        <>
            <span className="stars">{'★'.repeat(full)}{'☆'.repeat(5 - full)}</span>
        </>
    );
}

function ProductDetailPage() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { selectedProduct: product, loading } = useSelector((state) => state.products);
    const cartItems = useSelector((state) => state.cart.items);
    const inCart = product && cartItems.some((i) => i.id === product.id);

    useEffect(() => {
        dispatch(fetchProductById(id));
        return () => dispatch(clearSelectedProduct());
    }, [dispatch, id]);

    function handleAddToCart() {
        dispatch(addToCart(product));
        showToast('Added to cart!');
    }

    if (loading) return <div className="container pt-5"><Spinner message="Loading product..." /></div>;

    if (!product) return (
        <div className="container text-center py-5">
            <div style={{ fontSize: '3rem' }}>😕</div>
            <h3>Product not found</h3>
            <Link to="/products" className="btn-hero mt-3 d-inline-block">Back to Products</Link>
        </div>
    );

    return (
        <section className="product-detail-page">
            <div className="container">
                {/* Breadcrumb */}
                <div className="breadcrumb-custom">
                    <Link to="/">Home</Link> › <Link to="/products">Products</Link> › {product.title.slice(0, 30)}...
                </div>

                <div className="row g-5">
                    {/* Image */}
                    <div className="col-md-5">
                        <div className="detail-img-wrap">
                            <img src={product.image} alt={product.title} />
                        </div>
                    </div>

                    {/* Info */}
                    <div className="col-md-7">
                        <div className="detail-category">{product.category}</div>
                        <div className="detail-title">{product.title}</div>

                        <div className="detail-rating">
                            <StarRating rate={product.rating?.rate || 4} />
                            <span className="rating-count">
                                {product.rating?.rate} ({product.rating?.count} reviews)
                            </span>
                        </div>

                        <div className="detail-price">${product.price.toFixed(2)}</div>

                        <p className="detail-description">{product.description}</p>

                        {/* Badges */}
                        <div className="d-flex flex-wrap gap-2 mb-4">
                            <span style={{ background: '#f0fff4', color: '#28a745', border: '1px solid #c3e6cb', padding: '4px 12px', borderRadius: 50, fontSize: '0.8rem', fontWeight: 600 }}>
                                ✓ In Stock
                            </span>
                            <span style={{ background: '#fff8f0', color: '#e07b00', border: '1px solid #ffd6a5', padding: '4px 12px', borderRadius: 50, fontSize: '0.8rem', fontWeight: 600 }}>
                                🚚 Free Shipping on $50+
                            </span>
                            <span style={{ background: '#f0f4ff', color: '#0f3460', border: '1px solid #c3d0e6', padding: '4px 12px', borderRadius: 50, fontSize: '0.8rem', fontWeight: 600 }}>
                                ↩️ 30-Day Returns
                            </span>
                        </div>

                        <div className="d-flex gap-3 flex-wrap">
                            <button
                                className="btn-add-detail"
                                onClick={handleAddToCart}
                                style={inCart ? { background: '#28a745' } : {}}
                            >
                                {inCart ? '✓ In Cart — Add Again' : '🛒 Add to Cart'}
                            </button>
                            <Link
                                to="/cart"
                                style={{
                                    padding: '14px 28px',
                                    border: '2px solid #1a1a2e',
                                    borderRadius: 8,
                                    color: '#1a1a2e',
                                    fontWeight: 700,
                                    textDecoration: 'none',
                                    fontSize: '1rem',
                                    transition: 'all 0.2s',
                                }}
                            >
                                View Cart
                            </Link>
                        </div>
                    </div>
                </div>

                {/* You might also like section placeholder */}
                <div className="mt-5">
                    <div className="section-title" style={{ fontSize: '1.5rem' }}>You Might Also Like</div>
                    <div className="section-subtitle">Browse more from {product.category}</div>
                    <Link to={`/products`} className="btn-hero d-inline-block mt-2" style={{ fontSize: '0.9rem', padding: '10px 24px' }}>
                        Browse {product.category} →
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default ProductDetailPage;