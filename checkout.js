// ─── RENDER ORDER SUMMARY ─────────────────────────────────────────────────────
function renderOrderSummary() {
  const itemsEl = document.getElementById('order-items');
  const totalEl = document.getElementById('order-total');
  const countEl = document.getElementById('cart-count');

  if (countEl) countEl.textContent = getCartCount();

  if (!itemsEl) return;

  if (cart.length === 0) {
    itemsEl.innerHTML = '<p class="empty-cart">No items in cart. <a href="index.html">Shop now</a></p>';
    return;
  }

  itemsEl.innerHTML = cart.map(item => `
    <div class="order-item">
      <img src="${item.image}" alt="${item.name}" />
      <div class="order-item-info">
        <p>${item.name}</p>
        <p class="order-item-qty">Qty: ${item.quantity}</p>
      </div>
      <span>₹${(item.price * item.quantity).toLocaleString('en-IN')}</span>
    </div>
  `).join('');

  if (totalEl) totalEl.textContent = `₹${getCartTotal().toLocaleString('en-IN')}`;
}

// ─── VALIDATION HELPERS ───────────────────────────────────────────────────────
function showError(id, msg) {
  const el = document.getElementById(id);
  if (el) el.textContent = msg;
}

function clearErrors() {
  ['err-name','err-email','err-phone','err-address','err-city','err-pincode','err-payment']
    .forEach(id => showError(id, ''));
}

function validateForm() {
  clearErrors();
  let valid = true;

  const name = document.getElementById('full-name')?.value.trim();
  const email = document.getElementById('email')?.value.trim();
  const phone = document.getElementById('phone')?.value.trim();
  const address = document.getElementById('address')?.value.trim();
  const city = document.getElementById('city')?.value.trim();
  const pincode = document.getElementById('pincode')?.value.trim();
  const payment = document.getElementById('payment')?.value;

  if (!name || name.length < 2) {
    showError('err-name', 'Please enter your full name.');
    valid = false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    showError('err-email', 'Please enter a valid email address.');
    valid = false;
  }

  const phoneRegex = /^[6-9]\d{9}$/;
  if (!phone || !phoneRegex.test(phone.replace(/\s|\+91/g, ''))) {
    showError('err-phone', 'Enter a valid 10-digit Indian mobile number.');
    valid = false;
  }

  if (!address || address.length < 5) {
    showError('err-address', 'Please enter your street address.');
    valid = false;
  }

  if (!city || city.length < 2) {
    showError('err-city', 'Please enter your city.');
    valid = false;
  }

  const pincodeRegex = /^[1-9][0-9]{5}$/;
  if (!pincode || !pincodeRegex.test(pincode)) {
    showError('err-pincode', 'Enter a valid 6-digit pincode.');
    valid = false;
  }

  if (!payment) {
    showError('err-payment', 'Please select a payment method.');
    valid = false;
  }

  return valid;
}

// ─── PLACE ORDER ──────────────────────────────────────────────────────────────
function placeOrder() {
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }

  if (!validateForm()) return;

  // Clear cart after order
  cart = [];
  saveCart();

  // Show success
  document.getElementById('checkout-form').classList.add('hidden');
  document.getElementById('order-success').classList.remove('hidden');
}

// ─── INIT ─────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', renderOrderSummary);
