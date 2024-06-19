CREATE TABLE "user" (
    "user_id" SERIAL PRIMARY KEY,
    "username" VARCHAR(255) NOT NULL UNIQUE,
    "password" VARCHAR(255) NOT NULL,
    "points" INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE "habit" (
    "habit_id" SERIAL PRIMARY KEY,
    "user_id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "points" INTEGER NOT NULL DEFAULT 0,
    "last_completed" DATE,
    FOREIGN KEY ("user_id") REFERENCES "user" ("user_id")
);

CREATE TABLE "reward" (
    "reward_id" SERIAL PRIMARY KEY,
    "user_id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "points" INTEGER NOT NULL DEFAULT 0,
    "is_purchased" BOOLEAN NOT NULL DEFAULT FALSE,
    FOREIGN KEY ("user_id") REFERENCES "user" ("user_id")
);


-- Procedure to complete a habit and update points using transaction, return updated habit
CREATE OR REPLACE FUNCTION complete_habit(user_id INTEGER, habit_id INTEGER)
RETURNS habit AS $$
DECLARE
    habit_record habit;
BEGIN
    SELECT * INTO habit_record FROM habit WHERE habit_id = habit_id;

    IF habit_record.last_completed = CURRENT_DATE THEN
        RAISE EXCEPTION 'Habit already completed today';
    END IF;

    UPDATE "user" SET points = points + habit_record.points WHERE user_id = user_id;
    UPDATE habit SET last_completed = CURRENT_DATE WHERE habit_id = habit_id;

    RETURN habit_record;

EXCEPTION
    WHEN OTHERS THEN
        -- If an error occurs, all changes are automatically rolled back
        RAISE EXCEPTION 'An error occurred: %', SQLERRM;
END;
$$ LANGUAGE plpgsql;

-- Procedure to purchase a reward and update points using transaction, return updated reward
CREATE OR REPLACE FUNCTION purchase_reward(user_id INTEGER, reward_id INTEGER)
RETURNS reward AS $$
DECLARE
    reward_record reward;
BEGIN
    SELECT * INTO reward_record FROM reward WHERE reward_id = reward_id;

    IF reward_record.is_purchased THEN
        RAISE EXCEPTION 'Reward already purchased';
    END IF;

    UPDATE "user" SET points = points - reward_record.points WHERE user_id = user_id;
    UPDATE reward SET is_purchased = TRUE WHERE reward_id = reward_id;

    RETURN reward_record;
    
EXCEPTION
    WHEN OTHERS THEN
        -- If an error occurs, all changes are automatically rolled back
        RAISE EXCEPTION 'An error occurred: %', SQLERRM;
END;
$$ LANGUAGE plpgsql;