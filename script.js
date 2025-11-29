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

// Inicjalizacja po załadowaniu strony
document.addEventListener('DOMContentLoaded', async () => {
  const menuData = await loadMenu();
  if (menuData) {
    console.log('Menu zostało wczytane:', menuData);
    // Tutaj będzie można użyć menuData do wyświetlenia menu
  }
});

