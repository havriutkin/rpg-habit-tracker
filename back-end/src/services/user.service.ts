import query from "../configs/db";
import User from "../models/User";

export const getUserById = async (id: number): Promise<User | undefined> => {
    const result = await query("SELECT * FROM user WHERE user_id = $1", [id]);
    if (result.length === 0) {
        return undefined;
    }

    return result[0] as User;
};

export const updateUserPoints = async (id: number, points: number): Promise<User> => {
    const result = await query("UPDATE user SET points = $1 WHERE user_id = $2 RETURNING *", [points, id]);
    if (result.length === 0) {
        throw new Error("User not found");
    }

    return result[0];
};

export const createUser = async (username: string, password: string) => {
    const newUser: Omit<User, "user_id"> = {
        username,
        password,
        points: 0
    }

    const result = await query("INSERT INTO user (username, password, points) VALUES ($1, $2, $3) RETURNING *", [newUser.username, newUser.password, newUser.points]);
    if (result.length === 0) {
        throw new Error("User not created");
    }

    return result[0];
};