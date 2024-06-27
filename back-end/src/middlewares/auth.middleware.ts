import { Request, Response, NextFunction } from "express";
import * as authService from "../services/auth.service";

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        // todo: custom error
        return next(new Error());
    }

    try {
        const userInfo = await authService.decodeToken(token);
        req.user = userInfo; // todo
        next();
    } catch(err: any) {
        // todo: custom error
        return next(new Error());
    }
};

export default authMiddleware;