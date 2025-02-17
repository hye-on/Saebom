import { BaseException } from './base.exception';
import { ErrorType } from '../types/error.type';

export class AppException extends BaseException {
  constructor(error: ErrorType, cause?: Error) {
    super(error.message, error.code, cause);
  }
}
