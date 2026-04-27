# Mogges Bars - Fullstack Lab

Detta projekt är en fullstack-applikation för att skapa, hantera och jämföra bars/shakes utifrån ingredienser och näringsvärden.

## Innehåll

- Autentisering (registrering/inloggning)
- CRUD för ingredienser
- Skapa/uppdatera recept
- Statistik och jämförelse mellan recept
- Beräkning av makron, vikt och pris

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
- Express
- MongoDB + Mongoose
- JWT (auth-endpoints)

## Projektstruktur

```
Bar_project/
	backend/
		src/
			controllers/
			middleware/
			models/
			routes/
			services/
			server.js
	frontend/
		src/
			auth/
			components/
			layouts/
			pages/
			services/
			types/
			App.tsx
```

## Kom igång

### 1. Installera dependencies

I backend:

```bash
cd backend
npm install
```

I frontend:

```bash
cd frontend
npm install
```

### 2. Miljövariabler (backend)

Skapa en `.env` i `backend` med:

```env
MONGO_URI=<din_mongodb_connection_string>
JWT_SECRET=<din_jwt_hemlighet>
PORT=3000
```

### 3. Starta backend

```bash
cd backend
npm run dev
```

Backend körs på `http://localhost:3000`.

### 4. Starta frontend

```bash
cd frontend
npm run dev
```

Frontend körs på Vites standardport (vanligtvis `http://localhost:5173`).

## API-översikt

### Auth

- `POST /api/auth/register`
- `POST /api/auth/login`

### Ingredients

- `GET /api/ingredients`
- `GET /api/ingredients/:id`
- `POST /api/ingredients` (skyddad)
- `PUT /api/ingredients/:id` (skyddad)
- `DELETE /api/ingredients/:id` (skyddad)

### Recipes

- `GET /api/recipes`
- `GET /api/recipes/:id`
- `POST /api/recipes` (skyddad)
- `PUT /api/recipes/:id` (skyddad)
- `DELETE /api/recipes/:id` (skyddad)

## Viktiga sidor i appen

- `/home`
- `/login`
- `/register`
- `/ingredients`
- `/ingredients/add`
- `/ingredients/:id/edit`
- `/recipes`
- `/recipes/:id/edit`
- `/compare`
- `/statistics`
- `/bars`
- `/shakes`

## Build

I frontend:

```bash
npm run build
npm run preview
```

I backend (produktion):

```bash
npm start
```

## Labbnotering

Projektet använder commit-typer enligt:

- `feat` - ny funktion
- `fix` - bugfix
- `chore` - setup/config
- `refactor` - kodändring utan ny funktion
- `docs` - dokumentation
