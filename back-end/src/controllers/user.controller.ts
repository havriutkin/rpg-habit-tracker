import * as userService from "../services/user.service"
import User from "../models/User"
import { Request, Response, NextFunction } from "express"
import * as userRequests from "../types/requests/user.requests"


export const getUserById = async (
                                req: userRequests.GetUserByIdRequest, 
                                res: Response, next: NextFunction) => {
    
};

export const updateUserPoints = async (
                                req: userRequests.UpdateUserPointsRequest, 
                                res: Response, next: NextFunction) => {

};

export const createUser = async (req: userRequests.CreateUserRequest, 
                                res: Response, next: NextFunction) => {

};
