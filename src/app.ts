import express, { NextFunction, Request, Response } from 'express';
import { cloneTodoFixtures } from './data/fixtures';
import { healthRouter } from './routes/health';
import { createTodosRouter } from './routes/todos';
import { createStore, TodoStore } from './store/todoStore';

export interface AppDependencies {
  store?: TodoStore;
}

export function createApp(dependencies: AppDependencies = {}) {
  const app = express();
  const store = dependencies.store ?? createStore(cloneTodoFixtures());

  app.use(express.json());

  app.use('/health', healthRouter);
  app.use('/api/todos', createTodosRouter(store));

  app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
    const message = err instanceof Error ? err.message : 'Internal server error';
    res.status(500).json({ error: message });
  });

  return app;
}
