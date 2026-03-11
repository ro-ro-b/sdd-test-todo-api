# sdd-test-todo-api

SDD test — simple todo API

## Setup

```bash
npm install
```

## Scripts

```bash
npm run dev
npm run build
npm start
npm test
```

## Endpoints

- `GET /health`
- `GET /api/todos`
- `POST /api/todos`
- `PATCH /api/todos/:id`

## Notes

- In-memory storage only
- `GET /api/todos?completed=true|false` filters by completion status
- Test runs reset the in-memory store between cases
