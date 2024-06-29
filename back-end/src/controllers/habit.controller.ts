import Habit from "../models/Habit";
import * as habitService from "../services/habit.service";
import { Request, Response, NextFunction, response } from "express";
import * as habitRequests from "../@types/requests/habit.requests";

export const getHabitById = async (req: habitRequests.GetHabitByIdRequest, 
                                res: Response, next: NextFunction) => {
    try {
        const habit = await habitService.getHabitById(req.params.habit_id);
        
        if (!habit) {
            return next(new Error()); // todo: custom error
        }

        if (habit.user_id !== req.principal.user_id) {
            return next(new Error()); // todo: custom error
        }

        res.status(200).json({
            name: habit.name,
            description: habit.description,
            points: habit.points,
            last_completed: habit.last_completed,
        });
    } catch(error) {
        next(error);
    }
}

export const getHabits = async (req: habitRequests.GetHabitsByUserRequest, 
                                res: Response, 
                                next: NextFunction) => {
    try {
        const habits = await habitService.getHabitsByUserId(req.principal.user_id);
        const formattedHabits = habits.map(habit => {
            name: habit.name;
            description: habit.description;
            points: habit.points;
            last_completed: habit.last_completed;
        });

        res.status(200).json(formattedHabits);
    } catch(error) {
        next(error);
    }
}

export const createHabit = async (req: habitRequests.CreateHabitRequest,
                                res: Response,
                                next: NextFunction) => {
    try {
        const { name, description, points } = req.body;
        const habit = await habitService.createHabit(req.principal.user_id, name, description, points);
        res.status(201).json({
            name: habit.name,
            description: habit.description,
            points: habit.points,
            last_completed: habit.last_completed
        })
    } catch (error) {
        next(error); // todo: custom error
    }
}

export const completeHabit = async (req: habitRequests.CompleteHabitRequest,
                                res: Response,
                                next: NextFunction) => {
    try {
        const habit = await habitService.getHabitById(req.params.habit_id);
        
        if (!habit) {
            return next(new Error()); // todo: custom error
        }

        if (habit.user_id !== req.principal.user_id) {
            return next(new Error()); // todo: custom error
        }

        const completedHabit = await habitService.completeHabit(req.principal.user_id, habit.habit_id);

        res.status(200).json({
            name: completedHabit.name,
            description: completedHabit.description,
            points: completedHabit.points,
            last_completed: completedHabit.last_completed,
        });
    } catch(error) {
        next(error);
    }
}

export const updateHabit = async (req: habitRequests.UpdateHabitRequest,
                                res: Response,
                                next: NextFunction) => {
    try {
        const { habit_id, name, description, points } = req.body; 
        const habit = await habitService.getHabitById(habit_id);
        
        if (!habit) {
            return next(new Error()); // todo: custom error
        }

        if (habit.user_id !== req.principal.user_id) {
            return next(new Error()); // todo: custom error
        }

        const updatedHabit = await habitService.updateHabit(habit_id, 
            name || habit.name,
            description || habit.description,
            points || habit.points);

        res.status(200).json({
            name: updatedHabit.name,
            description: updatedHabit.description,
            points: updatedHabit.points,
            last_completed: updatedHabit.last_completed,
        });
    } catch(error) {
        next(error);
    }
}

export const deleteHabit = async (req: habitRequests.DeleteHabitRequest,
                                res: Response,
                                next: NextFunction) => {
    try {
        const { habit_id } = req.params;

        // Get reward
        const habit = await habitService.getHabitById(habit_id);

        if (!habit) {
            return next(new Error()); // todo: custom error
        }

        if (habit.user_id !== req.principal.user_id) {
            return next(new Error()); // todo: custom error
        }

        await habitService.deleteHabit(habit_id);

        res.status(200).json({
            message: "Habit was deleted."
        });
    } catch (error) {
        next(error); // todo: custom error
    }
}