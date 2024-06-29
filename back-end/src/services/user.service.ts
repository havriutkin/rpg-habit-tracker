import CustomError from "errors/CustomError";
import query from "../configs/db";
import User from "../models/User";

export const getUserById = async (id: number): Promise<User | undefined> => {
    const result = await query("SELECT * FROM user WHERE user_id = $1", [id]);
    if (result.length === 0) {
        return undefined;
    }

    return result[0] as User;
};

export const getUserByUsername = async (username: string): Promise<User | undefined> => {
    const result = await query("SELECT * FROM user WHERE username = $1", [username]);
    if (result.length === 0) {
        return undefined;
    }

    return result[0] as User;
}

export const updateUserPoints = async (id: number, points: number): Promise<User> => {
    const result = await query("UPDATE user SET points = $1 WHERE user_id = $2 RETURNING *", [points, id]);
    if (result.length === 0) {
        throw new CustomError(404, "Error. User were not found.", "User Service: Unable to update user points: user not found.");
    }

    return result[0];
};

export const createUser = async (username: string, password: string): Promise<User> => {
    const newUser: Omit<User, "user_id"> = {
        username,
        password,
        points: 0
    }

    const result = await query("INSERT INTO user (username, password, points) VALUES ($1, $2, $3) RETURNING *", [newUser.username, newUser.password, newUser.points]);
    if (result.length === 0) {
        throw new CustomError(500, "Error. User were not created.", "User Service: Unable to create user.")
    }

    return result[0];
};