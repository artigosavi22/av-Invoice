import { Request, Response ,NextFunction } from "express";
import { errorhandler } from "./errorHandler";
import AppError from "utils/AppError";
import { STATUS_CODE } from "resources/ResponseCode";


const swaggerAuth = (req:Request, res: Response, next:NextFunction)=>{
    const auth = {login: process.env.SWAGGER_USER,password: process.env.SWAGGER_PASSWORD }
    const b64auth = (req.headers.authorization || "").split(" ")[1] || "";

    const [login,password] = Buffer.from(b64auth,"base64").toString().split(":");
    if(login && password && login === auth.login && password === auth.password){
        return next();
    }

    res.set("WWW-Authenticate", 'Basic realm="401"');
    return errorhandler(new AppError("Unauthenticated user", STATUS_CODE.UNAUTHORIZED),
            req,
            res
    );

};

export default swaggerAuth;