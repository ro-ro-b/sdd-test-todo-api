import { Router } from 'express';
import { createTodo, listTodos, toggleTodo } from '../data/store';
import { parseCompletedQuery, validateCreateTodoInput } from '../utils/validation';

const todosRouter = Router();

todosRouter.get('/api/todos', (req, res) => {
  try {
    const completed = parseCompletedQuery(req.query.completed);
    const todos = listTodos(completed);
    res.status(200).json(todos);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Bad request';
    res.status(400).json({ error: message });
  }
});

todosRouter.post('/api/todos', (req, res) => {
  try {
    const input = validateCreateTodoInput(req.body);
    const todo = createTodo(input.title);
    res.status(201).json(todo);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Bad request';
    res.status(400).json({ error: message });
  }
});

todosRouter.patch('/api/todos/:id', (req, res) => {
  const todo = toggleTodo(req.params.id);

  if (!todo) {
    res.status(404).json({ error: 'Todo not found' });
    return;
  }

  res.status(200).json(todo);
});

export { todosRouter };
