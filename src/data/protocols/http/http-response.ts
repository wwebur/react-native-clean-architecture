export enum HttpStatusCode {
  unauthorized = 401,
  ok = 200,
}

export type HttpResponse = {
  statusCode: HttpStatusCode;
  data?: any;
};
