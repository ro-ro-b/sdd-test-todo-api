# sdd-test-todo-api

Minimal Express + TypeScript REST API for managing todo items with in-memory storage.

## Setup

```bash
npm install
```

## Environment Variables

Copy the example file if needed:

```bash
cp .env.example .env
```

Available variables:

- `PORT` - Server port, defaults to `3000`

## Scripts

- `npm run dev` - Start the development server with watch mode
- `npm run build` - Compile TypeScript to `dist`
- `npm start` - Run the compiled server
- `npm test` - Run Vitest integration tests

## API

### Health Check

- `GET /health` → `{ "status": "ok" }`

### Todos

- `GET /api/todos`
- `GET /api/todos?completed=true`
- `GET /api/todos?completed=false`
- `POST /api/todos`
- `PATCH /api/todos/:id`

## Validation

- `title` is required for todo creation
- `title` must be a string with maximum length `200`
- `PATCH /api/todos/:id` returns `404` when the todo does not exist

## In-Memory Storage

The API uses in-memory storage initialized from the provided fixtures. Data resets whenever the process restarts.

## Test Fixtures

The app and tests use these fixture todos:

- `a1b2c3d4-e5f6-7890-abcd-ef1234567890` — Buy groceries
- `b2c3d4e5-f6a7-8901-bcde-f12345678901` — Write tests
- `c3d4e5f6-a7b8-9012-cdef-123456789012` — Deploy app
