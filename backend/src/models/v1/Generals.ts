
import { Request } from "express";
import { IUser } from "./IUser";
import { EmailContent} from '@azure/communication-email';

export interface AuthenticatedRequest extends Request {
    user?: IUser;  // Or more specific type
    languageData?: Record<string,string>;
    token?: string;
    user_id?:number;
}

export interface EMAIL_TYPE{
    to: Array<{address: string}>;
    htmlContent: EmailContent;
}