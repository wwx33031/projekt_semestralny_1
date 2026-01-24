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
  const orderFormContainer = document.getElementById('orderFormContainer');
  
  if (cartFooter) {
    cartFooter.style.display = '';
  }
  
  if (orderFormContainer) {
    orderFormContainer.style.display = 'none';
  }
  
  if (cartModal) {
    cartModal.classList.remove('active');
  }
  
  // Przywróć normalny widok koszyka
  renderCart();
}

// Pokaż formularz zamówienia
function showOrderForm() {
  const cart = getCart();
  
  if (cart.length === 0) {
    return;
  }
  
  const cartItemsContainer = document.getElementById('cartItems');
  const cartFooter = document.querySelector('.cart-footer');
  const orderFormContainer = document.getElementById('orderFormContainer');
  
  if (cartItemsContainer) {
    cartItemsContainer.style.display = 'none';
  }
  
  if (cartFooter) {
    cartFooter.style.display = 'none';
  }
  
  if (orderFormContainer) {
    orderFormContainer.style.display = 'block';
  }
}

// Ukryj formularz zamówienia
function hideOrderForm() {
  const cartItemsContainer = document.getElementById('cartItems');
  const cartFooter = document.querySelector('.cart-footer');
  const orderFormContainer = document.getElementById('orderFormContainer');
  
  if (cartItemsContainer) {
    cartItemsContainer.style.display = '';
  }
  
  if (cartFooter) {
    cartFooter.style.display = '';
  }
  
  if (orderFormContainer) {
    orderFormContainer.style.display = 'none';
  }
}

// Złóż zamówienie (z danymi z formularza)
function submitOrder(event) {
  event.preventDefault();
  
  const form = document.getElementById('orderForm');
  const formData = new FormData(form);
  
  const orderData = {
    name: formData.get('name'),
    phone: formData.get('phone'),
    email: formData.get('email') || '',
    address: formData.get('address'),
    notes: formData.get('notes') || ''
  };
  
  // Walidacja
  if (!orderData.name || !orderData.phone || !orderData.address) {
    alert('Proszę wypełnić wszystkie wymagane pola (*)');
    return false;
  }
  
  const cart = getCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartItemsContainer = document.getElementById('cartItems');
  const orderFormContainer = document.getElementById('orderFormContainer');
  
  if (!cartItemsContainer) return false;
  
  // Ukryj formularz
  if (orderFormContainer) {
    orderFormContainer.style.display = 'none';
  }
  
  // Pokaż elementy koszyka z potwierdzeniem
  cartItemsContainer.style.display = '';
  
  // Pokaż potwierdzenie zamówienia z danymi klienta
  let html = '<div class="order-confirmation">';
  html += '<div class="success-icon">✓</div>';
  html += '<h2 class="confirmation-title">Dziękujemy za zamówienie!</h2>';
  
  // Dane klienta
  html += '<div class="order-customer-info">';
  html += '<h4>Dane dostawy:</h4>';
  html += `<p><strong>${orderData.name}</strong></p>`;
  html += `<p>Tel: ${orderData.phone}</p>`;
  if (orderData.email) {
    html += `<p>Email: ${orderData.email}</p>`;
  }
  html += `<p>${orderData.address}</p>`;
  if (orderData.notes) {
    html += `<p class="order-notes"><em>Uwagi: ${orderData.notes}</em></p>`;
  }
  html += '</div>';
  
  // Zamówione dania
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
  html += '</div>';
  
  html += '<p class="confirmation-message">Zamówienie zostało przyjęte! Skontaktujemy się wkrótce.</p>';
  html += '<button class="close-confirmation-btn" onclick="closeCartAfterOrder()">Zamknij</button>';
  html += '</div>';
  
  cartItemsContainer.innerHTML = html;
  
  // Wyczyszczenie koszyka i formularza
  clearCart();
  form.reset();
  
  // Aktualizuj UI
  updateCartCount();
  saveCartToStorage(getCart());
  
  return false;
}

// Zamknięcie modala po kliknięciu poza nim
document.addEventListener('click', (e) => {
  const cartModal = document.getElementById('cartModal');
  if (cartModal && e.target === cartModal) {
    closeCart();
  }
});
