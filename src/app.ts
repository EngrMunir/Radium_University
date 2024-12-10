/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any*/
import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/Routes';
const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// api/v1/students/create-student

// application routes
app.use('/api/v1', router);

const test = (req: Request, res: Response) => {
  const a = 20;
  res.send(a);
};

app.get('/', test);

app.use(globalErrorHandler)

// NOT FOUND
app.use(notFound)

export default app;
