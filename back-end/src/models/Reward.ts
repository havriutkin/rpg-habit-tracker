interface Reward {
    reward_id: number;
    user_id: number;
    name: string;
    description: string;
    points: number;
    is_purchased: boolean;
}

export default Reward;