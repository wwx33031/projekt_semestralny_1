// Moduł zarządzania menu

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

// Renderowanie menu na stronie z opcjonalnym filtrem i sortowaniem
function renderMenu(menuData, searchFilter = '', sortOrder = '', addToCartCallback) {
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

      // Dodanie obrazu dania (jeśli istnieje)
      if (item.image) {
        const itemImage = document.createElement('img');
        itemImage.src = item.image;
        itemImage.alt = item.name;
        itemImage.className = 'menu-item-image';
        itemImage.onerror = function() {
          this.style.display = 'none';
        };
        menuItem.appendChild(itemImage);
      }

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
        if (addToCartCallback) {
          addToCartCallback(item, e.target);
        }
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
