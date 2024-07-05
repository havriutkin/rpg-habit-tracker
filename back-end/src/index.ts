import express, { Request, Response } from 'express';
import rewardRouter from './routes/reward.router';
import userRouter from './routes/user.router';
import habitRouter from './routes/habit.router';
import authRouter from './routes/auth.router';
import errorMiddleware from './middlewares/error.middleware';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
// todo: logger middleware
// todo: helmet
// todo: cors

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript with Express!');
});

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/habit", habitRouter);
app.use("/reward", rewardRouter);

app.use(errorMiddleware);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
