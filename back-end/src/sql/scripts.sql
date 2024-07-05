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
CREATE OR REPLACE FUNCTION complete_habit(p_user_id INTEGER, p_habit_id INTEGER)
RETURNS habit AS $$
DECLARE
    habit_record habit;
BEGIN
    -- Select the habit record into the local variable
    SELECT * INTO habit_record FROM habit WHERE habit_id = p_habit_id;

    -- Check if the habit was already completed today
    IF habit_record.last_completed = CURRENT_DATE THEN
        RAISE EXCEPTION 'Habit already completed today';
    END IF;

    -- Update the user's points
    UPDATE "user" SET points = points + habit_record.points WHERE user_id = p_user_id;

    -- Update the habit's last completed date
    UPDATE habit SET last_completed = CURRENT_DATE WHERE habit_id = p_habit_id;
    SELECT * INTO habit_record FROM habit WHERE habit_id = p_habit_id;

    -- Return the habit record
    RETURN habit_record;

EXCEPTION
    WHEN OTHERS THEN
        -- If an error occurs, all changes are automatically rolled back
        RAISE EXCEPTION 'An error occurred: %', SQLERRM;
END;
$$ LANGUAGE plpgsql;


-- Procedure to purchase a reward and update points using transaction, return updated reward
CREATE OR REPLACE FUNCTION purchase_reward(p_user_id INTEGER, p_reward_id INTEGER)
RETURNS reward AS $$
DECLARE
    reward_record reward;
BEGIN
    -- Select the reward record into the local variable
    SELECT * INTO reward_record FROM reward WHERE reward_id = p_reward_id;

    -- Check if the reward is already purchased
    IF reward_record.is_purchased THEN
        RAISE EXCEPTION 'Reward already purchased';
    END IF;

    -- Update the user's points
    UPDATE "user" SET points = points - reward_record.points WHERE user_id = p_user_id;

    -- Update the reward's purchase status
    UPDATE reward SET is_purchased = TRUE WHERE reward_id = p_reward_id;
    SELECT * INTO reward_record FROM reward WHERE reward_id = p_reward_id;

    -- Return the reward record
    RETURN reward_record;

EXCEPTION
    WHEN OTHERS THEN
        -- If an error occurs, all changes are automatically rolled back
        RAISE EXCEPTION 'An error occurred: %', SQLERRM;
END;
$$ LANGUAGE plpgsql;
