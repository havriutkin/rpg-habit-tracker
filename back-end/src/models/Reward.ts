interface Reward {
    id: number;
    user_id: number;
    name: string;
    description: string;
    price: number;
    is_purchased: boolean;
}

export default Reward;