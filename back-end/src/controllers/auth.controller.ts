import { createUser, getUserByUsername } from "../services/user.service";
import * as authService from "../services/auth.service";
import query from "../configs/db";
import { Response, NextFunction } from "express";
import { RegisterRequest, LoginRequest } from "../types/requests/auth.requests";

export const register = async (req: RegisterRequest, res: Response, next: NextFunction) => {
    const { username, password } = req.body;

    // Check if username already exists
    const user = await getUserByUsername(username);

    if (user) {
        // todo: create custom error
        next(new Error);
    }

    // Hash password
    const hashedPassword = await authService.hashPassword(password);

    // Create user
    try {
        const newUser =  await createUser(username, hashedPassword)
        const token = await authService.issueToken(newUser.user_id);

        res.status(201).json({
            message: "User created.",
            token: token
        });
    } catch(err: any) {
        // Todo: custom errors
        return next(new Error);
    }

};

export const login = async (req: LoginRequest, res: Response, next: NextFunction) => {
    const { username, password } = req.body;

    // Check if user exits
    const user = await getUserByUsername(username);

    if (!user) {
        // Todo: custom error
        return next(new Error());
    }

    // Compare passwords
    const isMatch = authService.comparePassword(password, user.password);

    if (!isMatch) {
        // todo: custom error
        return next(new Error());
    }

    // Issue token
    try {
        const token = await authService.issueToken(user.user_id);
        res.status(200).json({
            message: "Authenticated.",
            token: token
        });
    } catch (err: any) {
        // todo: custom error
        return next(new Error());
    }
};
