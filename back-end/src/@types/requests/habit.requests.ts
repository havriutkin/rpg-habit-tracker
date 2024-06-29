// habitRequests.ts
import { Request } from "express";

interface GetHabitByIdParams {
    habit_id: number;
}

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
    name: string | undefined;
    description: string | undefined;
    points: number | undefined;
}

interface DeleteHabitParams {
    habit_id: number;
}

export type GetHabitByIdRequest = Request<GetHabitByIdParams>;
export type GetHabitsByUserRequest = Request;
export type CreateHabitRequest = Request<{}, any, CreateHabitBody>;
export type CompleteHabitRequest = Request<CompleteHabitParams>;
export type UpdateHabitRequest = Request<{}, any, UpdateHabitBody>;
export type DeleteHabitRequest = Request<DeleteHabitParams>;
