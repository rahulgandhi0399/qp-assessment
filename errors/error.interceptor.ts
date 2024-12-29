import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CommonError } from './CommonError';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  constructor() {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err: Error) => {

        if (err instanceof CommonError) {
          return throwError(
            () =>
              new HttpException(
                {
                  success: false,
                  errorCode: err.errorCode,
                  message: err.message,
                  apiErrorCode: err.apiErrorCode,
                },
                err.httpCode,
              ),
          );
        }
        return throwError(() => err);
      }),
    );
  }
}
