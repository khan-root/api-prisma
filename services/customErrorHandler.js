export class CustomErrorHandler extends Error{

    constructor(status, msg){
        super()        
        this.status = status
        this.message = msg

    }

    static alreadyExist(message){
        return new CustomErrorHandler(409, message)
    }

    static notFound(message){
        return new CustomErrorHandler(404, message)
    }


    static invalidCredentials(message){
        return new CustomErrorHandler(401, message)
    }


    static badRequest(message){
        return new CustomErrorHandler(400, message)
    }

    static unAuthorized(message){
        return new CustomErrorHandler(401, message)
    }


}