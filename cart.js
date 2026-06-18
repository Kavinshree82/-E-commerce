// ─── CART STATE (localStorage persistent) ─────────────────────────────────────
let cart = JSON.parse(localStorage.getItem('shopease_cart')) || [];

function saveCart() {
  localStorage.setItem('shopease_cart', JSON.stringify(cart));
}

// ─── ADD TO CART ──────────────────────────────────────────────────────────────
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart();
  updateCartUI();
  showToast(`"${product.name}" added to cart!`);
}

// ─── REMOVE FROM CART ─────────────────────────────────────────────────────────
function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
  updateCartUI();
}

// ─── UPDATE QUANTITY ──────────────────────────────────────────────────────────
function updateQuantity(productId, delta) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    removeFromCart(productId);
    return;
  }

  saveCart();
  updateCartUI();
}

// ─── CART TOTAL ───────────────────────────────────────────────────────────────
function getCartTotal() {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function getCartCount() {
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}

// ─── RENDER CART SIDEBAR ──────────────────────────────────────────────────────
function updateCartUI() {
  const countEl = document.getElementById('cart-count');
  const itemsEl = document.getElementById('cart-items');
  const totalEl = document.getElementById('cart-total');

  if (countEl) countEl.textContent = getCartCount();
  if (totalEl) totalEl.textContent = `₹${getCartTotal().toLocaleString('en-IN')}`;

  if (!itemsEl) return;

  if (cart.length === 0) {
    itemsEl.innerHTML = '<p class="empty-cart">Your cart is empty.</p>';
    return;
  }

  itemsEl.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.name}" class="cart-item-img" />
      <div class="cart-item-info">
        <p class="cart-item-name">${item.name}</p>
        <p class="cart-item-price">₹${item.price.toLocaleString('en-IN')}</p>
        <div class="qty-controls">
          <button onclick="updateQuantity(${item.id}, -1)">−</button>
          <span>${item.quantity}</span>
          <button onclick="updateQuantity(${item.id}, +1)">+</button>
        </div>
      </div>
      <button class="remove-btn" onclick="removeFromCart(${item.id})">🗑</button>
    </div>
  `).join('');
}

// ─── TOGGLE CART SIDEBAR ──────────────────────────────────────────────────────
function toggleCart() {
  const sidebar = document.getElementById('cart-sidebar');
  const overlay = document.getElementById('cart-overlay');
  if (!sidebar) return;
  sidebar.classList.toggle('open');
  overlay.classList.toggle('active');
}

// ─── TOAST NOTIFICATION ───────────────────────────────────────────────────────
function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

// Init cart count on page load
document.addEventListener('DOMContentLoaded', updateCartUI);
