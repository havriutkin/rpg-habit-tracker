import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import Principal from '../models/Principal';
import CustomError from '../errors/CustomError';

const JWT_SECRET = "my_secret" // Todo: use env

export const hashPassword = async (password: string): Promise<string> => {
    const saltRounds = 10;
    const hashed = await bcrypt.hash(password, saltRounds);
    return hashed;
}

export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch;
}

export const issueToken = async (user_id: number): Promise<string> => {
    const payload: Principal = { user_id };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "7d"});
    return token;
}

export const decodeToken = async (token: string) => {
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as Principal;
        return decoded;
    } catch(err: any) {
        throw new CustomError(403, "Token is invalid.", "Unable to decode token.");
    }
}