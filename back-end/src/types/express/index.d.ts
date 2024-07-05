import Principal from "../../models/Principal"

declare global {
    namespace Express {
        interface Request {
            principal: Principal;
        }
    }
};
