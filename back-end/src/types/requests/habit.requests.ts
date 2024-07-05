// habitRequests.ts
import { Request } from "express";

export interface GetHabitByIdParams {
    habit_id: number;
}

export interface CreateHabitBody {
    user_id: number;
    name: string;
    description: string;
    points: number;
}

export interface CompleteHabitParams {
    habit_id: number;
}

export interface UpdateHabitBody {
    habit_id: number;
    name: string | undefined;
    description: string | undefined;
    points: number | undefined;
}

export interface DeleteHabitParams {
    habit_id: number;
}