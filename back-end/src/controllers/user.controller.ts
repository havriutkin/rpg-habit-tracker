import * as userService from "../services/user.service"
import User from "../models/User"
import { Request, Response, NextFunction } from "express"
import CustomError from "../errors/CustomError";

export const getUserById = async (
                                req: Request, 
                                res: Response, next: NextFunction) => { 
    const user = await userService.getUserById(req.principal.user_id);

    if (!user) {
        return next(new CustomError(
            404,
            "Error. User with given id was not found.",
            `User Controller: unable to get user bby id: user doesn't exist with id ${req.principal.user_id}`
        ));
    }

    res.status(200).json({
        username: user.username,
        points: user.points        
    })
};

