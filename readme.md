# Alba Di Roma - Strona Restauracji Włoskiej

> **Projekt semestralny II** - Aplikacja webowa restauracji z dynamicznym menu, koszykiem zakupów i generowaniem dań za pomocą AI.

## Spis treści

1. [Opis projektu](#opis-projektu)
2. [Funkcjonalności](#funkcjonalności)
3. [Technologie](#technologie)
4. [Struktura projektu](#struktura-projektu)
5. [Architektura aplikacji](#architektura-aplikacji)
6. [Uruchomienie projektu](#uruchomienie-projektu)
7. [Dokumentacja modułów JavaScript](#dokumentacja-modułów-javascript)
8. [Stylowanie CSS](#stylowanie-css)
9. [Dane menu (JSON)](#dane-menu-json)
10. [CI/CD - GitHub Actions](#cicd---github-actions)
11. [Historia zadań z Trello](#historia-zadań-z-trello)
12. [Rekomendacje na przyszłość](#rekomendacje-na-przyszłość)
13. [Autorzy](#autorzy)

---

## Opis projektu

**Alba Di Roma** to nowoczesna, responsywna strona internetowa włoskiej restauracji, stworzona przy użyciu technologii frontendowych. Aplikacja umożliwia klientom przeglądanie menu, dodawanie dań do koszyka, składanie zamówień oraz generowanie nowych dań za pomocą sztucznej inteligencji.

### Cel główny

Stworzenie funkcjonalnej strony internetowej dla restauracji, która umożliwi klientom:

- Łatwe przeglądanie oferty menu
- Intuicyjne zarządzanie zamówieniem poprzez koszyk
- Szybkie wyszukiwanie interesujących dań
- Składanie zamówień w przejrzysty sposób
- Generowanie nowych dań przy użyciu AI

### Cele użytkowników (UX)

| Cel                       | Opis                                                                    |
| ------------------------- | ----------------------------------------------------------------------- |
| **Przeglądanie menu**     | Szybkie i wygodne przeglądanie dostępnych dań pogrupowanych w kategorie |
| **Zarządzanie koszykiem** | Proste dodawanie dań, modyfikacja ilości oraz usuwanie pozycji          |
| **Wyszukiwanie**          | Możliwość szybkiego znalezienia konkretnego dania                       |
| **Sortowanie**            | Opcja sortowania dań według ceny                                        |
| **Składanie zamówienia**  | Przejrzysty proces finalizacji zamówienia z podsumowaniem               |
| **Generowanie dań AI**    | Tworzenie nowych, unikalnych dań włoskich                               |

---

## Funkcjonalności

### Główne funkcje

| Funkcja                      | Opis                                            | Status              |
| ---------------------------- | ----------------------------------------------- | ------------------- |
| **Dynamiczne menu**          | Ładowanie menu z pliku JSON                     | ✅ Zaimplementowane |
| **System koszyka**           | Dodawanie, usuwanie, modyfikacja ilości dań     | ✅ Zaimplementowane |
| **Wyszukiwanie**             | Filtrowanie dań po nazwie w czasie rzeczywistym | ✅ Zaimplementowane |
| **Sortowanie**               | Sortowanie po cenie (rosnąco/malejąco)          | ✅ Zaimplementowane |
| **Responsywny design**       | Dostosowanie do różnych urządzeń                | ✅ Zaimplementowane |
| **Tooltip koszyka**          | Podgląd zawartości koszyka przy najechaniu      | ✅ Zaimplementowane |
| **Potwierdzenie zamówienia** | Modal z podsumowaniem zamówienia                | ✅ Zaimplementowane |
| **Formularz zamówienia**     | Dane klienta przy składaniu zamówienia          | ✅ Zaimplementowane |
| **LocalStorage**             | Zapisywanie koszyka i wygenerowanych dań        | ✅ Zaimplementowane |
| **Generowanie dań AI**       | Tworzenie nowych dań za pomocą OpenRouter API   | ✅ Zaimplementowane |
| **Generowanie obrazów**      | Pobieranie obrazów dań z Foodish API            | ✅ Zaimplementowane |

### Szczegóły funkcjonalności

#### 1. System koszyka zakupów

- Dodawanie produktów do koszyka z animacją
- Modyfikacja ilości produktów (+/-)
- Usuwanie produktów z koszyka
- Automatyczne zapisywanie do LocalStorage
- Tooltip z podglądem zawartości
- Modal z pełnym widokiem koszyka

#### 2. Formularz zamówienia

- Formularz z danymi klienta:
  - Imię i nazwisko (wymagane)
  - Telefon (wymagane, z walidacją formatu)
  - Email (opcjonalne)
  - Adres dostawy (wymagane)
  - Uwagi do zamówienia (opcjonalne)
- Walidacja pól formularza
- Potwierdzenie zamówienia z danymi klienta i listą zamówionych dań

#### 2. Wyszukiwanie i sortowanie

- Wyszukiwanie w czasie rzeczywistym (debouncing)
- Sortowanie po cenie rosnąco/malejąco
- Ukrywanie pustych kategorii po filtrowaniu

#### 3. Generowanie dań AI

- Wykorzystanie OpenRouter API z modelem DeepSeek v3.2
- Generowanie pojedynczych dań lub dla wszystkich kategorii
- Automatyczne dodawanie obrazów z Foodish API
- Zapisywanie wygenerowanych dań do LocalStorage

---

## Technologie

### Frontend

| Technologia           | Wersja | Zastosowanie                              |
| --------------------- | ------ | ----------------------------------------- |
| **HTML5**             | -      | Struktura semantyczna strony              |
| **CSS3**              | -      | Stylowanie z zmiennymi CSS, Flexbox, Grid |
| **JavaScript (ES6+)** | -      | Logika aplikacji, Fetch API, async/await  |
| **Google Fonts**      | -      | Czcionka Playfair Display                 |

### Zewnętrzne API

| API                | Zastosowanie                                           |
| ------------------ | ------------------------------------------------------ |
| **OpenRouter API** | Generowanie opisów dań (model: deepseek/deepseek-v3.2) |
| **Foodish API**    | Pobieranie zdjęć dań                                   |

### Narzędzia deweloperskie

| Narzędzie          | Zastosowanie                   |
| ------------------ | ------------------------------ |
| **GitHub Actions** | CI/CD pipeline                 |
| **Trello**         | Zarządzanie zadaniami projektu |
| **Git**            | Kontrola wersji                |

---

## Struktura projektu

```
projekt_semestralny_I/
├── .github/
│   └── workflows/
│       ├── node.js.yml          # GitHub Actions workflow
│       └── nodee.js.yml         # GitHub Actions workflow (backup)
├── js/
│   ├── cart.js                  # Logika koszyka zakupów
│   ├── cartUI.js                # Interfejs użytkownika koszyka
│   ├── constants.js             # Stałe konfiguracyjne (API keys)
│   ├── dishGenerator.js         # Generator dań AI
│   ├── main.js                  # Główny moduł inicjalizacji
│   ├── menu.js                  # Zarządzanie menu
│   ├── search.js                # Wyszukiwanie i sortowanie
│   └── storage.js               # Zarządzanie LocalStorage
├── index.html                   # Główny plik HTML
├── styles.css                   # Style CSS
├── menu.json                    # Dane menu restauracji
├── readme.md                    # Dokumentacja projektu
├── karta_projektu.pdf           # Karta projektu (PDF)
└── tasks-extracted.json         # Eksport zadań z Trello
```

---

## Architektura aplikacji

### Diagram przepływu danych

```
┌─────────────────────────────────────────────────────────────────┐
│                         index.html                               │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────────┐ │
│  │  Header  │  │   Menu   │  │  About   │  │     Contact      │ │
│  │   Nav    │  │ Section  │  │ Section  │  │     Section      │ │
│  └──────────┘  └──────────┘  └──────────┘  └──────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      JavaScript Modules                          │
│                                                                  │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐       │
│  │   main.js    │───▶│   menu.js    │───▶│  menu.json   │       │
│  │ (inicjalizacja)   │ (renderowanie)    │   (dane)      │       │
│  └──────────────┘    └──────────────┘    └──────────────┘       │
│         │                                                        │
│         ▼                                                        │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐       │
│  │   cart.js    │◀──▶│  cartUI.js   │    │  storage.js  │       │
│  │  (logika)    │    │    (UI)      │    │ (localStorage)│       │
│  └──────────────┘    └──────────────┘    └──────────────┘       │
│         │                                       │                │
│         ▼                                       ▼                │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐       │
│  │  search.js   │    │dishGenerator │    │ constants.js │       │
│  │(wyszukiwanie)│    │   .js (AI)   │    │  (config)    │       │
│  └──────────────┘    └──────────────┘    └──────────────┘       │
│                             │                                    │
│                             ▼                                    │
│                    ┌──────────────────┐                         │
│                    │  External APIs   │                         │
│                    │ - OpenRouter API │                         │
│                    │ - Foodish API    │                         │
│                    └──────────────────┘                         │
└─────────────────────────────────────────────────────────────────┘
```

### Przepływ danych koszyka

```
User Action ──▶ cart.js ──▶ cartUI.js ──▶ DOM Update
                  │
                  ▼
              storage.js
                  │
                  ▼
             LocalStorage
```

---

## Uruchomienie projektu

### Wymagania

- Przeglądarka internetowa z obsługą ES6+ (Chrome, Firefox, Safari, Edge)
- Serwer HTTP (opcjonalnie, do obsługi fetch API)

### Metoda 1: Bezpośrednie otwarcie

```bash
# Otwórz plik index.html w przeglądarce
open index.html  # macOS
start index.html # Windows
xdg-open index.html # Linux
```

### Metoda 2: Z serwerem lokalnym

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (z npx)
npx serve

# Live Server (VS Code extension)
# Kliknij prawym przyciskiem na index.html → "Open with Live Server"
```

Następnie otwórz `http://localhost:8000` w przeglądarce.

---

## Dokumentacja modułów JavaScript

### 1. `main.js` - Moduł inicjalizacji

**Opis:** Główny punkt wejścia aplikacji. Inicjalizuje wszystkie komponenty po załadowaniu DOM.

**Główne funkcje:**

- Inicjalizacja callbacków dla koszyka
- Wczytywanie danych z LocalStorage
- Ładowanie i scalanie menu
- Konfiguracja event listenerów

```javascript
// Główny przepływ inicjalizacji
document.addEventListener("DOMContentLoaded", async () => {
  // 1. Wczytaj koszyk z localStorage
  // 2. Wczytaj menu z JSON
  // 3. Scal z wygenerowanymi daniami
  // 4. Renderuj menu
  // 5. Skonfiguruj wyszukiwanie/sortowanie
  // 6. Zaktualizuj UI koszyka
});
```

### 2. `menu.js` - Zarządzanie menu

**Opis:** Obsługuje ładowanie i renderowanie menu restauracji.

**Funkcje:**

| Funkcja        | Parametry                                                    | Opis                                      |
| -------------- | ------------------------------------------------------------ | ----------------------------------------- |
| `loadMenu()`   | -                                                            | Asynchronicznie ładuje menu z `menu.json` |
| `renderMenu()` | `menuData`, `searchFilter`, `sortOrder`, `addToCartCallback` | Renderuje menu na stronie                 |

**Przykład użycia:**

```javascript
const menuData = await loadMenu();
renderMenu(menuData, "", "", (item, button) => {
  addToCart(item, button, callbacks);
});
```

### 3. `cart.js` - Logika koszyka

**Opis:** Zarządza stanem koszyka zakupów.

**Funkcje:**

| Funkcja               | Parametry                       | Opis                        |
| --------------------- | ------------------------------- | --------------------------- |
| `addToCart()`         | `item`, `button`, `callbacks`   | Dodaje produkt do koszyka   |
| `removeFromCart()`    | `itemId`, `callbacks`           | Usuwa produkt z koszyka     |
| `updateQuantity()`    | `itemId`, `change`, `callbacks` | Zmienia ilość produktu      |
| `updateCartCount()`   | -                               | Aktualizuje licznik w UI    |
| `updateCartTooltip()` | -                               | Aktualizuje tooltip koszyka |
| `renderCart()`        | -                               | Renderuje zawartość koszyka |
| `getCart()`           | -                               | Zwraca tablicę koszyka      |
| `setCart()`           | `newCart`                       | Ustawia koszyk              |
| `clearCart()`         | -                               | Czyści koszyk               |

### 4. `cartUI.js` - Interfejs koszyka

**Opis:** Obsługuje elementy UI związane z koszykiem oraz formularz zamówienia.

**Funkcje:**

| Funkcja                 | Opis                                          |
| ----------------------- | --------------------------------------------- |
| `showCartTooltip()`     | Pokazuje tooltip z podglądem koszyka          |
| `hideCartTooltip()`     | Ukrywa tooltip                                |
| `openCart()`            | Otwiera modal koszyka                         |
| `closeCart()`           | Zamyka modal koszyka                          |
| `checkout()`            | Przetwarza zamówienie (legacy)                |
| `closeCartAfterOrder()` | Zamyka modal po złożeniu zamówienia           |
| `showOrderForm()`       | Pokazuje formularz zamówienia                 |
| `hideOrderForm()`       | Ukrywa formularz i wraca do widoku koszyka    |
| `submitOrder()`         | Waliduje i przetwarza formularz zamówienia    |

**Przepływ składania zamówienia:**

```
Koszyk → [Zamów] → Formularz danych → [Złóż zamówienie] → Potwierdzenie
                         ↑                                      ↓
                     [Wróć]                               [Zamknij]
```

### 5. `search.js` - Wyszukiwanie i sortowanie

**Opis:** Obsługuje funkcjonalność wyszukiwania i sortowania dań.

**Funkcje:**

| Funkcja                | Parametry                              | Opis                                                       |
| ---------------------- | -------------------------------------- | ---------------------------------------------------------- |
| `setupSearchAndSort()` | `menuDataGlobal`, `renderMenuCallback` | Inicjalizuje event listenery dla wyszukiwarki i sortowania |

### 6. `storage.js` - LocalStorage

**Opis:** Zarządza persystencją danych w LocalStorage.

**Klucze LocalStorage:**

- `albaDiRomaCart` - dane koszyka
- `albaDiRomaGeneratedDishes` - wygenerowane dania

**Funkcje:**

| Funkcja                            | Opis                                           |
| ---------------------------------- | ---------------------------------------------- |
| `saveCartToStorage()`              | Zapisuje koszyk do LocalStorage                |
| `loadCartFromStorage()`            | Wczytuje koszyk z LocalStorage                 |
| `saveGeneratedDishesToStorage()`   | Zapisuje wygenerowane dania                    |
| `loadGeneratedDishesFromStorage()` | Wczytuje wygenerowane dania                    |
| `mergeMenuWithGeneratedDishes()`   | Scala oryginalne menu z wygenerowanymi daniami |

### 7. `dishGenerator.js` - Generator dań AI

**Opis:** Obsługuje generowanie nowych dań za pomocą AI.

**Funkcje:**

| Funkcja                       | Parametry                                     | Opis                                        |
| ----------------------------- | --------------------------------------------- | ------------------------------------------- |
| `generateDish()`              | `categoryName`                                | Generuje nowe danie używając OpenRouter API |
| `generateDishImage()`         | `dishName`, `dishDescription`, `categoryName` | Pobiera obraz z Foodish API                 |
| `addImagesToExistingDishes()` | `menuData`                                    | Dodaje obrazy do istniejących dań           |
| `generateNewDishes()`         | -                                             | Generuje dania dla wszystkich kategorii     |
| `generateSingleDish()`        | -                                             | Generuje jedno losowe danie                 |

**Mapowanie kategorii na Foodish API:**

```javascript
const categoryMapping = {
  Antipasti: "pizza",
  Insalate: "pizza",
  "Primi Piatti": "pasta",
};
```

### 8. `constants.js` - Stałe konfiguracyjne

**Opis:** Przechowuje stałe konfiguracyjne aplikacji.

```javascript
const OPENROUTER_API_KEY = "sk-or-v1-...";
const MODEL = "deepseek/deepseek-v3.2";
```

> **Uwaga:** W produkcji klucze API powinny być przechowywane bezpiecznie po stronie serwera.

---

## Stylowanie CSS

### Zmienne CSS (Custom Properties)

```css
:root {
  /* Kolory włoskiej restauracji */
  --primary-color: #8b2635; /* Bordo */
  --primary-dark: #6b1d28; /* Ciemniejsze bordo */
  --secondary-color: #3d5a1f; /* Ciemna zieleń */
  --accent-color: #4a5d23; /* Ciemna zieleń - akcent */
  --text-dark: #2c2c2c;
  --text-light: #666;
  --bg-light: #f5f5dc; /* Beż */
  --bg-white: #fefefe;
  --border-color: #d4c4a8; /* Beżowy border */

  /* Cienie */
  --shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  --shadow-hover: 0 4px 20px rgba(0, 0, 0, 0.15);

  /* Przejścia */
  --transition: all 0.3s ease;
  --transition-fast: all 0.2s ease;
}
```

### Główne komponenty CSS

| Komponent               | Opis                                   |
| ----------------------- | -------------------------------------- |
| **Header & Navigation** | Sticky header z gradientem bordo       |
| **Hero Section**        | Sekcja powitalna z przyciskiem CTA     |
| **Menu Grid**           | Responsywna siatka z kartami dań       |
| **Cart Modal**          | Modal koszyka z animacjami             |
| **Cart Tooltip**        | Tooltip z podglądem koszyka            |
| **Order Form**          | Formularz danych przy składaniu zamówienia |
| **Footer**              | Stopka z ikonami social media          |

### Responsywność

```css
/* Tablet */
@media (max-width: 768px) {
  nav > div {
    flex-direction: column;
  }
  .menu-items {
    grid-template-columns: 1fr;
  }
}

/* Mobile */
@media (max-width: 480px) {
  main {
    padding: 1rem;
  }
  #menu,
  #about,
  #contact {
    padding: 1.5rem;
  }
}
```

### Animacje

| Animacja        | Zastosowanie                           |
| --------------- | -------------------------------------- |
| `fadeIn`        | Pojawianie się tooltip'a koszyka       |
| `scaleIn`       | Ikona sukcesu po zamówieniu            |
| `hover effects` | Karty menu, przyciski, linki nawigacji |

---

## Dane menu (JSON)

### Struktura `menu.json`

```json
{
  "categories": [
    {
      "id": "antipasti",
      "name": "Antipasti",
      "items": [
        {
          "id": "bruschetta-classica",
          "name": "Bruschetta Classica",
          "description": "Opis dania po polsku",
          "price": 34
        }
      ]
    }
  ]
}
```

### Kategorie menu

| ID             | Nazwa        | Liczba dań |
| -------------- | ------------ | ---------- |
| `antipasti`    | Antipasti    | 4          |
| `insalate`     | Insalate     | 4          |
| `primi-piatti` | Primi Piatti | 4          |

### Przykładowe dania

| Kategoria    | Danie                   | Cena   |
| ------------ | ----------------------- | ------ |
| Antipasti    | Bruschetta Classica     | 34 zł  |
| Antipasti    | Prosciutto e Melone     | 46 zł  |
| Antipasti    | Calamari Fritti         | 62 zł  |
| Antipasti    | Caprese Salad           | 56 zł  |
| Insalate     | Insalata Mista          | 40 zł  |
| Insalate     | Insalata di Rucola      | 48 zł  |
| Insalate     | Caesar Italiana         | 44 zł  |
| Insalate     | Insalata di Mare        | 78 zł  |
| Primi Piatti | Spaghetti Carbonara     | 78 zł  |
| Primi Piatti | Risotto ai Funghi       | 88 zł  |
| Primi Piatti | Osso Buco               | 128 zł |
| Primi Piatti | Saltimbocca Alla Romana | 112 zł |

---

## CI/CD - GitHub Actions

### Konfiguracja workflow

Projekt wykorzystuje GitHub Actions do automatyzacji procesu CI/CD.

**Plik:** `.github/workflows/node.js.yml`

```yaml
name: Node.js CI

on:
  push:
    branches: ["main"]
  pull_request:
    branches: ["main"]

jobs:
  build:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [18.x, 20.x, 22.x]
    steps:
      - uses: actions/checkout@v4
      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
          cache: "npm"
      - run: echo "github workflows sie wykonal"
```

### Triggery

| Trigger        | Opis                                             |
| -------------- | ------------------------------------------------ |
| `push`         | Uruchamia się przy każdym push do brancha `main` |
| `pull_request` | Uruchamia się przy każdym PR do brancha `main`   |

### Testowane wersje Node.js

- Node.js 18.x
- Node.js 20.x
- Node.js 22.x

---

## Historia zadań z Trello

### Podsumowanie

- **Tablica:** PROJEKT SERMESTRALNY 1 - RESTAURACJA
- **Link:** [Trello Board](https://trello.com/b/nLKBrmGm/projekt-sermestralny-1-restauracja)
- **Łączna liczba zadań:** 27

### Statusy zadań

| Status                               | Liczba | Zadania                  |
| ------------------------------------ | ------ | ------------------------ |
| **W TRAKCIE**                        | 1      | Szablon HTML strony      |
| **DO ZROBIENIA**                     | 14     | HTML, CSS, JS, JSON      |
| **POMYSŁY, ZADANIA DO DOPRACOWANIA** | 5      | LocalStorage, AI, obrazy |
| **Trello Starter Guide**             | 6      | Domyślne karty Trello    |
| **Today**                            | 1      | Start using Trello       |

### Zadania HTML

| ID  | Zadanie                                           | Status       |
| --- | ------------------------------------------------- | ------------ |
| #8  | Szablon HTML strony                               | W TRAKCIE    |
| #10 | Dodać pusty kontener `<div id="menu-container">`  | POMYSŁY      |
| #11 | Dodać nagłówek i hero z przyciskiem "Zobacz menu" | DO ZROBIENIA |
| #12 | Dodać stopkę z ikonami social media               | DO ZROBIENIA |

### Zadania CSS

| ID  | Zadanie                                                      | Status       |
| --- | ------------------------------------------------------------ | ------------ |
| #9  | Stylowanie HTMLa (CSS)                                       | DO ZROBIENIA |
| #19 | Czcionka z Google Fonts (Playfair Display)                   | DO ZROBIENIA |
| #20 | Kolorystyka włoskiej restauracji (beż, bordo, ciemna zieleń) | DO ZROBIENIA |
| #21 | Cienie i delikatne animacje hover                            | DO ZROBIENIA |
| #22 | Układ menu w siatce (CSS Grid)                               | DO ZROBIENIA |
| #23 | Przykładowy design                                           | DO ZROBIENIA |

### Zadania JavaScript

| ID  | Zadanie                                           | Status       |
| --- | ------------------------------------------------- | ------------ |
| #14 | Wczytać dane z pliku JSON (fetch)                 | DO ZROBIENIA |
| #15 | Dla każdej kategorii utworzyć sekcję z listą dań  | DO ZROBIENIA |
| #16 | Każde danie wyświetlić jako kartę (div.menu-item) | DO ZROBIENIA |
| #17 | Dodać wyszukiwarkę filtrowującą po nazwie         | DO ZROBIENIA |
| #18 | Dodać sortowanie po cenie                         | DO ZROBIENIA |

### Zadania JSON

| ID  | Zadanie                 | Status       |
| --- | ----------------------- | ------------ |
| #13 | Utworzyć plik menu.json | DO ZROBIENIA |

### Zadania dodatkowe (POMYSŁY)

| ID  | Zadanie                                            | Status       |
| --- | -------------------------------------------------- | ------------ |
| #24 | Formularz wysyłkowy przy zamawianiu (LocalStorage) | ✅ GOTOWE    |
| #25 | Dane w LocalStorage                                | ✅ GOTOWE    |
| #26 | Dodanie AI do generowania dań                      | ✅ GOTOWE    |
| #27 | Dodanie AI do generowania zdjęć dań                | ✅ GOTOWE    |

---

## Rekomendacje na przyszłość

### Krótkoterminowe ulepszenia

| Ulepszenie              | Priorytet | Opis                                        |
| ----------------------- | --------- | ------------------------------------------- |
| ~~Walidacja formularzy~~| ✅ Gotowe | ~~Dodanie walidacji przy składaniu zamówienia~~ |
| Obsługa błędów          | Wysoki    | Przyjazne komunikaty przy błędach API       |
| Debouncing wyszukiwarki | Średni    | Optymalizacja przy większym menu            |
| Lazy loading obrazów    | Średni    | Opóźnione ładowanie zdjęć dań               |

### Długoterminowe rozszerzenia

| Rozszerzenie              | Opis                                          |
| ------------------------- | --------------------------------------------- |
| **Backend**               | Serwer do obsługi zamówień i zarządzania menu |
| **System płatności**      | Integracja z Stripe/PayPal                    |
| **System rezerwacji**     | Rezerwacja stolików online                    |
| **Panel administracyjny** | Zarządzanie menu i zamówieniami               |
| **System użytkowników**   | Rejestracja, logowanie, historia zamówień     |
| **Powiadomienia**         | Email/SMS o statusie zamówienia               |
| **Oceny i recenzje**      | Możliwość oceniania dań                       |
| **PWA**                   | Progressive Web App dla mobile                |
| **Analityka**             | Google Analytics do śledzenia zachowań        |

### Ulepszenia techniczne

| Obszar             | Rekomendacja                                      |
| ------------------ | ------------------------------------------------- |
| **Framework**      | Migracja na React/Vue.js przy większej złożoności |
| **Modułowość**     | Wykorzystanie ES6 modules                         |
| **Testy**          | Implementacja testów jednostkowych (Jest)         |
| **TypeScript**     | Dodanie typowania dla lepszej jakości kodu        |
| **Dokumentacja**   | Komentarze JSDoc dla funkcji                      |
| **Bezpieczeństwo** | Przeniesienie kluczy API na backend               |

---

## Wnioski z realizacji

### Co udało się osiągnąć

1. **Funkcjonalność podstawowa** - Wszystkie zaplanowane funkcje zostały zaimplementowane:
   - Dynamiczne ładowanie menu z JSON
   - Pełny system koszyka z LocalStorage
   - Wyszukiwanie i sortowanie w czasie rzeczywistym
   - Responsywny, estetyczny interfejs

2. **Rozszerzenia** - Dodatkowe funkcje wykraczające poza pierwotne wymagania:
   - Generowanie dań za pomocą AI (OpenRouter API)
   - Automatyczne pobieranie zdjęć (Foodish API)
   - Tooltip z podglądem koszyka

3. **Jakość kodu**:
   - Modularna struktura JavaScript
   - Separacja warstw (HTML, CSS, JS)
   - Wykorzystanie zmiennych CSS
   - Responsywny design

### Obserwacje techniczne

1. **Zarządzanie stanem** - Stan koszyka w zmiennej globalnej działa dobrze dla prostych zastosowań
2. **LocalStorage** - Skutecznie przechowuje dane między sesjami
3. **Zewnętrzne API** - Integracja z OpenRouter i Foodish API działa stabilnie

---

## Autorzy

| Imię i nazwisko    | Rola      |
| ------------------ | --------- |
| **Daniil Deineha** | Developer |
| **Daniel Dymek**   | Developer |
| **Jakub Sałata**   | Developer |

---

## Licencja

**Projekt edukacyjny** - Semestr I, 2025

---

## Linki

- [Tablica Trello](https://trello.com/b/nLKBrmGm/projekt-sermestralny-1-restauracja)
- [OpenRouter API](https://openrouter.ai/)
- [Foodish API](https://foodish-api.com/)
- [Google Fonts - Playfair Display](https://fonts.google.com/specimen/Playfair+Display)

---

_Ostatnia aktualizacja: Styczeń 2026_
