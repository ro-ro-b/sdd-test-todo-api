import request from 'supertest';
import { beforeEach, describe, expect, it } from 'vitest';
import { app } from '../src/app';
import { resetStore } from '../src/data/store';

describe('Todo API', () => {
  beforeEach(() => {
    resetStore();
  });

  it('lists all fixture todos', async () => {
    const response = await request(app).get('/api/todos');

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(3);
    expect(response.body.map((todo: { id: string }) => todo.id)).toEqual([
      'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
      'b2c3d4e5-f6a7-8901-bcde-f12345678901',
      'c3d4e5f6-a7b8-9012-cdef-123456789012'
    ]);
  });

  it('filters todos by completed=true', async () => {
    const response = await request(app).get('/api/todos?completed=true');

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].id).toBe('b2c3d4e5-f6a7-8901-bcde-f12345678901');
    expect(response.body[0].completed).toBe(true);
  });

  it('filters todos by completed=false', async () => {
    const response = await request(app).get('/api/todos?completed=false');

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
    expect(response.body.every((todo: { completed: boolean }) => todo.completed === false)).toBe(true);
  });

  it('returns 400 for invalid completed query values', async () => {
    const response = await request(app).get('/api/todos?completed=maybe');

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Invalid completed query parameter' });
  });

  it('creates a todo', async () => {
    const response = await request(app).post('/api/todos').send({ title: 'New task' });

    expect(response.status).toBe(201);
    expect(response.body.title).toBe('New task');
    expect(response.body.completed).toBe(false);
    expect(response.body.id).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
    );
    expect(new Date(response.body.createdAt).toISOString()).toBe(response.body.createdAt);
  });

  it('returns 400 when title is missing', async () => {
    const response = await request(app).post('/api/todos').send({});

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'title is required' });
  });

  it('returns 400 when title exceeds 200 characters', async () => {
    const response = await request(app)
      .post('/api/todos')
      .send({ title: 'a'.repeat(201) });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'title must be 200 characters or fewer' });
  });

  it('toggles a todo completion status', async () => {
    const response = await request(app).patch('/api/todos/a1b2c3d4-e5f6-7890-abcd-ef1234567890');

    expect(response.status).toBe(200);
    expect(response.body.id).toBe('a1b2c3d4-e5f6-7890-abcd-ef1234567890');
    expect(response.body.completed).toBe(true);
  });

  it('returns 404 for unknown todo id', async () => {
    const response = await request(app).patch('/api/todos/00000000-0000-0000-0000-000000000000');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'Todo not found' });
  });
});
