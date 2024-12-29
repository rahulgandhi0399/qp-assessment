import { CommonErrorCodeType } from './error.type';

export class CommonError extends Error {
  errorCode: number;

  httpCode: number;

  apiErrorCode: string;


  constructor(errorCode: CommonErrorCodeType) {
    super('ChargeItError');
    this.errorCode = errorCode.errorCode;
    this.message = errorCode.message;
    this.httpCode = errorCode.httpCode || 200;
    this.apiErrorCode = errorCode.apiErrorCode;
  }

  getErrorMessage(): string {
    return this.message;
  }

  toObject(): CommonErrorCodeType {
    return {
      errorCode: this.errorCode,
      message: this.message,
      httpCode: this.httpCode,
      apiErrorCode: this.apiErrorCode,
    };
  }
}
