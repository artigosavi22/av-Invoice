import { NextFunction, Response } from "express";
import { STATUS_CODE } from "../../resources/ResponseCode";
import { Validator } from "jsonschema";
import { AuthenticatedRequest } from "../../models/v1/Generals";
import { LANGUAGE } from "../../resources/SupportedLanguage";
import AppError from "../../utils/AppError";
import { errorhandler } from "./errorHandler";
import { LanguageResourceManager } from "../../resources/LanguageResources";
import { IUser } from "models/v1/IUser";
import { NodeCacheManager } from "../../repository/v1/NodeCache";
import { TokenServices } from "../../services/v1/TokenServices";

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
  console.log(language);
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
