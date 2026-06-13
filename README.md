# Mogges Bars

En fullstack-applikation för att skapa, hantera, jämföra och analysera bars och shakes utifrån ingredienser, näringsvärden, vikt och pris.

## Översikt

Projektet består av:

- Ett React/Vite-frontend för navigation, formulär, listor, jämförelser och statistik.
- Ett Express/MongoDB-backend med autentisering, ingrediens-API och recept-API.
- JWT-baserad inloggning där skyddade endpoints används för att skapa, uppdatera och radera data.

Användaren kan:

- registrera konto och logga in
- skapa, redigera och ta bort ingredienser
- skapa, redigera och ta bort recept
- filtrera recepttyper som bars och shakes
- jämföra recept och se statistik
- beräkna makron, vikt och pris per recept

## Teknikstack

### Frontend

- React 19
- TypeScript
- Vite
- React Router
- Recharts
- CSS Modules

### Backend

- Node.js
- Express 5
- MongoDB
- Mongoose
- JWT
- bcrypt

## Projektstruktur

```text
Bar_project/
	backend/
		src/
			config/
			controllers/
			middleware/
			models/
			routes/
			services/
			server.js
		package.json
	frontend/
		public/
		src/
			auth/
			components/
			layouts/
			pages/
			services/
			types/
			App.tsx
			main.tsx
		package.json
		vite.config.js
	package.json
	README.md
```

## Funktioner

### Autentisering

- registrering via `/api/auth/register`
- inloggning via `/api/auth/login`
- JWT sparas i `localStorage` i frontend
- skyddade create/update/delete-endpoints skickar `Authorization: Bearer <token>`

### Ingredienser

- lista alla ingredienser
- visa en ingrediens
- skapa ny ingrediens
- uppdatera befintlig ingrediens
- radera ingrediens

Varje ingrediens kan innehålla:

- namn
- kalorier
- kolhydrater
- fett
- protein
- densitet
- pris per 1000 gram

### Recept

- lista alla recept
- visa ett recept
- skapa recept med flera ingredienser
- uppdatera recept
- radera recept
- filtrera recept på typ, till exempel `bar` eller `shake`

Ett recept består av:

- namn
- typ
- en lista ingredienser med gram per ingrediens
- summerade värden för näring, vikt och pris

### Statistik och jämförelse

- jämförelsevy mellan recept
- statistikvyer med diagram via Recharts
- separata sidor för bars och shakes

## Förutsättningar

Installera följande innan du startar projektet:

- Node.js 18 eller senare
- npm
- MongoDB Atlas eller lokal MongoDB-instans

## Installation

### 1. Klona projektet

```bash
git clone https://github.com/morganlindbom/mogges-bars.git
cd mogges-bars
```

### 2. Installera root dependencies

Root används för att kunna starta frontend och backend samtidigt.

```bash
npm install
```

### 3. Installera backend dependencies

```bash
cd backend
npm install
```

### 4. Installera frontend dependencies

```bash
cd ../frontend
npm install
```

## Miljövariabler

Skapa filen `backend/.env`:

```env
MONGO_URI=<din_mongodb_connection_string>
JWT_SECRET=<din_jwt_hemlighet>
PORT=3000
```

### Exempel

```env
MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/mogges-bars
JWT_SECRET=super_secret_key
PORT=3000
```

## Köra projektet lokalt

### Alternativ 1: starta allt från root

Startar backend och frontend parallellt via `concurrently`.

```bash
npm run dev
```

### Alternativ 2: starta delarna separat

Backend:

```bash
cd backend
npm run dev
```

Frontend:

```bash
cd frontend
npm run dev
```

### Adresser lokalt

- frontend: `http://localhost:5173`
- backend: `http://localhost:3000`

## Tillgängliga scripts

### Root

- `npm run dev` startar frontend och backend samtidigt

### Backend

- `npm run dev` startar servern med nodemon
- `npm start` startar servern med node

### Frontend

