// src/components/ProductCard.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/CartSlice';
import { showToast } from './ToastContainer';

function StarRating({ rate }) {
    const full = Math.round(rate);
    return (
        <span style={{ color: '#f4a81d' }}>
            {'★'.repeat(full)}{'☆'.repeat(5 - full)}
        </span>
    );
}

function ProductCard({ product }) {
    const dispatch = useDispatch();
    const [added, setAdded] = useState(false);

    function handleAddToCart() {
        dispatch(addToCart(product));
        showToast(`"${product.title.slice(0, 30)}..." added to cart`);
        setAdded(true);
        setTimeout(() => setAdded(false), 1500);
    }

    return (
        <div className="product-card">
            <div className="product-img-wrap">
                <span className="product-category-tag">{product.category}</span>
                <img src={product.image} alt={product.title} loading="lazy" />
            </div>
            <div className="product-body">
                <div className="product-title">{product.title}</div>
                <div className="product-rating">
                    <StarRating rate={product.rating?.rate || 4} />
                    <span>({product.rating?.count || 0})</span>
                </div>
                <div className="product-price">${product.price.toFixed(2)}</div>
                <button
                    className={`btn-add-cart ${added ? 'added' : ''}`}
                    onClick={handleAddToCart}
                >
                    {added ? '✓ Added!' : '+ Add to Cart'}
                </button>
                <Link to={`/products/${product.id}`} className="btn-view-details">
                    View Details
                </Link>
            </div>
        </div>
    );
}

export default ProductCard;