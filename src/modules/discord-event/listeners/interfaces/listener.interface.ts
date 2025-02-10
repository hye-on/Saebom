export interface Listener<T> {
  handle(event: T | T[]): Promise<void>;
}
