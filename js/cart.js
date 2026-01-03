// Moduł logiki koszyka

// Koszyk - tablica obiektów {id, name, price, quantity}
let cart = [];

// Funkcje koszyka
function addToCart(item, button, callbacks) {
  const existingItem = cart.find((cartItem) => cartItem.id === item.id);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1
    });
  }
  
  if (callbacks && callbacks.onUpdate) {
    callbacks.onUpdate();
  }
  
  // Animacja przycisku
  if (button) {
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
      button.style.transform = '';
    }, 150);
  }
}

function removeFromCart(itemId, callbacks) {
  cart = cart.filter((item) => item.id !== itemId);
  
  if (callbacks && callbacks.onUpdate) {
    callbacks.onUpdate();
  }
}

function updateQuantity(itemId, change, callbacks) {
  const item = cart.find((cartItem) => cartItem.id === itemId);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      removeFromCart(itemId, callbacks);
    } else {
      if (callbacks && callbacks.onUpdate) {
        callbacks.onUpdate();
      }
    }
  }
}

function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartCountElement = document.getElementById('cartCount');
  if (cartCountElement) {
    cartCountElement.textContent = count;
    cartCountElement.style.display = count > 0 ? 'flex' : 'none';
  }
  updateCartTooltip();
}

function updateCartTooltip() {
  const tooltipContent = document.getElementById('tooltipContent');
  if (!tooltipContent) return;
  
  if (cart.length === 0) {
    tooltipContent.innerHTML = '<p>Koszyk jest pusty</p>';
    return;
  }
  
  let html = '<div class="tooltip-items">';
  let total = 0;
  
  cart.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    html += `
      <div class="tooltip-item">
        <span class="tooltip-item-name">${item.name}</span>
        <span class="tooltip-item-quantity">${item.quantity}x</span>
        <span class="tooltip-item-price">${itemTotal} zł</span>
      </div>
    `;
  });
  
  html += `<div class="tooltip-total"><strong>Suma: ${total} zł</strong></div>`;
  html += '</div>';
  
  tooltipContent.innerHTML = html;
}

function renderCart() {
  const cartItemsContainer = document.getElementById('cartItems');
  const cartTotalElement = document.getElementById('cartTotal');
  
  if (!cartItemsContainer || !cartTotalElement) return;
  
  cartItemsContainer.innerHTML = '';
  
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<div class="empty-cart"><p>Koszyk jest pusty</p></div>';
    cartTotalElement.textContent = '0 zł';
    return;
  }
  
  let total = 0;
  
  cart.forEach((item) => {
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    
    cartItem.innerHTML = `
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <p>${item.price} zł × ${item.quantity}</p>
      </div>
      <div class="cart-item-controls">
        <div class="quantity-controls">
          <button class="quantity-btn" onclick="updateQuantity('${item.id}', -1)">-</button>
          <span class="quantity">${item.quantity}</span>
          <button class="quantity-btn" onclick="updateQuantity('${item.id}', 1)">+</button>
        </div>
        <span class="item-total">${itemTotal} zł</span>
        <button class="remove-item" onclick="removeFromCart('${item.id}')">Usuń</button>
      </div>
    `;
    
    cartItemsContainer.appendChild(cartItem);
  });
  
  cartTotalElement.textContent = `${total} zł`;
}

function getCart() {
  return cart;
}

function setCart(newCart) {
  cart = newCart;
}

function clearCart() {
  cart = [];
}
