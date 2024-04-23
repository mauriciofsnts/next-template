import { AxiosRequestHeaders, ResponseType } from 'axios';

export type HttpRequest<R> = {
    body?: R;
    headers?: AxiosRequestHeaders;
    method: HttpMethod;
    params?: unknown;
    responseType?: ResponseType;
    url: string;
};

export interface HttpClient {
    request: <Input, Output>(req: HttpRequest<Input>) => Promise<Output | HttpErrorResponse>;
}

export type HttpMethod = 'post' | 'get' | 'put' | 'delete';

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

export type HttpResponse<T> = {
    body?: T;
    statusCode: HttpStatusCode;
};

export type HttpErrorResponse = {
    message: string;
    detail: {
        message: string;
    };
};

