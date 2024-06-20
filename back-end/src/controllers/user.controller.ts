import * as userService from "../services/user.service"
import User from "../models/User"
import { Request, Response, NextFunction } from "express"
import * as userRequests from "../types/requests/user.requests"


export const getUserById = async (
                                req: userRequests.GetUserByIdRequest, 
                                res: Response, next: NextFunction) => { 
    try {
        const user: User | undefined = await userService.getUserById(req.params.user_id);
        if (!user) {
            res.status(404).send("User not found");
            return;
        }
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

