import Habit from "../models/Habit";
import query from "../configs/db";

export const getHabitById = async (id: number): Promise<Habit | undefined> => {};

export const getHabitsByUserId = async (user_id: number): Promise<Habit[]> => {};

export const createHabit = async (user_id: number, name: string, description: string, points: number): Promise<Habit> => {};

// Update last_completed filed
// ? Either add points to user in controller
// ? Implement psql procedure and use transactions
export const completeHabit = async (habit_id: number): Promise<Habit> => {};

export const updateHabit = async (habit_id: number, name: string, description: string, points: number): Promise<Habit> => {};

export const deleteHabit = async (habit_id: number): Promise<void> => {};