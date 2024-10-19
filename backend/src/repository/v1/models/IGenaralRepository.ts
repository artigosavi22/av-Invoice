
import {IUser} from "../../../models/v1/IUser";

export  interface  IGeneralRepository{
    getBranches(): Promise<any[]>;
}