// Moduł generowania nowych dań i obrazów

// Funkcja generująca nowe danie używając OpenRouter API
async function generateDish(categoryName) {
  try {
    const prompt = `Wygeneruj nowe autentyczne włoskie danie dla kategorii "${categoryName}". 
Zwróć TYLKO JSON w formacie:
{
  "name": "Nazwa dania po włosku",
  "description": "Opis dania po polsku",
  "price": liczba_całkowita
}
Bez żadnych dodatkowych komentarzy, tylko czysty JSON.`;

    const requestBody = {
      model: MODEL,
      messages: [
        {
          role: "system",
          content:
            'Jesteś pomocnikiem do generowania włoskich dań. Zawsze odpowiadaj tylko czystym JSON bez dodatkowych komentarzy. Format: {"name": "...", "description": "...", "price": liczba}',
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.8,
      max_tokens: 500,
    };

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "HTTP-Referer": window.location.origin,
          "X-Title": "Alba Di Roma",
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Błąd odpowiedzi API:", response.status, errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Sprawdź czy odpowiedź ma oczekiwaną strukturę
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error("Nieoczekiwana struktura odpowiedzi:", data);
      throw new Error("Nieoczekiwana struktura odpowiedzi API");
    }

    let content = data.choices[0].message.content.trim();
    console.log("Odpowiedź API:", content);

    // Próba wyciągnięcia JSON z różnych formatów
    let jsonMatch = null;
    let dishData = null;

    // 1. Sprawdź czy cała odpowiedź to JSON
    try {
      dishData = JSON.parse(content);
    } catch (e) {
      // 2. Spróbuj znaleźć JSON w markdown code block (```json ... ```)
      jsonMatch = content.match(/```(?:json)?\s*(\{[\s\S]*?\})\s*```/);
      if (jsonMatch) {
        try {
          dishData = JSON.parse(jsonMatch[1]);
        } catch (e2) {
          console.error("Błąd parsowania JSON z markdown:", e2);
        }
      }

      // 3. Spróbuj znaleźć JSON bez code block
      if (!dishData) {
        jsonMatch = content.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          try {
            dishData = JSON.parse(jsonMatch[0]);
          } catch (e3) {
            console.error("Błąd parsowania JSON:", e3);
          }
        }
      }
    }

    if (!dishData) {
      console.error("Nie udało się wyodrębnić JSON z odpowiedzi:", content);
      // Fallback - utwórz podstawowe danie
      const dishNames = {
        Antipasti: [
          "Crostini ai Funghi",
          "Antipasto Misto",
          "Carpaccio di Manzo",
        ],
        Insalate: [
          "Insalata Caprese",
          "Insalata di Spinaci",
          "Insalata Mediterranea",
        ],
        "Primi Piatti": [
          "Penne all'Arrabbiata",
          "Linguine alle Vongole",
          "Pappardelle al Cinghiale",
        ],
      };

      const fallbackNames = dishNames[categoryName] || ["Piatto Speciale"];
      const randomName =
        fallbackNames[Math.floor(Math.random() * fallbackNames.length)];

      dishData = {
        name: randomName,
        description: `Wyśmienite włoskie danie z kategorii ${categoryName}`,
        price: Math.floor(Math.random() * 100) + 30,
      };
    }

    // Walidacja i ustawienie domyślnych wartości
    if (!dishData.name || typeof dishData.name !== "string") {
      dishData.name = `Piatto ${categoryName}`;
    }
    if (!dishData.description || typeof dishData.description !== "string") {
      dishData.description = `Autentyczne włoskie danie z kategorii ${categoryName}`;
    }
    if (!dishData.price || typeof dishData.price !== "number") {
      dishData.price = Math.floor(Math.random() * 100) + 30;
    }

    // Generuj unikalne ID
    const id =
      dishData.name
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "")
        .replace(/'/g, "") +
      "-" +
      Date.now();

    return {
      id: id,
      name: dishData.name,
      description: dishData.description,
      price: Math.floor(dishData.price), // Upewnij się że cena to liczba całkowita
    };
  } catch (error) {
    console.error("Błąd podczas generowania dania:", error);
    // Zwróć danie fallback zamiast rzucać błąd
    const fallbackDish = {
      id: `fallback-${categoryName
        .toLowerCase()
        .replace(/\s+/g, "-")}-${Date.now()}`,
      name: `Piatto ${categoryName}`,
      description: `Autentyczne włoskie danie z kategorii ${categoryName}`,
      price: Math.floor(Math.random() * 100) + 30,
    };
    return fallbackDish;
  }
}

