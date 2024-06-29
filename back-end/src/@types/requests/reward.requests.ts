import { Request } from "express";

interface GetRewardByIdParams {
    reward_id: number;
};

interface CreateRewardBody {
    name: string;
    description: string;
    price: number;
}

interface UpdateRewardBody {
    reward_id: number;
    name: string | undefined;
    description: string | undefined;
};

interface DeleteRewardParams {
    reward_id: number;
};

export type GetRewardByIdRequest = Request<GetRewardByIdParams, any, {}, {}>
export type GetRewardsByUserRequest = Request
export type CreateRewardRequest = Request<{}, any, CreateRewardBody, {}>;
export type UpdateRewardRequest = Request<{}, any, UpdateRewardBody, {}>;
export type DeleteRewardRequest = Request<DeleteRewardParams, any, {}, {}>;