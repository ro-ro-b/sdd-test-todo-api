import { randomUUID } from 'crypto';
import { todoFixtures } from './fixtures';
import type { Todo } from '../types/todo';

let todos: Todo[] = [];

const cloneTodo = (todo: Todo): Todo => ({ ...todo });

export const resetStore = (): void => {
  todos = todoFixtures.map(cloneTodo);
};

export const listTodos = (completed?: boolean): Todo[] => {
  if (typeof completed === 'boolean') {
    return todos.filter((todo) => todo.completed === completed).map(cloneTodo);
  }

  return todos.map(cloneTodo);
};

export const createTodo = (title: string): Todo => {
  const todo: Todo = {
    id: randomUUID(),
    title,
    completed: false,
    createdAt: new Date().toISOString()
  };

  todos.push(todo);
  return cloneTodo(todo);
};

export const toggleTodo = (id: string): Todo | null => {
  const todo = todos.find((item) => item.id === id);

  if (!todo) {
    return null;
  }

  todo.completed = !todo.completed;
  return cloneTodo(todo);
};

resetStore();
