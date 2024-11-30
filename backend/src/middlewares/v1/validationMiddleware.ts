import { NextFunction, Response } from "express";
import { STATUS_CODE } from "../../resources/ResponseCode";
import { Validator } from "jsonschema";
import { AuthenticatedRequest } from "../../models/v1/Generals";
import { LANGUAGE } from "../../resources/SupportedLanguage";
import AppError from "../../utils/AppError";
import { errorhandler } from "./errorHandler";
import { LanguageResourceManager } from "../../resources/LanguageResources";
import { IUser, VerifyRefreshToken } from "models/v1/IUser";
import { NodeCacheManager } from "../../repository/v1/NodeCache";
import { TokenServices } from "../../services/v1/TokenServices";
import {ajv} from "../../config";

const validator = new Validator();

export const validateLanguageParam = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const language = req.query?.language as string;
  if (!language) {
    return errorhandler(
      new AppError(
        "Query Parameter 'language' is required",
        STATUS_CODE.BAD_GATEWAY
      ),
      req,
      res
    );
  }
  // console.log(language);
  const isSuppported = LANGUAGE.includes(language as string);
  if (!isSuppported) {
    return errorhandler(
      new AppError("language not Supported", STATUS_CODE.BAD_GATEWAY),
      req,
      res
    );
  }
  const languageResource = LanguageResourceManager.getInstance();
  req.languageData = languageResource.getResource(language);
  delete req.query.language;
  next();
};

export function validateBody(schema: object) {
  const validate = ajv.compile(schema);
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const langData: any = req.languageData;
    if (!validate(req.body)) {
      const error = validate.error?.[0];
      const missingProperty = error?.instancePath || "Unknown Property";
      const errorMessage =
        error?.message ||
        `${langData.RESPONSE_MESSAGES.ERROR.INVALID_REQUEST_BODY}`;
      return errorhandler(
        new AppError(errorMessage, STATUS_CODE.BAD_REQUEST),
        req,
        res
      );
    }
    next();
  };
}

export function parseSwaggerBody(fieldName:string){
  return(req: AuthenticatedRequest, res: Response, next: NextFunction)=>{
    try {
      if(typeof req.body[fieldName]==="string"){
        req.body[fieldName] = JSON.parse(req.body[fieldName]);
      }
    } catch (error) {
      throw error
    }
  };
}

export const validateToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers?.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    const languageData: any = req.languageData;
    if (!token)
      return errorhandler(
        new AppError(
          languageData!.RESPONSE_MESSAGES.VALIDATOR.INVALID_TOKEN,
          STATUS_CODE.BAD_GATEWAY
        ),
        req,
        res
      );
    req.token = token;
    const tokenServices = TokenServices.getInstance();
    const userData: IUser = tokenServices.verifyToken(token, req.languageData!);
    if (!userData) {
      return errorhandler(
        new AppError(
          languageData!.RESPONSE_MESSAGES.VALIDATOR.INVALID_TOKEN,
          STATUS_CODE.BAD_GATEWAY
        ),
        req,
        res
      );
    }
    const tempData: IUser | undefined = NodeCacheManager.get(userData.id);
    if (!tempData) {
      const resp = NodeCacheManager.getUser(
        userData.id,
        userData,
        Number(process.env.JWT_REGISTER_LINK_EXPIRATION)
      );
      req.user = NodeCacheManager.get(userData.id);
    }
    if (tempData) {
      req.user = tempData;
    }
    next();
  } catch (error) {
    throw error;
  }
};


export function validateRefreshToken(req: AuthenticatedRequest, res: Response, next: NextFunction){
  try {
    const authHeader = req.headers?.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    const langData:any = req.languageData;
    if(!token){
      return errorhandler(
        new AppError(langData.RESPONSE_MESSAGES.ERROR.INVALID_REQUEST_BODY, STATUS_CODE.BAD_GATEWAY),
        req,
        res
      );
    }
    const tokenService = TokenServices.getInstance();
    const userId : VerifyRefreshToken = tokenService.verifyRefreshToken(
      token,
      req.languageData!
    );
    if(!userId){
      return errorhandler(
        new AppError(langData.RESPONSE_MESSAGES.ERROR.INVALID_TOKEN, STATUS_CODE.BAD_GATEWAY),
        req,
        res
      );
    }
    req.user_id= userId.user_id;
    next();
  } catch (error) {
    throw error;
  }
}


export function validateUser(allowedRoles:string){
  return(req: AuthenticatedRequest, res: Response, next: NextFunction)=>{
    try {
      const userRole= req.user?.access_type;
      const langData :any = req.languageData;
      if(allowedRoles === userRole){
       return next();
      }else{
        return errorhandler(
          new AppError(langData.RESPONSE_MESSAGES.ERROR.ACCESS_FORBIDDEN, STATUS_CODE.UNAUTHORIZED),
          req,
          res
        );
      }
    } catch (error) {
      throw error
    }
  };
}

export function validateQueryparams(schema:object){
  return(req: AuthenticatedRequest, res: Response, next: NextFunction)=>{
    try {
      const langData :any = req.languageData;
      const validate= ajv.compile(schema);
      const valid = validate(req.query);
      if(!valid){
        return errorhandler(
          new AppError(
            validate.errors && validate.errors.length> 0 ? validate.error[0].message :            
            langData!.RESPONSE_MESSAGES.ERROR.SOMETHING_WENT_WRONG, STATUS_CODE.BAD_GATEWAY),
          req,
          res
        );
      }
      next();
    } catch (error) {
      throw error
    }
  };
}

export function validateParams(schema:object){
  return(req: AuthenticatedRequest, res: Response, next: NextFunction)=>{
    try {
      const langData :any = req.languageData;
      const valid = ajv.validate(schema, req.params);
      if(!valid){
        return errorhandler(
          new AppError(
            ajv.errors && ajv.errors.length> 0 ? ajv.error[0].message :            
            langData!.RESPONSE_MESSAGES.ERROR.SOMETHING_WENT_WRONG, STATUS_CODE.BAD_GATEWAY),
          req,
          res
        );
      }
      next();
    } catch (error) {
      throw error
    }
  };
}