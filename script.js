// Zmienna globalna przechowująca dane menu
let menuDataGlobal = null;

// Koszyk - tablica obiektów {id, name, price, quantity}
let cart = [];

// Klucz dla localStorage
const CART_STORAGE_KEY = 'albaDiRomaCart';

// Funkcje do zarządzania localStorage
function saveCartToStorage() {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error('Błąd podczas zapisywania koszyka do localStorage:', error);
  }
}

function loadCartFromStorage() {
  try {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      return JSON.parse(savedCart);
    }
  } catch (error) {
    console.error('Błąd podczas wczytywania koszyka z localStorage:', error);
  }
  return [];
}

// Wczytanie danych menu z pliku JSON
async function loadMenu() {
  try {
    const response = await fetch('menu.json');
    if (!response.ok) {
      throw new Error('Nie udało się wczytać menu');
    }
    const menuData = await response.json();
    return menuData;
  } catch (error) {
    console.error('Błąd podczas wczytywania menu:', error);
    return null;
  }
}

// Renderowanie menu na stronie z opcjonalnym filtrem i sortowaniem
function renderMenu(menuData, searchFilter = '', sortOrder = '') {
  const menuContainer = document.getElementById('menu-container');
  if (!menuContainer) {
    console.error('Nie znaleziono kontenera menu');
    return;
  }

  // Wyczyszczenie kontenera przed renderowaniem
  menuContainer.innerHTML = '';

  // Utworzenie głównego kontenera dla kategorii
  const categoriesContainer = document.createElement('div');
  categoriesContainer.className = 'menu-categories';

  // Iteracja przez każdą kategorię
  menuData.categories.forEach((category) => {
    // Filtrowanie dań w kategorii po nazwie
    let filteredItems = category.items.filter((item) => {
      if (!searchFilter) return true;
      return item.name.toLowerCase().includes(searchFilter.toLowerCase());
    });

    // Sortowanie dań po cenie
    if (sortOrder === 'asc') {
      filteredItems = filteredItems.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'desc') {
      filteredItems = filteredItems.sort((a, b) => b.price - a.price);
    }

    // Jeśli nie ma żadnych dań po filtrowaniu, pomiń kategorię
    if (filteredItems.length === 0) {
      return;
    }

    // Utworzenie sekcji kategorii
    const categorySection = document.createElement('div');
    categorySection.className = 'menu-category';

    // Dodanie nagłówka kategorii
    const categoryTitle = document.createElement('h3');
    categoryTitle.textContent = category.name;
    categorySection.appendChild(categoryTitle);

    // Utworzenie kontenera dla dań w kategorii
    const itemsContainer = document.createElement('div');
    itemsContainer.className = 'menu-items';

    // Iteracja przez przefiltrowane i posortowane dania
    filteredItems.forEach((item) => {
      // Utworzenie elementu dania
      const menuItem = document.createElement('div');
      menuItem.className = 'menu-item';

      // Dodanie nazwy dania
      const itemName = document.createElement('h4');
      itemName.textContent = item.name;
      menuItem.appendChild(itemName);

      // Dodanie opisu dania
      const itemDescription = document.createElement('p');
      itemDescription.textContent = item.description;
      menuItem.appendChild(itemDescription);

      // Dodanie ceny i przycisku
      const itemPrice = document.createElement('div');
      itemPrice.className = 'menu-item-price';
      const priceSpan = document.createElement('span');
      priceSpan.textContent = `${item.price} zł`;
      itemPrice.appendChild(priceSpan);
      
      const addButton = document.createElement('button');
      addButton.className = 'add-to-cart-btn';
      addButton.textContent = 'Dodaj do koszyka';
      addButton.addEventListener('click', (e) => {
        addToCart(item, e.target);
      });
      itemPrice.appendChild(addButton);
      
      menuItem.appendChild(itemPrice);

      // Dodanie dania do kontenera
      itemsContainer.appendChild(menuItem);
    });

    // Dodanie kontenera dań do sekcji kategorii
    categorySection.appendChild(itemsContainer);

    // Dodanie sekcji kategorii do głównego kontenera
    categoriesContainer.appendChild(categorySection);
  });

  // Wstawienie całego menu do kontenera
  menuContainer.appendChild(categoriesContainer);
}

// Funkcja obsługująca wyszukiwanie i sortowanie
function setupSearchAndSort() {
  const searchInput = document.getElementById('search-input');
  const sortSelect = document.getElementById('sort-select');

  // Funkcja aktualizująca menu z aktualnymi wartościami filtru i sortowania
  function updateMenu() {
    if (!menuDataGlobal) return;

    const searchTerm = searchInput ? searchInput.value.trim() : '';
    const sortOrder = sortSelect ? sortSelect.value : '';
    renderMenu(menuDataGlobal, searchTerm, sortOrder);
  }

  // Event listener dla pola wyszukiwania
  if (searchInput) {
    searchInput.addEventListener('input', updateMenu);
  }

  // Event listener dla selecta sortowania
  if (sortSelect) {
    sortSelect.addEventListener('change', updateMenu);
  }
}

// Funkcje koszyka
function addToCart(item, button) {
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
  
  updateCartCount();
  renderCart();
  saveCartToStorage();
  
  // Animacja przycisku
  if (button) {
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
      button.style.transform = '';
    }, 150);
  }
}

function removeFromCart(itemId) {
  cart = cart.filter((item) => item.id !== itemId);
  updateCartCount();
  renderCart();
  saveCartToStorage();
}

function updateQuantity(itemId, change) {
  const item = cart.find((cartItem) => cartItem.id === itemId);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      removeFromCart(itemId);
    } else {
      updateCartCount();
      renderCart();
      saveCartToStorage();
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
  if (cartItemsContainer && cart.length === 0) {
    renderCart();
  }
}

function checkout() {
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
  cart = [];
  updateCartCount();
  saveCartToStorage();
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

// Inicjalizacja po załadowaniu strony
document.addEventListener('DOMContentLoaded', async () => {
  // Wczytaj koszyk z localStorage
  cart = loadCartFromStorage();
  
  const menuData = await loadMenu();
  if (menuData) {
    menuDataGlobal = menuData;
    console.log('Menu zostało wczytane:', menuData);
    renderMenu(menuData);
    setupSearchAndSort();
    updateCartCount();
    renderCart();
  }
});

