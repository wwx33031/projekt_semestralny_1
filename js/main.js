// Główny moduł inicjalizacji aplikacji

// Inicjalizacja po załadowaniu strony
document.addEventListener('DOMContentLoaded', async () => {
  // Wczytaj koszyk z localStorage
  const savedCart = loadCartFromStorage();
  setCart(savedCart);
  
  // Wczytaj menu
  const menuData = await loadMenu();
  if (menuData) {
    menuDataGlobal = menuData;
    console.log('Menu zostało wczytane:', menuData);
    
    // Callbacki dla koszyka
    const cartCallbacks = {
      onUpdate: () => {
        updateCartCount();
        renderCart();
        saveCartToStorage(getCart());
      }
    };
    
    // Callback dla renderowania menu z funkcją addToCart
    const renderMenuWithCart = (menuData, searchFilter, sortOrder) => {
      renderMenu(menuData, searchFilter, sortOrder, (item, button) => {
        addToCart(item, button, cartCallbacks);
      });
    };
    
    // Renderuj menu z callbackiem
    renderMenu(menuData, '', '', (item, button) => {
      addToCart(item, button, cartCallbacks);
    });
    
    // Ustaw wyszukiwanie i sortowanie
    setupSearchAndSort(menuDataGlobal, renderMenuWithCart);
    
    // Zaktualizuj UI koszyka
    updateCartCount();
    renderCart();
    
    // Ustaw callback dla checkout
    window.checkout = () => {
      checkout({
        onUpdate: () => {
          updateCartCount();
          saveCartToStorage(getCart());
        }
      });
    };
    
    // Ustaw globalne funkcje dla onclick w HTML
    window.updateQuantity = (itemId, change) => {
      updateQuantity(itemId, change, cartCallbacks);
    };
    
    window.removeFromCart = (itemId) => {
      removeFromCart(itemId, cartCallbacks);
    };
    
    // Funkcje z cartUI.js są już globalne, ale upewniamy się że są dostępne
    // showCartTooltip, hideCartTooltip, openCart, closeCart, closeCartAfterOrder
    // są zdefiniowane w cartUI.js i są dostępne globalnie
  }
});
