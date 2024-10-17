class AppError extends Error{
    public statusCode: number;
    public isOperational:boolean;
    constructor(message:string, statusCode:number){
        super(message);
        this.isOperational= true,
        this.statusCode= statusCode;
        Error.captureStackTrace(this,this.constructor);
    }
}

export default AppError;