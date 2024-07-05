import Reward from "../models/Reward";
import query from "../configs/db";
import User from "../models/User";
import CustomError from "../errors/CustomError";

export const getRewardById = async (id: number): Promise<Reward | undefined> => {
    const result = await query("SELECT * FROM reward WHERE reward_id = $1", [id]);
    if (result.length === 0) {
        return undefined;
    }

    return result[0] as Reward;
};

export const getRewardsByUserId = async (used_id: number): Promise<Reward[]> => {
    const result = await query("SELECT * FROM reward WHERE user_id = $1", [used_id]);
    return result as Reward[];
};

// Returns rewards where is_purchased is true
export const getPurchasedRewardsByUserId = async (user_id: number): Promise<Reward[]> => {
    const result = await query("SELECT * FROM reward WHERE user_id = $1 AND is_purchased = true", [user_id]);
    return result as Reward[];
};

// Returns rewards where is_purchased is false
export const getAvailableRewardsByUserId = async (user_id: number): Promise<Reward[]> => {
    const result = await query("SELECT * FROM reward WHERE user_id = $1 AND is_purchased = false", [user_id]);
    return result as Reward[];
};

export const createReward = async (user_id: number, name: string, description: string, price: number): Promise<Reward> => {
    const newReward: Omit<Reward, "reward_id"> = {
        user_id,
        name,
        description,
        price,
        is_purchased: false
    }

    const result = await query("INSERT INTO reward (user_id, name, description, price, is_purchased) VALUES ($1, $2, $3, $4, $5) RETURNING *", [newReward.user_id, newReward.name, newReward.description, newReward.price, newReward.is_purchased]);
    if (result.length === 0) {
        throw new CustomError(500, "Error. Reward were not created.", "Reward Service: Unable to create reward.")
    }

    return result[0];
};

export const updateReward = async (reward_id: number, name: string, description: string): Promise<Reward> => {
    const result = await query("UPDATE reward SET name = $1, description = $2 WHERE reward_id = $3 RETURNING *", [name, description, reward_id]);
    if (result.length === 0) {
        throw new CustomError(404, "Error. Reward were not found.", "Reward Service: Unable to update reward: reward not found.");
    }

    return result[0];
};

export const purchaseReward = async (user_id: number, reward_id: number): Promise<Reward> => {
    // Check if user has enough points to purchase reward
    const reward = await getRewardById(reward_id);
    if (!reward) {
        throw new CustomError(404, "Error. Reward were not found.", "Reward Service: Unable to purchase reward: reward not found.");
    }

    const user = await query("SELECT * FROM users WHERE user_id = $1", [user_id]) as User[];
    if (user.length === 0) {
        throw new CustomError(404, "Error. User were not found.", "Reward Service: Unable to purchase reward: user not found.");
    }

    if (user[0].points < reward.price) {
        throw new CustomError(403, "Error. Not enough points.", "Reward Service: Unable to purchase reward: not enough points");
    }

    // Use purchase_reward(user_id INTEGER, reward_id INTEGER) function in psql
    const result = await query("SELECT * FROM purchase_reward($1, $2)", [user_id, reward_id]);
    
    return result[0] as Reward;
};

export const deleteReward = async (id: number): Promise<void> => {
    await query("DELETE FROM reward WHERE reward_id = $1", [id]);
};