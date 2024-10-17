import { IUser } from "../../models/v1/IUser";
import { IUserRepository } from "../../repository/v1/models/IUserRepository";
import { UserRepository } from "../../repository/v1/UserRepository";


export class User implements IUser{
    private userRepository :IUserRepository;
    constructor(
        public id:number,
        public name : string,
        public email:string
    ){
        this.userRepository = new UserRepository();
    }
}