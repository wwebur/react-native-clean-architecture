export type StorageValues = string | number | boolean;

export interface Storage {
  set(key: string, value: StorageValues): Promise<void>;
  get(key: string): Promise<StorageValues>;
  clear(): Promise<void>;
}
