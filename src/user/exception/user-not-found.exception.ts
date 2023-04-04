import { CustomException, ErrorCode } from "src/error/error.response";

class UserNotFoundException extends CustomException {
    constructor() {
        super(ErrorCode.USER_NOT_FOUND);
    }
}

export {
    UserNotFoundException
};
