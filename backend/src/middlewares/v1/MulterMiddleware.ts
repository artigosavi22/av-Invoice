import {AuthenticatedRequest} from 'models/v1/Generals';
import { Response,NextFunction } from 'express';
import path from 'path';
import multer, { FileFilterCallback } from "multer";
import { logger } from 'config';
import { errorhandler } from './errorHandler';
import { REF_CONFIG } from '../../resources/Referance_code';


export const projectFileUpload =(
    req:AuthenticatedRequest,
    res: Response,
    next:NextFunction
)=>{
 const multerFileUpload= multer({
    storage : multer.memoryStorage(),

    fileFilter:(req:AuthenticatedRequest, file, cb: FileFilterCallback)=>{
        const langData:any = req.languageData;
         const extension = path.extname(file.originalname).toLowerCase();
         if(!REF_CONFIG.ALLOWED_FILE_TYPE.includes(extension)){
            logger.error(
                "Error in file processing create projects:" +langData.RESPONSE_MESSAGES.ERROR.FILE_FORMAT
            );
            cb(new Error(langData.RESPONSE_MESSAGES.ERROR.INVALID_FILE_FORMAT));
         }
         cb(null, true);
    },
    limits:{fileSize :parseInt (process.env.FILE_SIZE_LIMIT!)},
 }).fields([
    {name: REF_CONFIG.PROJECT_DETAILS_REQUIREMENT_DOCUMENT,maxCount:1},
    {name: REF_CONFIG.PROJECT_DETAILS_LEGAL_DOCUMENT,maxCount:1}
 ]);
 multerFileUpload(req,res, (err)=>{
    if(err){
        logger.error("Multer error:"+ err.message);
        return errorhandler(err, req,res);
    }
    next();
 });
}
