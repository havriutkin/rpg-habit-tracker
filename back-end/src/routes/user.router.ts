import { Router } from "express";
import * as userController from "../controllers/user.controller";

const userRouter = Router();

userRouter.get("/:user_id", userController.getUserById);

export default userRouter;