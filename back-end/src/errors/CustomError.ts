class CustomError extends Error {
    responseCode: number;
    responseMessage: string;
    loggerMessage: string;

    constructor(responseCode: number, responseMessage: string, loggerMessage: string) {
        super();
        this.responseCode = responseCode;
        this.responseMessage = responseMessage;
        this.loggerMessage = loggerMessage;
    }
}

export default CustomError;