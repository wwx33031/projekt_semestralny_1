# Alba Di Roma - Strona Restauracji

## Streszczenie projektu

Projekt "Alba Di Roma" to nowoczesna, responsywna strona internetowa włoskiej restauracji, stworzona przy użyciu technologii frontendowych. Aplikacja umożliwia klientom przeglądanie menu, dodawanie dań do koszyka oraz składanie zamówień w intuicyjny i przyjazny sposób.

### Główne funkcjonalności:

- **Dynamiczne menu** - Menu restauracji jest ładowane z pliku JSON (`menu.json`), co umożliwia łatwą aktualizację oferty bez modyfikacji kodu HTML
- **System koszyka zakupów** - Pełnoprawny koszyk z możliwością dodawania, usuwania i modyfikacji ilości zamówionych dań
- **Wyszukiwanie i sortowanie** - Funkcje wyszukiwania dań po nazwie oraz sortowania po cenie (rosnąco/malejąco)
- **Responsywny design** - Strona dostosowuje się do różnych rozmiarów ekranów (desktop, tablet, mobile)
- **Nowoczesny interfejs** - Estetyczny design inspirowany włoską kuchnią z paletą kolorów nawiązującą do tradycji kulinarnych Włoch
- **Potwierdzenie zamówienia** - System wyświetlający podsumowanie zamówienia po jego złożeniu

### Technologie wykorzystane:

- **HTML5** - Struktura strony
- **CSS3** - Stylowanie z wykorzystaniem zmiennych CSS, flexbox i grid
- **JavaScript (ES6+)** - Logika aplikacji, obsługa asynchronicznego ładowania danych, zarządzanie stanem koszyka
- **JSON** - Format danych dla menu restauracji

### Struktura projektu:

```
projekt_semestralny_I/
├── index.html      # Główny plik HTML
├── styles.css      # Style CSS
├── script.js       # Logika JavaScript
├── menu.json       # Dane menu w formacie JSON
└── readme.md       # Dokumentacja projektu
```

## Cel projektu

### Cel główny:

Głównym celem projektu było stworzenie funkcjonalnej strony internetowej dla restauracji, która umożliwi klientom:

- Łatwe przeglądanie oferty menu
- Intuicyjne zarządzanie zamówieniem poprzez koszyk
- Szybkie wyszukiwanie interesujących dań
- Składanie zamówień w przejrzysty sposób

### Cele użytkowników (UX):

1. **Przeglądanie menu** - Użytkownik powinien móc szybko i wygodnie przeglądać dostępne dania, pogrupowane w kategorie (Antipasti, Insalate, Primi Piatti)
2. **Zarządzanie koszykiem** - Proste dodawanie dań do koszyka, modyfikacja ilości oraz usuwanie pozycji
3. **Wyszukiwanie** - Możliwość szybkiego znalezienia konkretnego dania poprzez wyszukiwarkę
4. **Sortowanie** - Opcja sortowania dań według ceny, ułatwiająca wybór w określonym przedziale cenowym
5. **Składanie zamówienia** - Przejrzysty proces finalizacji zamówienia z podsumowaniem

### Cele techniczne:

1. **Czysta architektura kodu** - Separacja warstw (HTML, CSS, JavaScript) oraz modularna struktura kodu
2. **Dynamiczne ładowanie danych** - Wykorzystanie asynchronicznego ładowania menu z pliku JSON przy użyciu Fetch API
3. **Responsywność** - Zapewnienie optymalnego doświadczenia użytkownika na wszystkich urządzeniach
4. **Wydajność** - Efektywne renderowanie elementów menu oraz zarządzanie stanem aplikacji
5. **Dostępność** - Zastosowanie semantycznego HTML oraz odpowiednich atrybutów ARIA

## Wnioski i rekomendacje

### Wnioski z realizacji projektu

#### Co udało się osiągnąć:

1. **Funkcjonalność podstawowa** - Wszystkie zaplanowane funkcje zostały zaimplementowane i działają poprawnie:

   - Menu jest dynamicznie ładowane z pliku JSON
   - Koszyk działa sprawnie z możliwością modyfikacji ilości
   - Wyszukiwanie i sortowanie działają w czasie rzeczywistym
   - Interfejs jest responsywny i estetyczny

2. **Struktura kodu** - Kod został zorganizowany w logiczny sposób:

   - Funkcje są odpowiednio pogrupowane (ładowanie menu, renderowanie, koszyk)
   - Zmienne globalne są zminimalizowane
   - Kod jest czytelny i łatwy w utrzymaniu

