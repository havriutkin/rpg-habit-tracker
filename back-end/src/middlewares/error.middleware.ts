import { Request, Response, NextFunction } from "express";
import CustomError from "../errors/CustomError";
import logger from "../configs/logger";

const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (! (err instanceof CustomError)) {
        logger.error(`Unknown error ocurred: ${err.message}. \nStack: ${err.stack}`);

        res.status(500).json({
            message: "Error ocurred on a server."
        })

        return;
    }

    logger.error(`Error ocurred: ${err.loggerMessage}. \nStack: ${err.stack}`);

    res.status(err.responseCode).json({
        message: err.responseMessage
    })
}

export default errorMiddleware;