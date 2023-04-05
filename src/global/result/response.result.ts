import { ResultResponseType } from './type.result';

class ResultResponse {
  status: number;
  code: string;
  message: string;
  data?: object;

  constructor(result: ResultResponseType, data?: Object) {
    const { status, code, message } = result;
    this.status = status;
    this.code = code;
    this.message = message;
    this.data = data || {};
  }
}

export { ResultResponse };
