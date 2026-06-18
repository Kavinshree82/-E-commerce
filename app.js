// ─── RENDER PRODUCTS ──────────────────────────────────────────────────────────
function renderProducts(list) {
  const grid = document.getElementById('product-grid');
  if (!grid) return;

  if (list.length === 0) {
    grid.innerHTML = '<p class="no-results">No products found. Try a different search.</p>';
    return;
  }

  grid.innerHTML = list.map(product => {
    const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    const stars = renderStars(product.rating);
    const inCart = cart.find(i => i.id === product.id);

    return `
      <div class="product-card" data-id="${product.id}">
        ${product.badge ? `<span class="badge">${product.badge}</span>` : ''}
        <div class="product-img-wrapper">
          <img src="${product.image}" alt="${product.name}" class="product-img" loading="lazy" />
        </div>
        <div class="product-info">
          <span class="product-category">${product.category}</span>
          <h3 class="product-name">${product.name}</h3>
          <div class="product-rating">
            ${stars} <span class="review-count">(${product.reviews})</span>
          </div>
          <div class="product-pricing">
            <span class="price">₹${product.price.toLocaleString('en-IN')}</span>
            <span class="original-price">₹${product.originalPrice.toLocaleString('en-IN')}</span>
            <span class="discount">${discount}% off</span>
          </div>
          <button class="add-to-cart-btn ${inCart ? 'in-cart' : ''}" onclick="addToCart(${product.id})">
            ${inCart ? '✓ Added' : 'Add to Cart'}
          </button>
        </div>
      </div>
    `;
  }).join('');
}

// ─── STAR RATING ──────────────────────────────────────────────────────────────
function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  let stars = '';
  for (let i = 0; i < full; i++) stars += '★';
  if (half) stars += '½';
  return `<span class="stars">${stars}</span><span class="rating-num">${rating}</span>`;
}

// ─── FILTER & SORT ────────────────────────────────────────────────────────────
function filterProducts() {
  const query = document.getElementById('search-input')?.value.toLowerCase() || '';
  const category = document.getElementById('category-filter')?.value || 'all';
  const sort = document.getElementById('sort-filter')?.value || 'default';

  let filtered = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(query) || p.category.includes(query);
    const matchCategory = category === 'all' || p.category === category;
    return matchSearch && matchCategory;
  });

  if (sort === 'price-asc') filtered.sort((a, b) => a.price - b.price);
  if (sort === 'price-desc') filtered.sort((a, b) => b.price - a.price);

  renderProducts(filtered);
}

// ─── INIT ─────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderProducts(products);
});
