export type RequestData<TInput> = {
  url: string;
  method: string;
  headers?: HeadersInit;
  body?: TInput;
};

export interface HttpClient {
  request: <TInput = unknown, TResponse = unknown>(
    data: RequestData<TInput>
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
  code: string;
  error: string;
  message: string;
  detailedMedssage: string;
  status: HttpStatusCode;
};

export type ActionState<T, O> = {
  error?: HttpError;
  data?: O;
  status?: number;
};
