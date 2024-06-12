import { Request } from "express";

interface GetHabitByIdParams {
    habit_id: number;
};

interface GetHabitsByUserParams {
    user_id: number;
};

interface CreateHabitBody {
    user_id: number;
    name: string;
    description: string;
    points: number;
}

interface CompleteHabitParams {
    habit_id: number;
}

interface UpdateHabitBody {
    habit_id: number;
    name: string;
    description: string;
    points: number;
}

interface DeleteHabitParams {
    habit_id: number;
}  

export type GetHabitByIdRequest = Request<GetHabitByIdParams, any, {}, {}>;
export type GetHabitsByUserRequest = Request<GetHabitsByUserParams, any, {}, {}>;
export type CreateHabitRequest = Request<{}, any, CreateHabitBody, {}>;
export type CompleteHabitRequest = Request<CompleteHabitParams, any, {}, {}>;
export type UpdateHabitRequest = Request<{}, any, UpdateHabitBody, {}>;
export type DeleteHabitRequest = Request<DeleteHabitParams, any, {}, {}>;