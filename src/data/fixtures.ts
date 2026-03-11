import { Todo } from '../types/todo';

const FIXTURE_CREATED_AT = '2024-01-01T00:00:00.000Z';

export const todoFixtures: Todo[] = [
  {
    id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    title: 'Buy groceries',
    completed: false,
    createdAt: FIXTURE_CREATED_AT,
  },
  {
    id: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
    title: 'Write tests',
    completed: true,
    createdAt: FIXTURE_CREATED_AT,
  },
  {
    id: 'c3d4e5f6-a7b8-9012-cdef-123456789012',
    title: 'Deploy app',
    completed: false,
    createdAt: FIXTURE_CREATED_AT,
  },
];

export function cloneTodoFixtures(): Todo[] {
  return todoFixtures.map((todo) => ({ ...todo }));
}
