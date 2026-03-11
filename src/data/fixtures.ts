import type { Todo } from '../types/todo';

export const todoFixtures: Todo[] = [
  {
    id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    title: 'Buy groceries',
    completed: false,
    createdAt: '2024-01-01T00:00:00.000Z'
  },
  {
    id: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
    title: 'Write tests',
    completed: true,
    createdAt: '2024-01-02T00:00:00.000Z'
  },
  {
    id: 'c3d4e5f6-a7b8-9012-cdef-123456789012',
    title: 'Deploy app',
    completed: false,
    createdAt: '2024-01-03T00:00:00.000Z'
  }
];