// Funkcja pomocnicza do przeskalowania obrazu z URL do 256x256
async function resizeImageFromUrl(imageUrl, width, height) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = function () {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);
      const resizedDataUrl = canvas.toDataURL("image/png");
      resolve(resizedDataUrl);
    };
    img.onerror = reject;
    img.src = imageUrl;
  });
}

// Funkcja pobierająca losowy obraz z foodish-api.com
async function generateDishImage(dishName, dishDescription, categoryName) {
  try {
    // Mapowanie kategorii włoskich na kategorie foodish-api
    const categoryMapping = {
      Antipasti: "pizza", // Przystawki -> pizza
      Insalate: "pizza", // Sałatki -> pizza
      "Primi Piatti": "pasta", // Pierwsze dania -> pasta
    };

    // Maksymalne liczby obrazów dla każdej kategorii foodish
    const foodishCategoryCounts = {
      biryani: 81,
      burger: 87,
      "butter-chicken": 22,
      dessert: 36,
      dosa: 83,
      idly: 77,
      pasta: 34,
      pizza: 95,
      rice: 35,
      samosa: 22,
    };

    // Wybierz kategorię foodish na podstawie kategorii dania
    const foodishCategory = categoryMapping[categoryName] || "pizza"; // Domyślnie pizza

    // Losuj numer obrazu (1 do maksymalnej liczby)
    const maxCount = foodishCategoryCounts[foodishCategory] || 95;
    const randomNumber = Math.floor(Math.random() * maxCount) + 1;

    // Utwórz URL obrazu
    const imageUrl = `https://foodish-api.com/images/${foodishCategory}/${foodishCategory}${randomNumber}.jpg`;

    // Zwróć oryginalny URL bez przeskalowania
    return imageUrl;
  } catch (error) {
    console.error("Błąd podczas pobierania obrazu z foodish-api:", error);
    return null;
  }
}

// Funkcja dodająca obrazy do istniejących dań bez obrazów
async function addImagesToExistingDishes(menuData) {
  if (!menuData || !menuData.categories) {
    return menuData;
  }

  let hasChanges = false;
  const updatedMenuData = JSON.parse(JSON.stringify(menuData)); // Głęboka kopia

  // Przejdź przez wszystkie kategorie i dania
  for (const category of updatedMenuData.categories) {
    for (const item of category.items) {
      // Jeśli danie nie ma obrazu, dodaj go
      if (!item.image) {
        try {
          console.log(
            `Dodawanie obrazu do dania: ${item.name} (${category.name})`
          );
          const imageUrl = await generateDishImage(
            item.name,
            item.description,
            category.name
          );
          if (imageUrl) {
            item.image = imageUrl;
            hasChanges = true;
          }
        } catch (error) {
          console.error(
            `Błąd podczas dodawania obrazu do dania ${item.name}:`,
            error
          );
        }
      }
    }
  }

  // Jeśli były zmiany, zapisz do localStorage
  if (hasChanges) {
    saveGeneratedDishesToStorage(updatedMenuData);
    console.log("Zapisano obrazy dla istniejących dań do localStorage");
  }

  return updatedMenuData;
}