3. **Doświadczenie użytkownika** - Interfejs jest intuicyjny:

   - Tooltip przy koszyku pokazuje podgląd zawartości
   - Animacje i przejścia poprawiają odbiór wizualny
   - Potwierdzenie zamówienia daje użytkownikowi poczucie ukończenia procesu

4. **Design** - Strona prezentuje się profesjonalnie:
   - Spójna paleta kolorów nawiązująca do włoskiej kuchni
   - Responsywny layout dostosowujący się do różnych ekranów
   - Czytelna typografia i odpowiednie odstępy

#### Obserwacje techniczne:

1. **Zarządzanie stanem** - Stan koszyka jest przechowywany w zmiennej globalnej, co działa dobrze dla prostych zastosowań, ale może być problematyczne przy większej złożoności aplikacji

2. **Brak backendu** - Obecna implementacja działa wyłącznie po stronie klienta, co oznacza, że zamówienia nie są faktycznie przesyłane do restauracji

3. **Przechowywanie danych** - Koszyk jest tracony po odświeżeniu strony, ponieważ dane są przechowywane tylko w pamięci JavaScript

### Rekomendacje na przyszłość

#### Krótkoterminowe ulepszenia:

1. **LocalStorage dla koszyka** - Zaimplementować zapisywanie zawartości koszyka w `localStorage`, aby użytkownik nie tracił zamówienia po odświeżeniu strony

2. **Walidacja formularzy** - Jeśli zostanie dodany formularz kontaktowy lub formularz zamówienia, należy zaimplementować odpowiednią walidację danych

3. **Obsługa błędów** - Dodać bardziej szczegółową obsługę błędów, np. gdy plik `menu.json` nie może zostać załadowany, wyświetlić przyjazny komunikat użytkownikowi

4. **Optymalizacja wydajności** - Rozważyć lazy loading dla obrazów dań (jeśli zostaną dodane) oraz debouncing dla wyszukiwarki przy większych menu

#### Długoterminowe rozszerzenia:

1. **Integracja z backendem** - Połączenie strony z serwerem backendowym umożliwi:

   - Faktyczne przesyłanie zamówień do restauracji
   - Przechowywanie historii zamówień
   - Zarządzanie menu przez panel administracyjny
   - Integrację z systemem zarządzania restauracją

2. **System płatności** - Integracja z bramką płatniczą (np. Stripe, PayPal) umożliwi pełną funkcjonalność e-commerce

3. **System rezerwacji** - Dodanie funkcji rezerwacji stolików online z kalendarzem dostępności

4. **Panel administracyjny** - Stworzenie panelu do zarządzania menu, zamówieniami i ustawieniami restauracji

5. **System użytkowników** - Implementacja rejestracji i logowania, co umożliwi:

   - Historię zamówień
   - Zapisywanie ulubionych dań
   - Program lojalnościowy

6. **Powiadomienia** - System powiadomień email/SMS o statusie zamówienia

7. **Oceny i recenzje** - Możliwość oceniania dań i pozostawiania recenzji przez klientów

8. **Optymalizacja SEO** - Dodanie meta tagów, strukturyzowanych danych (Schema.org) oraz optymalizacji dla wyszukiwarek

9. **Aplikacja mobilna** - Rozważenie stworzenia natywnej aplikacji mobilnej lub PWA (Progressive Web App)

10. **Analityka** - Integracja z narzędziami analitycznymi (Google Analytics) do śledzenia zachowań użytkowników

#### Ulepszenia techniczne:

1. **Framework JavaScript** - Rozważenie migracji na framework (React, Vue.js) przy większej złożoności projektu

2. **Modułowość** - Podział kodu JavaScript na moduły ES6 dla lepszej organizacji

3. **Testy** - Implementacja testów jednostkowych i integracyjnych dla zapewnienia jakości kodu

4. **CI/CD** - Skonfigurowanie ciągłej integracji i wdrażania dla automatyzacji procesu developmentu

5. **Dokumentacja kodu** - Dodanie komentarzy JSDoc do funkcji dla lepszej dokumentacji technicznej

### Podsumowanie

Projekt "Alba Di Roma" został pomyślnie zrealizowany jako funkcjonalna strona restauracji z podstawowymi funkcjami e-commerce. Aplikacja spełnia założone cele i oferuje dobre doświadczenie użytkownika. Dalszy rozwój powinien skupić się na integracji z backendem oraz dodaniu zaawansowanych funkcji, które przekształcą stronę w pełnoprawny system zarządzania zamówieniami restauracyjnymi.

---

**Autor:** Daniil Deineha, Daniel Dymek, Jakub Sałata
**Data realizacji:** 2025  
**Wersja:** 1.0
