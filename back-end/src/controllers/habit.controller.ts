import Habit from "../models/Habit";
import * as habitService from "../services/habit.service";
import { Request, Response, NextFunction, response } from "express";
import * as habitRequests from "../@types/requests/habit.requests"

export const getHabitById = async (req: habitRequests.GetHabitByIdRequest, 
                                res: Response) => {
    // todo: implement
}

export const getHabitsByUserId = async (req: habitRequests.GetHabitsByUserRequest, 
                                res: Response, 
                                next: NextFunction) => {
    // todo: implement
}

export const createHabit = async (req: habitRequests.CreateHabitRequest,
                                res: Response,
                                next: NextFunction) => {
    // todo: implement
}

export const completeHabit = async (req: habitRequests.CompleteHabitRequest,
                                res: Response,
                                next: NextFunction) => {
    // todo: implement    
}

export const updateHabit = async (req: habitRequests.UpdateHabitRequest,
                                res: Response,
                                next: NextFunction) => {
    // todo: implement
}

export const deleteHabit = async (req: habitRequests.DeleteHabitRequest,
                                res: Response,
                                next: NextFunction) => {
    // todo: implement
}