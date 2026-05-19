# ShopVerse 🛍️

A fully functional ecommerce frontend built with **React**, **Redux Toolkit**, **React Router v6**, and **Bootstrap 5**.
Fetches real product data from the [FakeStore API](https://fakestoreapi.com) — no mock data, no hardcoding.

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| React 18 | UI library |
| Redux Toolkit | Global state management |
| React Router v6 | Client-side routing |
| Bootstrap 5 | Responsive styling |
| FakeStore API | Real product data via REST API |

---

## Features

- 🏠 Home page with hero section, featured products, and best sellers
- 🔍 Products page with live search and category filtering
- 📦 Product detail page with breadcrumb navigation
- 🛒 Add to cart / remove from cart / quantity controls
- 💰 Order summary with auto-calculated shipping and tax
- 📋 Checkout form with field validation and payment options
- 🔔 Toast notifications and order success modal
- 📱 Fully responsive design (mobile-first)

---

## Folder Structure

```
src/
├── store/
│   ├── store.js              # Redux configureStore
│   ├── cartSlice.js          # Add, remove, quantity update, clear cart
│   └── productSlice.js       # Async thunks — fetch products & categories
│
├── components/
│   ├── Navbar.js             # Sticky nav with live cart badge
│   ├── Footer.js             # Footer with links and newsletter
│   ├── ProductCard.js        # Reusable card with add to cart
│   ├── CartItem.js           # Cart row with quantity controls
│   ├── OrderSummary.js       # Live subtotal, shipping, tax, total
│   ├── Spinner.js            # Loading indicator
│   └── ToastContainer.js     # Global toast notifications
│
├── pages/
│   ├── HomePage.js           # Hero + stats + featured + best sellers
│   ├── ProductsPage.js       # Search + filter + full product grid
│   ├── ProductDetailPage.js  # Single product with add to cart
│   ├── CartPage.js           # Cart items + order summary
│   ├── CheckoutPage.js       # Form validation + payment + success modal
│   └── NotFoundPage.js       # 404 page
│
├── App.js                    # All route definitions
└── index.js                  # Redux Provider + BrowserRouter entry point
```

---

## Getting Started

### Prerequisites
- Node.js v16 or higher
- npm v8 or higher

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/shopverse-react-app.git

# 2. Navigate into the project
cd shopverse-react-app

# 3. Install dependencies
npm install

# 4. Start the development server
npm start
```

App runs on **http://localhost:3000**

---

## Key Concepts Demonstrated

### Redux Toolkit
- `createSlice` for cart and product state
- `createAsyncThunk` for API calls with loading/error handling
- `configureStore` combining multiple reducers
- `useSelector` and `useDispatch` in every component

### React Router v6
- `Routes` and `Route` for page navigation
- `useParams` to fetch product by ID from URL
- `useNavigate` to redirect after form submit
- `NavLink` for active link highlighting

### Component Design
- `OrderSummary` reused in both CartPage and CheckoutPage
- `ProductCard` reused on HomePage and ProductsPage
- `ToastContainer` globally available via module-level store

### Form Handling
- Controlled inputs with `useState`
- Per-field validation with error messages
- Scroll-to-first-error on failed submit

### API Integration
- Real REST API — FakeStore API
- `pending / fulfilled / rejected` states in `extraReducers`
- Data fetched once and stored in Redux — no duplicate calls

---

## API Reference

This app uses the free [FakeStore API](https://fakestoreapi.com):

| Endpoint | Method | Usage |
|----------|--------|-------|
| `/products` | GET | Fetch all products |
| `/products/:id` | GET | Fetch single product detail |
| `/products/categories` | GET | Fetch all categories for filter |

---

## Pages Overview

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero, featured products, best sellers |
| Products | `/products` | All products with search and filter |
| Product Detail | `/products/:id` | Single product page |
| Cart | `/cart` | Cart items with quantity controls |
| Checkout | `/checkout` | Shipping form + payment + order confirmation |
| Not Found | `*` | 404 fallback page |

---

## Author
Praveen 
[GitHub](github.com/praveenkumar) · [LinkedIn](www.linkedin.com/in/
praveen-kumar03)