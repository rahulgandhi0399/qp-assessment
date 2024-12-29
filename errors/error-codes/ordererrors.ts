import { CommonErrorCodeType } from 'errors/error.type';

export const OrderErrorCodes: { [x: string]: CommonErrorCodeType } = {
    PRODUCT_ID_NOT_FOUND: {
    errorCode: 400,
    apiErrorCode: 'PRODUCT_ID_NOT_FOUND',
    httpCode: 200,
    message: 'some or all given product id not found',
  }
};
