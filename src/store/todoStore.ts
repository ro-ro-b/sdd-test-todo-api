import { Todo } from '../types/todo';

export interface TodoStore {
  list(completed?: boolean): Todo[];
  create(todo: Todo): Todo;
  toggle(id: string): Todo | undefined;
  reset(todos: Todo[]): void;
}

export function createStore(initialTodos: Todo[]): TodoStore {
  let todos = initialTodos.map((todo) => ({ ...todo }));

  return {
    list(completed?: boolean) {
      if (typeof completed === 'boolean') {
        return todos.filter((todo) => todo.completed === completed).map((todo) => ({ ...todo }));
      }

      return todos.map((todo) => ({ ...todo }));
    },

    create(todo: Todo) {
      const nextTodo = { ...todo };
      todos.push(nextTodo);
      return { ...nextTodo };
    },

    toggle(id: string) {
      const todo = todos.find((item) => item.id === id);

      if (!todo) {
        return undefined;
      }

      todo.completed = !todo.completed;
      return { ...todo };
    },

    reset(nextTodos: Todo[]) {
      todos = nextTodos.map((todo) => ({ ...todo }));
    },
  };
}
