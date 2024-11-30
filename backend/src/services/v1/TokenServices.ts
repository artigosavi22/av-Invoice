import { IUser, VerifyRefreshToken } from "models/v1/IUser";
import { GeneralRepository } from "../../repository/v1/GeneralRepository";
import { IGeneralRepository } from "../../repository/v1/models/IGenaralRepository";
import NodeCache from "node-cache";
import jwt from "jsonwebtoken";
import AppError from "../../utils/AppError";
import { STATUS_CODE } from "../../resources/ResponseCode";
import { logger } from "../../config";

export class TokenServices {
    private static instance: TokenServices;
    private blacklistedtokens: any;

    public static getInstance(): TokenServices {
        if (!TokenServices.instance) {
            TokenServices.instance = new TokenServices();
        }
        return TokenServices.instance;
    }

    constructor() {
        this.blacklistedtokens = new NodeCache(); 
    }

    public genarateToken(payload: Object): string {
        const token = jwt.sign({payload}, process.env.JWT_SECRETE!,{
            expiresIn : `${process.env.JWT_REGISTER_LINK_EXPIRATION}${process.env.JWT_REGISTER_LINK_EXPIRATION_PARAMETER}`
        });
        return token;
    }

    public isTokenBlacklisted(token:string):boolean{
        return this.blacklistedtokens.get(token);
    }
    public verifyToken<T>(token:string, langData:any): T {
        try {
            if(this.isTokenBlacklisted(token)){
                throw new AppError(
                    langData!.RESPONSE_MESSAGES.VALIDATOR.INVALID_TOKEN,
                    STATUS_CODE.UNAUTHORIZED
                );
            }
            const decoded: { payload :T } = jwt.verify(
                token, process.env.JWT_SECRETE!
            ) as {payload : T}

            return decoded.payload;
        } catch (error) {
            logger.error("Error in TokenServices"+ error);
            if( error instanceof jwt.JsonWebTokenError){
                throw new AppError(
                    langData!.RESPONSE_MESSAGES.VALIDATOR.INVALID_TOKEN,
                    STATUS_CODE.UNAUTHORIZED
                );
            }else if( error instanceof jwt.TokenExpiredError){
                throw new AppError(
                    langData!.RESPONSE_MESSAGES.VALIDATOR.TOKEN_EXPIRE,
                    STATUS_CODE.UNAUTHORIZED
                );
            } else{
                throw new AppError(
                    langData!.RESPONSE_MESSAGES.VALIDATOR.FAILED_DECODE_TOKEN,
                    STATUS_CODE.UNAUTHORIZED
                );
            }       
        }
    }

    public blacklistToken(token:string):void{
        const blacklistTime = Number(process.env.JWT_REGISTER_LINK_EXPIRATION) +10;
        this.blacklistedtokens.set(token,token,blacklistTime);
    }

    public genarateRefreshToken(user_id: number): string {
        const refreshToken = jwt.sign({user_id}, process.env.JWT_SECRETE!,{
            expiresIn : `${process.env.JWT_REGISTER_LINK_EXPIRATION}${process.env.JWT_REGISTER_LINK_EXPIRATION_PARAMETER}`
        });
        return refreshToken;
    } 

    public verifyRefreshToken<T>(token:string, langData:any): VerifyRefreshToken {
        try {
            const decoded: VerifyRefreshToken = jwt.verify(
                token, process.env.JWT_SECRETE!
            ) as VerifyRefreshToken

            return decoded;
        } catch (error) {
            logger.error("Error in RefreshTokenServices"+ error);
            if( error instanceof jwt.JsonWebTokenError){
                throw new AppError(
                    langData!.RESPONSE_MESSAGES.VALIDATOR.INVALID_TOKEN,
                    STATUS_CODE.UNAUTHORIZED
                );
            }else if( error instanceof jwt.TokenExpiredError){
                throw new AppError(
                    langData!.RESPONSE_MESSAGES.VALIDATOR.TOKEN_EXPIRE,
                    STATUS_CODE.UNAUTHORIZED
                );
            } else{
                throw new AppError(
                    langData!.RESPONSE_MESSAGES.VALIDATOR.FAILED_DECODE_TOKEN,
                    STATUS_CODE.UNAUTHORIZED
                );
            }       
        }
    }
}
