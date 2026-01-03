// Moduł zarządzania localStorage dla koszyka

// Klucz dla localStorage
const CART_STORAGE_KEY = 'albaDiRomaCart';

// Funkcje do zarządzania localStorage
function saveCartToStorage(cart) {
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
