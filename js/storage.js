// Moduł zarządzania localStorage dla koszyka i wygenerowanych dań

// Klucze dla localStorage
const CART_STORAGE_KEY = 'albaDiRomaCart';
const GENERATED_DISHES_STORAGE_KEY = 'albaDiRomaGeneratedDishes';

// Funkcje do zarządzania localStorage dla koszyka
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

// Funkcje do zarządzania localStorage dla wygenerowanych dań
function saveGeneratedDishesToStorage(menuData) {
  try {
    // Zapisz tylko wygenerowane dania (te z obrazami lub te, które nie są w oryginalnym menu.json)
    // Dla uproszczenia, zapiszemy wszystkie dania z menu jako wygenerowane
    // W produkcji można by użyć flagi do oznaczenia wygenerowanych dań
    const dataToSave = JSON.stringify(menuData);
    
    // Sprawdź rozmiar - localStorage ma limit ~5-10MB
    const sizeInMB = new Blob([dataToSave]).size / (1024 * 1024);
    if (sizeInMB > 5) {
      console.warn('Rozmiar danych przekracza 5MB, może być problem z zapisem');
    }
    
    localStorage.setItem(GENERATED_DISHES_STORAGE_KEY, dataToSave);
    console.log('Zapisano wygenerowane dania do localStorage');
  } catch (error) {
    if (error.name === 'QuotaExceededError') {
      console.error('Brak miejsca w localStorage. Rozmiar danych:', error);
      alert('Brak miejsca w localStorage. Nie można zapisać wygenerowanych dań.');
    } else {
      console.error('Błąd podczas zapisywania wygenerowanych dań do localStorage:', error);
    }
  }
}

function loadGeneratedDishesFromStorage() {
  try {
    const savedData = localStorage.getItem(GENERATED_DISHES_STORAGE_KEY);
    if (savedData) {
      const menuData = JSON.parse(savedData);
      console.log('Wczytano wygenerowane dania z localStorage');
      return menuData;
    }
  } catch (error) {
    console.error('Błąd podczas wczytywania wygenerowanych dań z localStorage:', error);
  }
  return null;
}

// Funkcja do scalania oryginalnego menu z wygenerowanymi daniami
function mergeMenuWithGeneratedDishes(originalMenu, generatedMenu) {
  if (!generatedMenu || !originalMenu) {
    return originalMenu || generatedMenu;
  }

  // Utwórz kopię oryginalnego menu
  const mergedMenu = JSON.parse(JSON.stringify(originalMenu));

  // Dla każdej kategorii w wygenerowanym menu
  generatedMenu.categories.forEach((genCategory) => {
    // Znajdź odpowiednią kategorię w oryginalnym menu
    const originalCategory = mergedMenu.categories.find(
      (cat) => cat.id === genCategory.id
    );

    if (originalCategory) {
      // Zbierz ID dań z oryginalnego menu (z menu.json)
      const originalItemIds = new Set(originalCategory.items.map((item) => item.id));

      // Dodaj tylko te dania z wygenerowanego menu, których nie ma w oryginalnym
      // oraz te, które mają obraz (są wygenerowane)
      genCategory.items.forEach((genItem) => {
        // Dodaj jeśli:
        // 1. Nie ma w oryginalnym menu LUB
        // 2. Ma obraz (jest wygenerowane)
        if (!originalItemIds.has(genItem.id) || genItem.image) {
          // Sprawdź czy już nie ma tego dania (na wypadek duplikatów)
          const existingItem = originalCategory.items.find(
            (item) => item.id === genItem.id
          );
          if (!existingItem) {
            originalCategory.items.push(genItem);
          } else if (genItem.image && !existingItem.image) {
            // Jeśli wygenerowane danie ma obraz, a oryginalne nie - zamień
            const index = originalCategory.items.indexOf(existingItem);
            originalCategory.items[index] = genItem;
          }
        }
      });
    }
  });

  return mergedMenu;
}
