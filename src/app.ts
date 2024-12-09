import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { StudentRoutes } from './app/modules/student/student.route';
import { UserRoutes } from './app/modules/user/user.route';
const app: Application = express();
const port = 3000;

// parsers
app.use(express.json());
app.use(cors());

// api/v1/students/create-student

// application routes
app.use('/api/v1/students', StudentRoutes);
app.use('/api/v1/users', UserRoutes);

const getAController = (req: Request, res: Response) => {
  const a = 20;
  res.send(a);
};

app.get('/', getAController);

export default app;
