import * as userService from "../services/user.service"
import User from "../models/User"
import { Request, Response, NextFunction } from "express"

export const getUserById = async (
                                req: Request, 
                                res: Response, next: NextFunction) => { 
    const principal = req.principal;

    if (!principal) {
        return next(new Error()); // Todo: custom error
    }

    const user = await userService.getUserById(principal.user_id);

    if (!user) {
        return next(new Error()); // Todo: custom error
    }

    res.status(200).json({
        username: user.username,
        points: user.points        
    })
};

