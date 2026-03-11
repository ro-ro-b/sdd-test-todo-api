import { randomUUID } from 'crypto';
import { Router } from 'express';
import { TodoStore } from '../store/todoStore';
import { validateTitle } from '../utils/validation';

export function createTodosRouter(store: TodoStore): Router {
  const router = Router();

  router.get('/', (req, res) => {
    const completedParam = req.query.completed;
    const completed = completedParam === 'true' ? true : completedParam === 'false' ? false : undefined;

    res.status(200).json(store.list(completed));
  });

  router.post('/', (req, res) => {
    const error = validateTitle(req.body?.title);

    if (error) {
      res.status(400).json({ error });
      return;
    }

    const todo = store.create({
      id: randomUUID(),
      title: req.body.title,
      completed: false,
      createdAt: new Date().toISOString(),
    });

    res.status(201).json(todo);
  });

  router.patch('/:id', (req, res) => {
    const todo = store.toggle(req.params.id);

    if (!todo) {
      res.status(404).json({ error: 'todo with given id not found' });
      return;
    }

    res.status(200).json(todo);
  });

  return router;
}
