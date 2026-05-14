# Katalog Firm

## Opis projektu

Aplikacja webowa do przeglądania katalogu firm oraz zarządzania wizytówkami biznesowymi poprzez panel administracyjny.

## Funkcjonalności

- Lista firm
- Dynamiczna wyszukiwarka
- Kategorie firm
- Wizytówki firm
- Panel administracyjny
- Logowanie administratora
- Responsive Web Design (RWD)
- Mock Data Integration

## Technologie

Frontend:

- HTML
- CSS
- JavaScript / React + Vite
- Tailwind CSS

Backend:

- ASP.NET Core MVC
- Entity Framework
- SQL Server

## Uruchomienie

### Wymagania
- .NET SDK 8.0 lub nowsze ([pobierz](https://dotnet.microsoft.com/download))
- Node.js 18+ i npm
- Dowolne IDE (Visual Studio, Rider, VS Code)

### Backend (ASP.NET Core + EF Core + SQLite)

```bash
cd backend
dotnet restore
dotnet run
```

Backend startuje pod adresem **http://localhost:5000**.
- Swagger UI: http://localhost:5000/swagger
- Baza SQLite (`businessdirectory.db`) i seed danych tworzą się automatycznie przy pierwszym starcie.
- Domyślne dane admina: login `admin`, hasło `admin123` (do zmiany w `appsettings.json`).

### Frontend (React + Vite + Tailwind)

W drugim terminalu:
```bash
cd frontend
npm install
npm run dev
```

Frontend startuje pod adresem **http://localhost:5173**.

### Jak przetestować że działa

1. Otwórz **http://localhost:5173** — powinieneś zobaczyć listę 6 firm pobraną z API.
2. Wpisz coś w wyszukiwarkę (np. `auto`) — lista filtruje się przez backend.
3. Wybierz kategorię z listy rozwijanej — filtruje po `kategoriaId`.
4. Kliknij **Panel administracyjny** (prawy górny róg) — zaloguj się jako `admin` / `admin123`.
5. Dodaj nową firmę, edytuj istniejącą, usuń — po każdej akcji widok się odświeża.
6. Wróć do katalogu (przycisk) — zobaczysz zmiany w widoku publicznym.
7. Sprawdź API bezpośrednio w Swaggerze: **http://localhost:5000/swagger**.

### Endpoints API

| Metoda | Endpoint                          | Autoryzacja |
|--------|-----------------------------------|-------------|
| GET    | `/api/firmy?search=&kategoriaId=` | publiczny   |
| GET    | `/api/firmy/{id}`                 | publiczny   |
| POST   | `/api/firmy`                      | admin (JWT) |
| PUT    | `/api/firmy/{id}`                 | admin (JWT) |
| DELETE | `/api/firmy/{id}`                 | admin (JWT) |
| GET    | `/api/kategorie`                  | publiczny   |
| POST   | `/api/kategorie`                  | admin (JWT) |
| DELETE | `/api/kategorie/{id}`             | admin (JWT) |
| POST   | `/api/auth/login`                 | publiczny   |
| GET    | `/api/auth/me`                    | admin (JWT) |

## Krok po kroku — pierwsze uruchomienie projektu lokalnie (Windows)

Instrukcja dla osoby, która klonuje projekt po raz pierwszy.

### 1. Zainstaluj wymagane narzędzia

- **.NET SDK 8.0 lub nowsze** — https://dotnet.microsoft.com/download
  Po instalacji zrestartuj terminal i sprawdź:
  ```
  dotnet --version
  ```
  Powinno wypisać np. `8.0.x`.
- **Node.js 18+ (z npm)** — https://nodejs.org (wersja LTS).
  Po instalacji sprawdź:
  ```
  node --version
  npm --version
  ```

### 2. Pobierz projekt

```
git clone <adres-repozytorium>
cd Business_Directory_App
```

### 3. (Tylko Windows / PowerShell) Odblokuj uruchamianie skryptów npm

Domyślna polityka PowerShella blokuje `npm.ps1`. Otwórz **PowerShell** i wykonaj raz:
```
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```
Zatwierdź wpisując `T`. **Zamknij i otwórz PowerShell ponownie**, żeby zmiana zadziałała.

Alternatywa: zamiast `npm` używaj `npm.cmd`, albo uruchamiaj komendy w zwykłym `cmd` (Wiersz polecenia) zamiast PowerShella.

### 4. Uruchom backend (terminal nr 1)

```
cd backend
dotnet restore
dotnet run
```

Co się stanie:
- pobiorą się paczki NuGet (przy pierwszym `dotnet restore`),
- utworzy się plik bazy `backend/businessdirectory.db`,
- baza zostanie wypełniona przykładowymi firmami i adminem (`admin` / `admin123`),
- otworzy się przeglądarka na **http://localhost:5000/swagger**.

W terminalu zobaczysz `Now listening on: http://localhost:5000` — **zostaw ten terminal otwarty**, backend musi działać przez cały czas.

### 5. Uruchom frontend (terminal nr 2, równolegle)

Otwórz **drugi** terminal (PowerShell lub cmd):
```
cd frontend
npm install
npm run dev
```

Co się stanie:
- `npm install` pobierze paczki Reacta, Vite, Tailwind (zajmuje 1–2 minuty przy pierwszym razie),
- `npm run dev` uruchomi serwer deweloperski Vite,
- w terminalu pojawi się linia `Local: http://localhost:5173/`.

Otwórz **http://localhost:5173** w przeglądarce.

### 6. Sprawdź że wszystko działa

1. Strona pokazuje 6 firm — to dane pobrane z backendu.
2. Wpisz `auto` w wyszukiwarkę — pokaże się tylko Auto-Fix.
3. Wybierz kategorię z listy rozwijanej — lista się zawęża.
4. Kliknij **Panel administracyjny** (prawy górny róg).
5. Zaloguj się: login `admin`, hasło `admin123`.
6. Dodaj firmę przez formularz, edytuj, usuń.
7. Wróć do katalogu — zobaczysz zmiany.

### 7. Zatrzymanie

W każdym terminalu naciśnij **Ctrl + C** żeby zatrzymać dany proces.

### Najczęstsze problemy

- **`npm : cannot be loaded because running scripts is disabled`** → wykonaj krok 3.
- **`dotnet: command not found`** → nie zainstalowałeś .NET SDK lub nie zrestartowałeś terminala po instalacji.
- **„Failed to fetch" / czerwony banner na froncie** → backend nie działa, sprawdź terminal nr 1.
- **Port 5000 lub 5173 zajęty** → zamknij inną aplikację która go używa, albo zmień port w `backend/Properties/launchSettings.json` / `frontend/vite.config.js`.
- **Chcesz zresetować dane** → zatrzymaj backend, usuń plik `backend/businessdirectory.db`, uruchom backend ponownie — baza odtworzy się ze świeżymi danymi seed.

## Autorzy

- Justyna Oczko
- Arkadiusz Kozak