- `npm run dev` startar Vite dev-server
- `npm run build` bygger produktionsversion
- `npm run preview` förhandsgranskar build lokalt
- `npm run lint` kör ESLint

## Frontend-routing

Appen använder React Router och har följande huvudsidor:

- `/` omdirigerar till `/home`
- `/home`
- `/login`
- `/register`
- `/ingredients`
- `/ingredients/add`
- `/ingredients/:id/edit`
- `/recipes`
- `/recipes/:id/edit`
- `/bars`
- `/shakes`
- `/statistics`
- `/compare`

## Backend-API

Bas-URL lokalt:

```text
http://localhost:3000/api
```

### Auth

- `POST /api/auth/register`
- `POST /api/auth/login`

### Ingredients

- `GET /api/ingredients`
- `GET /api/ingredients/:id`
- `POST /api/ingredients` skyddad
- `PUT /api/ingredients/:id` skyddad
- `DELETE /api/ingredients/:id` skyddad

### Recipes

- `GET /api/recipes`
- `GET /api/recipes/:id`
- `GET /api/recipes?type=bar`
- `GET /api/recipes?type=shake`
- `POST /api/recipes` skyddad
- `PUT /api/recipes/:id` skyddad
- `DELETE /api/recipes/:id` skyddad

## Exempel på request-flöden

### Registrera användare

```http
POST /api/auth/register
Content-Type: application/json

{
	"email": "user@example.com",
	"password": "secret123"
}
```

### Logga in

```http
POST /api/auth/login
Content-Type: application/json

{
	"email": "user@example.com",
	"password": "secret123"
}
```

### Skapa ingrediens

```http
POST /api/ingredients
Authorization: Bearer <token>
Content-Type: application/json

{
	"name": "Havregryn",
	"calories": 389,
	"carbs": 66.3,
	"fat": 6.9,
	"protein": 16.9,
	"density": 0.45,
	"pricePer1000g": 28
}
```

### Skapa recept

```http
POST /api/recipes
Authorization: Bearer <token>
Content-Type: application/json

{
	"name": "Chocolate Bar",
	"type": "bar",
	"ingredients": [
		{
			"ingredientId": "665f4d2f1234567890abcd12",
			"grams": 120
		},
		{
			"ingredientId": "665f4d2f1234567890abcd34",
			"grams": 45
		}
	]
}
```

## Hur frontend kommunicerar med backend

- frontend använder relative API-anrop mot `/api/...`
- Vite proxar dessa anrop till `http://localhost:3000`
- `Authorization`-headern skickas vidare av Vite-proxyn i utvecklingsläge

Det betyder att du normalt inte behöver ändra frontend-kod för lokal utveckling så länge backend kör på port `3000`.

## Bygg för produktion

### Frontend

```bash
cd frontend
npm run build
npm run preview
```

### Backend

```bash
cd backend
npm start
```

## Felsökning

### Frontend får inte kontakt med backend

Kontrollera att:

- backend kör på port `3000`
- frontend kör via Vite
- `backend/.env` innehåller giltig `MONGO_URI`

### MongoDB-anslutning misslyckas

Kontrollera att:

- connection string är korrekt
- databasanvändaren har rätt behörighet
- din IP-adress är tillåten i MongoDB Atlas om du använder Atlas

### Skyddade endpoints returnerar 401 eller 403

Kontrollera att:

- du är inloggad
- token finns i `localStorage`
- request skickas med `Authorization: Bearer <token>`

### Portkonflikt

Om port `3000` eller `5173` redan används, stäng den process som använder porten eller ändra konfigurationen.

## Möjliga förbättringar

- lägga till tester för frontend och backend
- lägga till rollhantering eller bättre behörighetskontroll
- förbättra validering av formulär och API-input
- lägga till CI för lint och build
- lägga till deployment-instruktioner

## Commit-konvention

Projektet använder följande commit-typer:

- `feat` för ny funktion
- `fix` för buggrättning
- `chore` för setup eller konfiguration
- `refactor` för intern kodändring utan ny funktion
- `docs` för dokumentation
