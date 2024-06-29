import { Router } from "express";
import * as userController from "../controllers/user.controller";
import authMiddleware from "../middlewares/auth.middleware";

const userRouter = Router();

userRouter.use(authMiddleware);

userRouter.get("/", userController.getUserById);

export default userRouter;