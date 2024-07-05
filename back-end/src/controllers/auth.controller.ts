import { createUser, getUserByUsername } from "../services/user.service";
import * as authService from "../services/auth.service";
import query from "../configs/db";
import { Response, NextFunction, RequestHandler } from "express";
import * as authRequests from "../types/requests/auth.requests";
import CustomError from "../errors/CustomError";

export const register: RequestHandler<{}, any, authRequests.AuthRequestBody> = async (req, res, next) => {
    const { username, password } = req.body;

    // Check if username already exists
    const user = await getUserByUsername(username);

    if (user) {
        return next(new CustomError(
            401,
            "User with give username already exists.",
            `Auth Controller: unable to register: user ${username} already exists.`
        ));
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
        return next(err);
    }

};

export const login: RequestHandler<{}, any, authRequests.AuthRequestBody> = async (req, res, next) => {
    const { username, password } = req.body;

    // Check if user exits
    const user = await getUserByUsername(username);

    if (!user) {
        return next(new CustomError(
            401,
            "User with give username doesn't exist.",
            `Auth Controller: unable to login: user ${username} doesn't exist.`
        ));
    }

    // Compare passwords
    const isMatch = authService.comparePassword(password, user.password);

    if (!isMatch) {
        return next(new CustomError(
            403,
            "Wrong Credentials.",
            `Auth Controller: unable to login: wrong credentials.`
        ));
    }

    // Issue token
    try {
        const token = await authService.issueToken(user.user_id);
        res.status(200).json({
            message: "Authenticated.",
            token: token
        });
    } catch (err: any) {
        return next(err);
    }
};
