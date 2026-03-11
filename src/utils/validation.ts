import type { CreateTodoInput } from '../types/todo';

const MAX_TITLE_LENGTH = 200;

export const parseCompletedQuery = (value: unknown): boolean | undefined => {
  if (typeof value === 'undefined') {
    return undefined;
  }

  if (value === 'true') {
    return true;
  }

  if (value === 'false') {
    return false;
  }

  throw new Error('Invalid completed query parameter');
};

export const validateCreateTodoInput = (body: unknown): CreateTodoInput => {
  if (!body || typeof body !== 'object' || !(('title' in body))) {
    throw new Error('title is required');
  }

  const { title } = body as { title?: unknown };

  if (typeof title !== 'string' || title.trim().length === 0) {
    throw new Error('title is required');
  }

  if (title.length > MAX_TITLE_LENGTH) {
    throw new Error('title must be 200 characters or fewer');
  }

  return { title };
};
