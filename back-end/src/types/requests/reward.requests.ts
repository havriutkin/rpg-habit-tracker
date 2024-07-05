import { Request } from "express";

export interface GetRewardByIdParams {
    reward_id: number;
};

export interface CreateRewardBody {
    name: string;
    description: string;
    points: number;
}

export interface UpdateRewardBody {
    reward_id: number;
    name: string | undefined;
    description: string | undefined;
};

export interface DeleteRewardParams {
    reward_id: number;
};