// Funkcja generująca nowe dania dla wszystkich kategorii
async function generateNewDishes() {
  const generateBtn = document.getElementById("generate-dishes-btn");
  if (!generateBtn || !menuDataGlobal) {
    console.error("Brak przycisku lub danych menu");
    return;
  }

  // Wyłącz przycisk podczas generowania
  const originalText = generateBtn.textContent;
  generateBtn.disabled = true;
  generateBtn.textContent = "Generowanie...";
  generateBtn.style.opacity = "0.6";
  generateBtn.style.cursor = "not-allowed";

  try {
    // Generuj jedno nowe danie dla każdej kategorii
    const newDishes = [];

    for (const category of menuDataGlobal.categories) {
      try {
        // Generuj danie
        const newDish = await generateDish(category.name);

        // Generuj obraz (z timeoutem, żeby nie czekać zbyt długo)
        const imagePromise = generateDishImage(
          newDish.name,
          newDish.description,
          category.name
        );
        const imageTimeout = new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Timeout")), 10000)
        );

        let imageUrl = null;
        try {
          imageUrl = await Promise.race([imagePromise, imageTimeout]);
        } catch (error) {
          console.warn("Nie udało się wygenerować obrazu:", error);
        }

        newDish.image = imageUrl;
        newDishes.push({ categoryId: category.id, dish: newDish });
      } catch (error) {
        console.error(
          `Błąd podczas generowania dania dla kategorii ${category.name}:`,
          error
        );
      }
    }

    // Dodaj wygenerowane dania do menu
    newDishes.forEach(({ categoryId, dish }) => {
      const category = menuDataGlobal.categories.find(
        (cat) => cat.id === categoryId
      );
      if (category) {
        category.items.push(dish);
      }
    });

    // Zapisz wygenerowane dania do localStorage
    saveGeneratedDishesToStorage(menuDataGlobal);

    // Przerenderuj menu
    const searchInput = document.getElementById("search-input");
    const sortSelect = document.getElementById("sort-select");
    const searchTerm = searchInput ? searchInput.value.trim() : "";
    const sortOrder = sortSelect ? sortSelect.value : "";

    const cartCallbacks = {
      onUpdate: () => {
        updateCartCount();
        renderCart();
        saveCartToStorage(getCart());
      },
    };

    renderMenu(menuDataGlobal, searchTerm, sortOrder, (item, button) => {
      addToCart(item, button, cartCallbacks);
    });

    // Pokaż komunikat sukcesu
    alert(`Wygenerowano ${newDishes.length} nowych dań!`);
  } catch (error) {
    console.error("Błąd podczas generowania dań:", error);
    alert("Wystąpił błąd podczas generowania dań. Spróbuj ponownie.");
  } finally {
    // Przywróć przycisk
    generateBtn.disabled = false;
    generateBtn.textContent = originalText;
    generateBtn.style.opacity = "1";
    generateBtn.style.cursor = "pointer";
  }
}

// Funkcja generująca jedno losowe danie
async function generateSingleDish() {
  const generateBtn = document.getElementById("generate-single-dish-btn");
  if (!generateBtn || !menuDataGlobal) {
    console.error("Brak przycisku lub danych menu");
    return;
  }

  // Wyłącz przycisk podczas generowania
  const originalText = generateBtn.textContent;
  generateBtn.disabled = true;
  generateBtn.textContent = "Generowanie...";
  generateBtn.style.opacity = "0.6";
  generateBtn.style.cursor = "not-allowed";

  try {
    // Wybierz losową kategorię
    const categories = menuDataGlobal.categories;
    if (categories.length === 0) {
      alert("Brak kategorii w menu!");
      return;
    }

    const randomCategory =
      categories[Math.floor(Math.random() * categories.length)];

    // Generuj danie
    const newDish = await generateDish(randomCategory.name);

    // Generuj obraz (z timeoutem, żeby nie czekać zbyt długo)
    const imagePromise = generateDishImage(
      newDish.name,
      newDish.description,
      randomCategory.name
    );
    const imageTimeout = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Timeout")), 10000)
    );

    let imageUrl = null;
    try {
      imageUrl = await Promise.race([imagePromise, imageTimeout]);
    } catch (error) {
      console.warn("Nie udało się wygenerować obrazu:", error);
    }

    newDish.image = imageUrl;

    // Dodaj wygenerowane danie do menu
    const category = menuDataGlobal.categories.find(
      (cat) => cat.id === randomCategory.id
    );
    if (category) {
      category.items.push(newDish);
    }

    // Zapisz wygenerowane dania do localStorage
    saveGeneratedDishesToStorage(menuDataGlobal);

    // Przerenderuj menu
    const searchInput = document.getElementById("search-input");
    const sortSelect = document.getElementById("sort-select");
    const searchTerm = searchInput ? searchInput.value.trim() : "";
    const sortOrder = sortSelect ? sortSelect.value : "";

    const cartCallbacks = {
      onUpdate: () => {
        updateCartCount();
        renderCart();
        saveCartToStorage(getCart());
      },
    };

    renderMenu(menuDataGlobal, searchTerm, sortOrder, (item, button) => {
      addToCart(item, button, cartCallbacks);
    });

    // Pokaż komunikat sukcesu
    alert(
      `Wygenerowano nowe danie "${newDish.name}" w kategorii "${randomCategory.name}"!`
    );
  } catch (error) {
    console.error("Błąd podczas generowania dania:", error);
    alert("Wystąpił błąd podczas generowania dania. Spróbuj ponownie.");
  } finally {
    // Przywróć przycisk
    generateBtn.disabled = false;
    generateBtn.textContent = originalText;
    generateBtn.style.opacity = "1";
    generateBtn.style.cursor = "pointer";
  }
}

// Eksportuj funkcje globalnie
window.generateNewDishes = generateNewDishes;
window.generateSingleDish = generateSingleDish;
