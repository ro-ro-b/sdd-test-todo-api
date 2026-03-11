import request from 'supertest';
import { describe, expect, it, beforeEach } from 'vitest';
import { createApp } from '../src/app';
import { cloneTodoFixtures } from '../src/data/fixtures';
import { createStore, TodoStore } from '../src/store/todoStore';

describe('Todo API', () => {
  let store: TodoStore;

  beforeEach(() => {
    store = createStore(cloneTodoFixtures());
  });

  it('returns health status', async () => {
    const app = createApp({ store });
    const response = await request(app).get('/health');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: 'ok' });
  });

  it('lists all todos', async () => {
    const app = createApp({ store });
    const response = await request(app).get('/api/todos');

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(3);
    expect(response.body.map((todo: { id: string }) => todo.id)).toEqual([
      'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
      'b2c3d4e5-f6a7-8901-bcde-f12345678901',
      'c3d4e5f6-a7b8-9012-cdef-123456789012',
    ]);
  });

  it('filters todos with completed=true', async () => {
    const app = createApp({ store });
    const response = await request(app).get('/api/todos?completed=true');

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].id).toBe('b2c3d4e5-f6a7-8901-bcde-f12345678901');
    expect(response.body[0].completed).toBe(true);
  });

  it('filters todos with completed=false', async () => {
    const app = createApp({ store });
    const response = await request(app).get('/api/todos?completed=false');

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
    expect(response.body.every((todo: { completed: boolean }) => todo.completed === false)).toBe(true);
  });

  it('creates a todo', async () => {
    const app = createApp({ store });
    const response = await request(app).post('/api/todos').send({ title: 'New task' });

    expect(response.status).toBe(201);
    expect(response.body.title).toBe('New task');
    expect(response.body.completed).toBe(false);
    expect(response.body.id).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
    );
    expect(new Date(response.body.createdAt).toISOString()).toBe(response.body.createdAt);
  });

  it('returns 400 when title is missing', async () => {
    const app = createApp({ store });
    const response = await request(app).post('/api/todos').send({});

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'title is required' });
  });

  it('returns 400 when title exceeds 200 characters', async () => {
    const app = createApp({ store });
    const response = await request(app)
      .post('/api/todos')
      .send({ title: 'a'.repeat(201) });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'title is missing or exceeds 200 characters' });
  });

  it('toggles a todo completion status', async () => {
    const app = createApp({ store });
    const response = await request(app).patch('/api/todos/a1b2c3d4-e5f6-7890-abcd-ef1234567890');

    expect(response.status).toBe(200);
    expect(response.body.id).toBe('a1b2c3d4-e5f6-7890-abcd-ef1234567890');
    expect(response.body.completed).toBe(true);
  });

  it('returns 404 when todo is not found', async () => {
    const app = createApp({ store });
    const response = await request(app).patch('/api/todos/11111111-1111-1111-1111-111111111111');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'todo with given id not found' });
  });

  it('returns 404 for invalid uuid when todo is not found', async () => {
    const app = createApp({ store });
    const response = await request(app).patch('/api/todos/not-a-uuid');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'todo with given id not found' });
  });
});
