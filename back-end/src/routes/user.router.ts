import { Router } from "express";
import * as userController from "../controllers/user.controller";

const userRouter = Router();

userRouter.get("/:user_id", userController.getUserById);
userRouter.post("/points", userController.updateUserPoints);
userRouter.post("/", userController.createUser);

export default userRouter;