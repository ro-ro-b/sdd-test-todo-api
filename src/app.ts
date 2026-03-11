import express from 'express';
import { healthRouter } from './routes/health';
import { todosRouter } from './routes/todos';
import { errorHandler, notFoundHandler } from './middleware/error-handler';

const app = express();

app.use(express.json());
app.use(healthRouter);
app.use(todosRouter);
app.use(notFoundHandler);
app.use(errorHandler);

export { app };
