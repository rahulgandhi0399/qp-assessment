import { CommonErrorCodeType } from 'errors/error.type';

export const ItemErrorCodes: { [x: string]: CommonErrorCodeType } = {
    ITEM_EXISTS: {
    errorCode: 400,
    apiErrorCode: 'ITEM_EXISTS',
    httpCode: 200,
    message: 'item with given name exists',
  },
  ITEM_NOT_FOUND: {
    errorCode: 400,
    apiErrorCode: 'ITEM_NOT_FOUND',
    httpCode: 200,
    message: 'item with given id not found',
  }
};
