// Zmienna globalna przechowująca dane menu
let menuDataGlobal = null;

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

// Renderowanie menu na stronie z opcjonalnym filtrem
function renderMenu(menuData, searchFilter = '') {
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
    const filteredItems = category.items.filter((item) => {
      if (!searchFilter) return true;
      return item.name.toLowerCase().includes(searchFilter.toLowerCase());
    });

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

    // Iteracja przez przefiltrowane dania
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

      // Dodanie ceny
      const itemPrice = document.createElement('div');
      itemPrice.className = 'menu-item-price';
      const priceSpan = document.createElement('span');
      priceSpan.textContent = `${item.price} zł`;
      itemPrice.appendChild(priceSpan);
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

// Funkcja obsługująca wyszukiwanie
function setupSearch() {
  const searchInput = document.getElementById('search-input');
  if (!searchInput) {
    return;
  }

  // Event listener dla pola wyszukiwania
  searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.trim();
    if (menuDataGlobal) {
      renderMenu(menuDataGlobal, searchTerm);
    }
  });
}

// Inicjalizacja po załadowaniu strony
document.addEventListener('DOMContentLoaded', async () => {
  const menuData = await loadMenu();
  if (menuData) {
    menuDataGlobal = menuData;
    console.log('Menu zostało wczytane:', menuData);
    renderMenu(menuData);
    setupSearch();
  }
});

