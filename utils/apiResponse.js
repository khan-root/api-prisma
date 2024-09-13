export class ApiResponse {
    constructor(data=null,  status="SUCCESSFUL", message=""){
        this.STATUS = status
        if (data !== null) {
            this.DB_DATA = data;
        }
        this.DESCRIPTION = message
    }
}
