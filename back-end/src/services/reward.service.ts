import Reward from "../models/Reward";
import query from "../configs/db";

export const getRewardById = async (id: number): Promise<Reward | undefined> => {};

export const getRewardsByUserId = async (used_id: number): Promise<Reward[]> => {};

// Returns rewards where is_purchased is true
export const getPurchasedRewardsByUserId = async (user_id: number): Promise<Reward[]> => {};

// Returns rewards where is_purchased is false
export const getAvailableRewardsByUserId = async (user_id: number): Promise<Reward[]> => {};

export const createReward = async (name: string, description: string, price: number): Promise<Reward> => {};

export const updateReward = async (reward_id: number, name: string, description: string): Promise<Reward> => {};

export const deleteReward = async (id: number): Promise<void> => {};