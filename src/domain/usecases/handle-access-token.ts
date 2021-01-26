export interface HandleAccessToken {
  save(accessToken: string): Promise<void>;
  load(): Promise<string>;
  erase(): Promise<void>;
}
