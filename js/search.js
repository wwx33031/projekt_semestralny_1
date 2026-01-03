// Moduł wyszukiwania i sortowania

// Funkcja obsługująca wyszukiwanie i sortowanie
function setupSearchAndSort(menuDataGlobal, renderMenuCallback) {
  const searchInput = document.getElementById('search-input');
  const sortSelect = document.getElementById('sort-select');

  // Funkcja aktualizująca menu z aktualnymi wartościami filtru i sortowania
  function updateMenu() {
    if (!menuDataGlobal) return;

    const searchTerm = searchInput ? searchInput.value.trim() : '';
    const sortOrder = sortSelect ? sortSelect.value : '';
    
    if (renderMenuCallback) {
      renderMenuCallback(menuDataGlobal, searchTerm, sortOrder);
    }
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
