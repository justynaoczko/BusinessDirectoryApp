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

## Autorzy

- Justyna Oczko
- Arkadiusz Kozak
