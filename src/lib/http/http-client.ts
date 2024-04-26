import { AxiosRequestConfig, AxiosRequestHeaders } from "axios";

export type RequestData<TInput> = AxiosRequestConfig<TInput> & {
  headers?: AxiosRequestHeaders;
};

export interface HttpClient {
  request: <TInput = unknown, TResponse = unknown>(
    data: RequestData<TInput>,
  ) => Promise<HttpReponse<TResponse>>;
}

export enum HttpStatusCode {
  ok = 200,
  created = 201,
  noContent = 204,
  badRequest = 400,
  unauthorized = 401,
  forbidden = 403,
  notFound = 404,
  serverError = 500,
}

export type HttpReponse<T> = {
  body?: T;
  error?: HttpError;
  statusCode: HttpStatusCode;
};

export type HttpError = {
  statusCode: HttpStatusCode;
  error: string;
  message: string;
};
