import Reward from "../models/Reward";
import * as rewardService from "../services/reward.service"
import * as rewardRequests from "../types/requests/reward.requests"
import { RequestHandler } from "express";
import CustomError from "../errors/CustomError";


export const getRewardById: RequestHandler<rewardRequests.GetRewardByIdParams> = async (req, res, next) => {
    try {
        const reward: Reward | undefined = await rewardService.getRewardById(req.params.reward_id);
        if (!reward) {
            return next(new CustomError(
                404,
                "Error. Reward with given id was not found.",
                `Reward Controller: unable to get reward by id: reward doesn't exist with id ${req.params.reward_id}`
            ));
        }

        if (reward.user_id !== req.principal.user_id) {
            return next(new CustomError(
                403,
                "Unauthorized.",
                `Reward Controller: unable to get reward by id: user ${req.principal.user_id} doesn't have access to reward ${req.params.reward_id}`
            ));
        }

        res.status(200).json({
            name: reward.name,
            description: reward.description,
            price: reward.points,
            is_purchased: reward.is_purchased
        });
    } catch (error) {
        return next(error);
    }
};

export const getRewardsByUser: RequestHandler = async (req, res, next) => {
    try {
        const rewards: Reward[] = await rewardService.getRewardsByUserId(req.principal.user_id);
        const formattedRewards = rewards.map(reward => {
            return {
                name: reward.name,
                description: reward.description,
                price: reward.points,
                is_purchased: reward.is_purchased
            }
        });

        res.status(200).json(formattedRewards);
    } catch (error) {
        next(error);
    }
};

export const getPurchasedRewards: RequestHandler = async (req, res, next) => {
    try {
        const rewards: Reward[] = await rewardService.getPurchasedRewardsByUserId(req.principal.user_id);
        const formattedRewards = rewards.map(reward => {
            return {
                name: reward.name,
                description: reward.description,
                price: reward.points,
                is_purchased: reward.is_purchased
            }
        });
        res.status(200).json(formattedRewards);
    } catch (error) {
        next(error);
    }
};

export const getAvailableRewards: RequestHandler = async (req, res, next) => {
    try {
        const rewards: Reward[] = await rewardService.getAvailableRewardsByUserId(req.principal.user_id);
        const formattedRewards = rewards.map(reward => {
            return {
                name: reward.name,
                description: reward.description,
                price: reward.points,
                is_purchased: reward.is_purchased
            }
        });
        res.status(200).json(formattedRewards);
    } catch (error) {
        next(error);
    }
};

export const createReward: RequestHandler<{}, any, rewardRequests.CreateRewardBody> = async (req, res, next) => {
    try {
        const { name, description, points } = req.body;
        const reward = await rewardService.createReward(req.principal.user_id, name, description, points);
        res.status(201).json({
            name: reward.name,
            description: reward.description,
            price: reward.points,
            is_purchased: reward.is_purchased
        })
    } catch (error) {
        next(error);
    }
};

export const updateReward: RequestHandler<{}, any, rewardRequests.UpdateRewardBody> = async (req, res, next) => {
    try {
        const { reward_id, name, description } = req.body;

        // Get reward
        const reward = await rewardService.getRewardById(reward_id);

        if (!reward) {
            return next(new CustomError(
                404,
                "Error. Reward with given id was not found.",
                `Reward Controller: unable to update reward: reward doesn't exist with id ${reward_id}`
            ));
        }

        if (reward.user_id !== req.principal.user_id) {
            return next(new CustomError(
                403,
                "Unauthorized.",
                `Reward Controller: unable to update reward: user ${req.principal.user_id} doesn't have access to reward ${reward_id}`
            ));
        }

        const updatedReward = await rewardService.updateReward(reward_id, name || reward.name, description || reward.description);

        res.status(200).json({
            name: updatedReward.name,
            description: updatedReward.description,
            price: updatedReward.points,
            is_purchased: updatedReward.is_purchased
        })
    } catch (error) {
        next(error); // todo: custom error
    }
};

// todo: purchase reward

export const deleteReward: RequestHandler<rewardRequests.DeleteRewardParams, any, {}> = async (req, res, next) => {
    try {
        const { reward_id } = req.params;

        // Get reward
        const reward = await rewardService.getRewardById(reward_id);

        if (!reward) {
            return next(new CustomError(
                404,
                "Error. Reward with given id was not found.",
                `Reward Controller: unable to delete reward: reward doesn't exist with id ${reward_id}`
            ));
        }

        if (reward.user_id !== req.principal.user_id) {
            return next(new CustomError(
                403,
                "Unauthorized.",
                `Reward Controller: unable to delete reward: user ${req.principal.user_id} doesn't have access to reward ${reward_id}`
            ));
        }

        await rewardService.deleteReward(reward_id);

        res.status(200).json({
            message: "Reward was deleted."
        });
    } catch (error) {
        next(error);
    }
};
