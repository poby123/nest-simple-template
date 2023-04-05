import { CustomException } from 'src/global/error/custom-exception';
import { ErrorCode } from 'src/global/error/error-code';

class UserNotFoundException extends CustomException {
  constructor() {
    super(ErrorCode.USER_NOT_FOUND);
  }
}

export { UserNotFoundException };
