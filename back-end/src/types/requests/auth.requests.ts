import { Request } from "express";

export interface AuthRequestBody {
    username: string;
    password: string;
};