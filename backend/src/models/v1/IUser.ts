export interface IUser{
    id:number,
    name:string,
    email:string,
    access_type?:string
}

export interface VerifyRefreshToken{
    user_id:number
}