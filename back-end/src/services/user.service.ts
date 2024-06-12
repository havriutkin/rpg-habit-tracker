import query from "../configs/db";
import User from "../models/User";

export const getUserById = async (id: number): Promise<User | undefined> => {};

export const updateUserPoints = async (points: number): Promise<User> => {};

export const createUser = async (username: string, password: string) => {};