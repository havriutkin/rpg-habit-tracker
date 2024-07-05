interface Habit {
    habit_id: number;
    user_id: number;
    name: string;
    description: string;
    points: number;
    last_completed: Date | null;
}

export default Habit;