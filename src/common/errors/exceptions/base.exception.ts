export abstract class BaseException extends Error {
  constructor(message: string, public readonly code: string, public readonly cause?: Error) {
    super(message);
    this.name = this.constructor.name;
  }
}
