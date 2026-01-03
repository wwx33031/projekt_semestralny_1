// Moduł UI koszyka (modal, tooltip, checkout)

function showCartTooltip() {
  const tooltip = document.getElementById('cartTooltip');
  if (tooltip) {
    updateCartTooltip();
    tooltip.style.display = 'block';
  }
}

function hideCartTooltip() {
  const tooltip = document.getElementById('cartTooltip');
  if (tooltip) {
    tooltip.style.display = 'none';
  }
}

function openCart() {
  const cartModal = document.getElementById('cartModal');
  if (cartModal) {
    cartModal.classList.add('active');
    renderCart();
  }
}

function closeCart() {
  const cartModal = document.getElementById('cartModal');
  const cartFooter = document.querySelector('.cart-footer');
  
  if (cartFooter) {
    cartFooter.style.display = '';
  }
  
  if (cartModal) {
    cartModal.classList.remove('active');
  }
  
  // Przywróć normalny widok koszyka jeśli był pokazany potwierdzenie
  const cartItemsContainer = document.getElementById('cartItems');
  if (cartItemsContainer && getCart().length === 0) {
    renderCart();
  }
}

function checkout(callbacks) {
  const cart = getCart();
  
  if (cart.length === 0) {
    return;
  }
  
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartItemsContainer = document.getElementById('cartItems');
  const cartFooter = document.querySelector('.cart-footer');
  
  if (!cartItemsContainer || !cartFooter) return;
  
  // Ukryj footer z przyciskiem zamówienia
  cartFooter.style.display = 'none';
  
  // Pokaż potwierdzenie zamówienia
  let html = '<div class="order-confirmation">';
  html += '<div class="success-icon">✓</div>';
  html += '<h2 class="confirmation-title">Dziękujemy za zamówienie!</h2>';
  html += '<div class="order-summary-cart">';
  html += '<h3>Zamówione dania:</h3>';
  html += '<ul class="order-list">';
  
  cart.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    html += `
      <li class="order-item">
        <div class="order-item-info">
          <strong>${item.name}</strong>
          <span>${item.quantity}x × ${item.price} zł</span>
        </div>
        <strong class="order-item-price">${itemTotal} zł</strong>
      </li>
    `;
  });
  
  html += '</ul>';
  html += `<div class="order-total-cart"><span>Suma całkowita:</span><strong>${total} zł</strong></div>`;
  html += '<p class="confirmation-message">Zamówienie zostało przyjęte! Dziękujemy!</p>';
  html += '</div>';
  html += '<button class="close-confirmation-btn" onclick="closeCartAfterOrder()">Zamknij</button>';
  html += '</div>';
  
  cartItemsContainer.innerHTML = html;
  
  // Wyczyszczenie koszyka
  clearCart();
  
  if (callbacks && callbacks.onUpdate) {
    callbacks.onUpdate();
  }
}

function closeCartAfterOrder() {
  const cartModal = document.getElementById('cartModal');
  const cartFooter = document.querySelector('.cart-footer');
  
  if (cartFooter) {
    cartFooter.style.display = '';
  }
  
  if (cartModal) {
    cartModal.classList.remove('active');
  }
  
  // Przywróć normalny widok koszyka
  renderCart();
}

// Zamknięcie modala po kliknięciu poza nim
document.addEventListener('click', (e) => {
  const cartModal = document.getElementById('cartModal');
  if (cartModal && e.target === cartModal) {
    closeCart();
  }
});
