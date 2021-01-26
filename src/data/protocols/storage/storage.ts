export interface Storage<T> {
  set(key: string, value: T): Promise<void>;
  get(key: string): Promise<T>;
  clear(): Promise<void>;
}
