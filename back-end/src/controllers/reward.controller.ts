import Reward from "../models/Reward";
import * as rewardService from "../services/reward.service"
import * as rewardRequests from "../types/requests/reward.requests"
import { Request, Response, NextFunction } from "express";


export const getRewardById = async (req: rewardRequests.GetRewardByIdRequest,
                                res: Response,
                                next: NextFunction) => {
    // todo: implement
};

export const getRewardsByUser = async (req: rewardRequests.GetRewardsByUserRequest,
                                    res: Response,
                                    next: NextFunction) => {
    // todo: implement
};

export const getPurchasedRewardsByUser = async (req: rewardRequests.GetRewardsByUserRequest,
                                    res: Response,
                                    next: NextFunction) => {
    // todo: implement
};

export const getAvailableRewardsByUser = async (req: rewardRequests.GetRewardsByUserRequest,
                                    res: Response,
                                    next: NextFunction) => {
    // todo: implement
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
