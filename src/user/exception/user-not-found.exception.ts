import { CustomException } from 'src/global/error/custom-exception.error';
import { USER_NOT_FOUND } from 'src/global/error/res-code.error';

class UserNotFoundException extends CustomException {
  constructor() {
    super(USER_NOT_FOUND);
  }
}

export { UserNotFoundException };
