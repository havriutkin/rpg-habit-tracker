import { Router } from "express";
import * as habitController from "../controllers/habit.controller";
import authMiddleware from "../middlewares/auth.middleware";

const habitRouter = Router();

habitRouter.use(authMiddleware);

habitRouter.get("/:habit_id", habitController.getHabitById);
habitRouter.get("/user/:user_id", habitController.getHabitsByUserId);
habitRouter.post("/", habitController.createHabit);
habitRouter.post("/complete/:habit_id", habitController.completeHabit);
habitRouter.put("/:habit_id", habitController.updateHabit);
habitRouter.delete("/:habit_id", habitController.deleteHabit);

export default habitRouter;