
import {IUser} from "../../../models/v1/IUser";

export  interface  IGeneralRepository{
getUser(useradmin: IUser):Promise<[]>;
}