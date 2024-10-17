import { Response } from "express";
import { AuthenticatedRequest } from "../../models/v1/Generals";
import AppError from "../../utils/AppError";


const errorhandler=(
    error:AppError,
    req:AuthenticatedRequest,
    res:Response
)=>{
    const statusCode = error.statusCode ||500;
    const message = error.message || "Internal Server Error";

    res.status(statusCode).json({
        success:false,
        status:statusCode,
        message,
        data:null,
        stack: process.env.NODE_ENV === "production" ?null : error.stack,
    });
};


export {errorhandler}