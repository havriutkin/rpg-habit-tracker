import Reward from "../models/Reward";
import * as rewardService from "../services/reward.service"
import * as rewardRequests from "../@types/requests/reward.requests"
import { Request, Response, NextFunction } from "express";


export const getRewardById = async (req: rewardRequests.GetRewardByIdRequest,
                                res: Response,
                                next: NextFunction) => {
    try {
        const reward: Reward | undefined = await rewardService.getRewardById(req.params.reward_id);
        if (!reward) {
            res.status(404).send("Reward not found");
            return;
        }
        res.status(200).json(reward);
    } catch (error) {
        next(error);
    }
};

export const getRewardsByUser = async (req: rewardRequests.GetRewardsByUserRequest,
                                    res: Response,
                                    next: NextFunction) => {
    try {
        const rewards: Reward[] = await rewardService.getRewardsByUserId(req.params.user_id);
        res.status(200).json(rewards);
    } catch (error) {
        next(error);
    }
};

export const getPurchasedRewardsByUser = async (req: rewardRequests.GetRewardsByUserRequest,
                                    res: Response,
                                    next: NextFunction) => {
    try {
        const rewards: Reward[] = await rewardService.getPurchasedRewardsByUserId(req.params.user_id);
        res.status(200).json(rewards);
    } catch (error) {
        next(error);
    }
};

export const getAvailableRewardsByUser = async (req: rewardRequests.GetRewardsByUserRequest,
                                    res: Response,
                                    next: NextFunction) => {
    try {
        const rewards: Reward[] = await rewardService.getAvailableRewardsByUserId(req.params.user_id);
        res.status(200).json(rewards);
    } catch (error) {
        next(error);
    }
};

export const createReward = async (req: rewardRequests.CreateRewardRequest,
                                res: Response,
                                next: NextFunction) => {
    // todo: implement
};

export const updateReward = async (req: rewardRequests.UpdateRewardRequest,
                                res: Response,
                                next: NextFunction) => {

    // todo: implement
};

export const deleteReward = async (req: rewardRequests.DeleteRewardRequest,
                                res: Response,
                                next: NextFunction) => {
    // todo: implement
};
