// src/pages/ProductsPage.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchProducts,
    fetchCategories,
    setActiveCategory,
    setSearchQuery,
} from '../store/productSlice';
import ProductCard from '../components/ProductCard';
import Spinner from '../components/Spinner';

function ProductsPage() {
    const dispatch = useDispatch();
    const { items, loading, error, categories, activeCategory, searchQuery } =
        useSelector((state) => state.products);

    useEffect(() => {
        if (items.length === 0) dispatch(fetchProducts());
        if (categories.length === 0) dispatch(fetchCategories());
    }, [dispatch, items.length, categories.length]);

    // Filter by category + search
    const filtered = items.filter((p) => {
        const matchCat = activeCategory === 'all' || p.category === activeCategory;
        const matchSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchCat && matchSearch;
    });

    return (
        <section style={{ padding: '40px 0 60px' }}>
            <div className="container">
                {/* Page Header */}
                <div className="mb-4">
                    <div className="section-title">All Products</div>
                    <div className="section-subtitle">
                        {loading ? 'Loading...' : `${filtered.length} products found`}
                    </div>
                </div>

                {/* Controls Row */}
                <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
                    {/* Search */}
                    <div className="search-wrapper">
                        <span className="search-icon">🔍</span>
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                        />
                    </div>

                    {/* Category Filters */}
                    <div className="d-flex flex-wrap gap-2">
                        <button
                            className={`category-btn ${activeCategory === 'all' ? 'active' : ''}`}
                            onClick={() => dispatch(setActiveCategory('all'))}
                        >
                            All
                        </button>
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                className={`category-btn ${activeCategory === cat ? 'active' : ''}`}
                                onClick={() => dispatch(setActiveCategory(cat))}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Error */}
                {error && (
                    <div className="alert alert-danger" role="alert">
                        ⚠️ Failed to load products: {error}. Please check your internet connection.
                    </div>
                )}

                {/* Products Grid */}
                {loading ? (
                    <Spinner message="Fetching products from FakeStore API..." />
                ) : filtered.length === 0 ? (
                    <div className="text-center py-5" style={{ color: '#888' }}>
                        <div style={{ fontSize: '3rem', marginBottom: 16 }}>🔍</div>
                        <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>No products found</div>
                        <div style={{ fontSize: '0.9rem' }}>Try adjusting your search or filter</div>
                    </div>
                ) : (
                    <div className="row g-3">
                        {filtered.map((product) => (
                            <div key={product.id} className="col-6 col-md-4 col-lg-3">
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}

export default ProductsPage;