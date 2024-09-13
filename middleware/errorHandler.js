import pkg from 'joi';
import { CustomErrorHandler } from '../services/customErrorHandler.js'
import { joiErrorFomating } from '../services/__joiErrorFormating.js';
const { ValidationError } = pkg;
export const errorHandler = (err, req, res, next)=>{

    let statusCode = 500

    let data = {
        ERROR_DESCRIPTION: 'Inernal Server Error'
    }

    if(err instanceof ValidationError){
        
        statusCode = 422
        data = {
            ERROR_DESCRIPTION:joiErrorFomating(err.details),
        };
    }

    if(err instanceof CustomErrorHandler){
        statusCode = err.status;
        data = {
            ERROR_DESCRIPTION: err.message,
        };
    }

    return res.status(statusCode).json({STATUS:"Error", ...data})
}