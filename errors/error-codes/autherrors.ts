import { CommonErrorCodeType } from 'errors/error.type';

export const AuthErrorCodes: { [x: string]: CommonErrorCodeType } = {
  USER_EXISTS: {
    errorCode: 400,
    apiErrorCode: 'USER_EXISTS',
    httpCode: 200,
    message: 'user with given emailid exists',
  }
};
