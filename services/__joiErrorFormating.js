export const joiErrorFomating =(details)=>{
    return details.map(err => {
        let message = err.message;
        message = message.replace(/"/g, '');
        return message;
    }).join(', ');
}