import { Request } from "express";

interface AuthRequest {
    username: string;
    password: string;
};

export type RegisterRequest = Request<{}, any, AuthRequest, {}>;
export type LoginRequest = Request<{}, any, AuthRequest, {}>;
