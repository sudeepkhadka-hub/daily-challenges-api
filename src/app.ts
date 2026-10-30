import express, { Application } from 'express';
import preferencesRouter from './routes/preferencesRouter';
import challengeRouter from './routes/challengeRouter';
import categoriesRouter from './routes/categoriesRouter';


const app: Application = express();
app.use(express.json());

app.use('/preferences', preferencesRouter);
app.use('/challenge', challengeRouter);
app.use('/categories', categoriesRouter);

export default app;