import express, { Request, Response } from 'express';
import rewardRouter from './routes/reward.router';
import userRouter from './routes/user.router';
import habitRouter from './routes/habit.router';

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript with Express!');
});

app.use("/user", userRouter);
app.use("/habit", habitRouter);
app.use("/reward", rewardRouter);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
