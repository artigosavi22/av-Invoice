import { IGeneralRepository } from "./models/IGenaralRepository";
import { IUser } from "../../models/v1/IUser";

export class GeneralRepository implements IGeneralRepository {
    // Remove 'function' keyword
    async getUser(useradmin: IUser): Promise<any> {
        // You should implement the logic here
        // For example, querying a database or an API.
        return {}; // Just a placeholder return value
    }
}
