import Habit from "../models/Habit";
import query from "../configs/db";

export const getHabitById = async (id: number): Promise<Habit | undefined> => {
    const result = await query("SELECT * FROM habit WHERE habit_id = $1", [id]);
    if (result.length === 0) {
        return undefined;
    }

    return result[0] as Habit;
};

export const getHabitsByUserId = async (user_id: number): Promise<Habit[]> => {
    const result = await query("SELECT * FROM habit WHERE user_id = $1", [user_id]);
    return result as Habit[];
};

export const createHabit = async (user_id: number, name: string, description: string, points: number): Promise<Habit> => {
    const newHabit: Omit<Habit, "habit_id"> = {
        user_id,
        name,
        description,
        points,
        last_completed: new Date()
    }

    const result = await query("INSERT INTO habit (user_id, name, description, points, last_completed) VALUES ($1, $2, $3, $4, $5) RETURNING *", [newHabit.user_id, newHabit.name, newHabit.description, newHabit.points, newHabit.last_completed]);
    if (result.length === 0) {
        throw new Error("Habit not created");
    }

    return result[0];
};

export const completeHabit = async (user_id: number, habit_id: number): Promise<Habit> => {
    // Check if habit wan not completed today
    const habit = await getHabitById(habit_id);
    if (!habit) {
        throw new Error("Habit not found");
    }

    const today = new Date();
    if (habit.last_completed && habit.last_completed.getDate() === today.getDate() && habit.last_completed.getMonth() === today.getMonth() && habit.last_completed.getFullYear() === today.getFullYear()) {
        throw new Error("Habit already completed today");
    }

    // Use complete_habit(user_id INTEGER, habit_id INTEGER) function 
    const result = await query("SELECT * FROM complete_habit($1, $2)", [user_id, habit_id]);
    if (result.length === 0) {
        throw new Error("Habit not found");
    }

    return result[0] as Habit;
};

export const updateHabit = async (habit_id: number, name: string, description: string, points: number): Promise<Habit> => {
    const result = await query("UPDATE habit SET name = $1, description = $2, points = $3 WHERE habit_id = $4 RETURNING *", [name, description, points, habit_id]);
    if (result.length === 0) {
        throw new Error("Habit not found");
    }

    return result[0];
};

export const deleteHabit = async (habit_id: number): Promise<void> => {
    await query("DELETE FROM habit WHERE habit_id = $1", [habit_id]);
};