E-Commerce Web Application

A responsive e-commerce frontend built with vanilla HTML, CSS, and JavaScript — featuring real-time product filtering, a persistent cart system using localStorage, and client-side checkout validation with regex-based field checks.


Features

Product Catalogue


12 products across 4 categories: Electronics, Clothing, Books, Home & Living
Real-time search by product name or category
Filter by category and sort by price (low to high / high to low)
Product cards display ratings, discount percentage, and labels


Cart System


Add, remove, and update product quantities
Cart state persists across browser sessions using localStorage
Slide-in cart sidebar with live item count and total
Toast notifications on cart actions


Checkout


Order summary generated from cart state
Client-side form validation with inline error messages:

Name, email (format check), Indian mobile number (10-digit regex), street address, 6-digit pincode
Payment method: UPI, Credit/Debit Card, Cash on Delivery, Net Banking



Cart clears automatically after successful order placement


UI & Responsiveness


Mobile-first layout using CSS Grid and Flexbox
Responsive across desktop, tablet, and mobile (480px breakpoint)
Smooth hover transitions and animations
No external libraries or frameworks — pure CSS custom properties



Tech Stack

LayerTechnologyStructureHTML5StylingCSS3 (Custom Properties, Grid, Flexbox)LogicVanilla JavaScript (ES6+)StoragelocalStorage API


Project Structure

ecommerce-app/
├── index.html          # Product listing page
├── checkout.html       # Checkout and order form
├── css/
│   └── style.css       # All styles
└── js/
    ├── products.js     # Product data
    ├── cart.js         # Cart logic and localStorage management
    ├── app.js          # Product rendering, search, filter, sort
    └── checkout.js     # Form validation and order placement


Author
Kavinshree M
B.Tech CSE, SASTRA Deemed University
GitHub
