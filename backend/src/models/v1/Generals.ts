
import { Request } from "express";
import { IUser } from "./IUser";
export interface AuthenticatedRequest extends Request {
    user?: IUser;  // Or more specific type
    languageData?: Record<string,string>;
    token?: string;
}