import { Router } from "express";
import * as rewardController from "../controllers/reward.controller";
import authMiddleware from "../middlewares/auth.middleware";

const rewardRouter = Router();

rewardRouter.use(authMiddleware);

rewardRouter.get("/:reward_id", rewardController.getRewardById);
rewardRouter.get("/user", rewardController.getRewardsByUser);
rewardRouter.get("/purchased", rewardController.getPurchasedRewards);
rewardRouter.get("/available", rewardController.getAvailableRewards);
rewardRouter.post("/", rewardController.createReward);
rewardRouter.put("/", rewardController.updateReward);
rewardRouter.delete("/:reward_id", rewardController.deleteReward);

export default rewardRouter;