import { HttpException, HttpStatus } from "@nestjs/common";
import { ErrorCodeType, ErrorResponseType } from "./types/response-error.type";


const ErrorCode: ErrorCodeType = {
    USER_NOT_FOUND: {
        status: HttpStatus.NOT_FOUND,
        code: "U001",
        message: "사용자를 찾을 수 없습니다",
        errors: []
    },

}

class CustomException extends HttpException {

    constructor(error: ErrorResponseType) {
        super(error, error.status);
    }
}


export {
    ErrorCode,
    CustomException,
}