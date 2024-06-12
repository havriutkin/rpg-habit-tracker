interface Habit {
    id: number;
    user_id: number;
    name: string;
    description: string;
    points: number;
    last_completed?: Date;
}

export default Habit;