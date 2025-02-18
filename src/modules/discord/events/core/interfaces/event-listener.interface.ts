export interface IEventListener<T = any> {
  handle(event: T): Promise<void>;
}
