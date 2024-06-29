import { Request } from "express"

interface GetUserByIdParams {
    user_id: number;
}   

interface UpdateUserPointsBody {
    user_id: number;
    points: number;
}

interface CreateUserBody {
    username: string;
    password: string;
}

export type GetUserByIdRequest = Request<GetUserByIdParams, any, {}, {}>;
export type UpdateUserPointsRequest = Request<{}, any, UpdateUserPointsBody, {}>;
export type CreateUserRequest = Request<{}, any, CreateUserBody, {}>;