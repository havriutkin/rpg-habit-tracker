import { Router } from "express";
import * as rewardController from "../controllers/reward.controller";

const rewardRouter = Router();

rewardRouter.get("/:reward_id", rewardController.getRewardById);
rewardRouter.get("/user/:user_id", rewardController.getRewardsByUser);
rewardRouter.get("/purchased/:user_id", rewardController.getPurchasedRewardsByUser);
rewardRouter.get("/available/:user_id", rewardController.getAvailableRewardsByUser);
rewardRouter.post("/", rewardController.createReward);
rewardRouter.put("/", rewardController.updateReward);
rewardRouter.delete("/:reward_id", rewardController.deleteReward);

export default rewardRouter;