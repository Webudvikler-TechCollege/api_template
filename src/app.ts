import express, { Request, Response } from 'express';
import { router as userRouter } from './routes/userRoutes';
import { router as dbRouter } from './routes/dbRoutes';
import { router as authRouter } from './routes/authRoutes';
import cors from 'cors'
import corsOptions from './utils/corsOptions';

const app = express();

app.use(express.json());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use("/api/users", userRouter)
app.use("/api/auth", authRouter)
app.use("/db", dbRouter)

export default app;